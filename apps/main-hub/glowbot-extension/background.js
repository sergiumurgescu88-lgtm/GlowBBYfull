const STORAGE_QUEUE_KEY = 'glowbot_event_queue';
const STORAGE_SETTINGS_KEY = 'glowbot_settings';
const MAX_QUEUE_SIZE = 500;

let isSyncing = false;
let currentRetryCount = 0;

chrome.runtime.onInstalled.addListener(() => initializeStorage());

async function initializeStorage() {
  const data = await chrome.storage.local.get([STORAGE_SETTINGS_KEY, STORAGE_QUEUE_KEY]);
  if (!data[STORAGE_SETTINGS_KEY]) {
    await chrome.storage.local.set({
      [STORAGE_SETTINGS_KEY]: {
        botToken: '',
        backendUrl: 'https://glowbby.online/v1/bot/event',
        vipThreshold: 100,
        autoThankTemplate: 'Mulțumesc mult, {user}, pentru cele {tokens} token-uri! ❤️',
        autoThankMinTokens: 10,
        enableBatchedThanks: true,
        batchDelayMs: 3000,
        enableRaffleTracker: true,
        raffleTokenAmount: 10,
        forbiddenWordsList: 'free show,scam,fake'
      }
    });
  }
  if (!data[STORAGE_QUEUE_KEY]) await chrome.storage.local.set({ [STORAGE_QUEUE_KEY]: [] });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;
  const { type, payload } = message;
  if (type === 'EVENT_CAPTURED') handleCapturedEvent(payload).then(() => sendResponse({ status: 'queued' }));
  else if (type === 'GET_QUEUE_STATUS') getQueueStatus().then(sendResponse);
  else if (type === 'TEST_BACKEND_CONNECTION') testConnection(payload).then(sendResponse);
  return true;
});

async function handleCapturedEvent(eventData) {
  const store = await chrome.storage.local.get([STORAGE_QUEUE_KEY, STORAGE_SETTINGS_KEY]);
  const queue = store[STORAGE_QUEUE_KEY] || [];
  const settings = store[STORAGE_SETTINGS_KEY] || {};
  if (!settings.botToken) return;

  queue.push({ id: 'evt_' + Date.now(), payload: eventData, addedAt: Date.now() });
  if (queue.length >= MAX_QUEUE_SIZE) queue.shift();
  await chrome.storage.local.set({ [STORAGE_QUEUE_KEY]: queue });
  processQueue();
}

async function processQueue() {
  if (isSyncing) return;
  const store = await chrome.storage.local.get([STORAGE_QUEUE_KEY, STORAGE_SETTINGS_KEY]);
  const queue = store[STORAGE_QUEUE_KEY] || [];
  const settings = store[STORAGE_SETTINGS_KEY] || {};
  if (queue.length === 0 || !settings.botToken) return;

  isSyncing = true;
  try {
    const batch = queue.slice(0, 20);
    const res = await fetch(settings.backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.botToken },
      body: JSON.stringify({ batch: batch.map(i => i.payload) })
    });
    if (res.ok) {
      const sentIds = new Set(batch.map(i => i.id));
      await chrome.storage.local.set({ [STORAGE_QUEUE_KEY]: queue.filter(i => !sentIds.has(i.id)) });
    }
  } catch (e) {
    currentRetryCount++;
  } finally {
    isSyncing = false;
  }
}

async function getQueueStatus() {
  const store = await chrome.storage.local.get(STORAGE_QUEUE_KEY);
  return { queueLength: (store[STORAGE_QUEUE_KEY] || []).length };
}

async function testConnection(customConfig) {
  const store = await chrome.storage.local.get(STORAGE_SETTINGS_KEY);
  const settings = store[STORAGE_SETTINGS_KEY] || {};
  const token = customConfig?.botToken || settings.botToken;
  const url = customConfig?.backendUrl || settings.backendUrl;
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ type: 'ping' }) });
    return res.ok ? { success: true } : { success: false, message: 'Eroare HTTP ' + res.status };
  } catch (e) { return { success: false, message: e.message }; }
}
