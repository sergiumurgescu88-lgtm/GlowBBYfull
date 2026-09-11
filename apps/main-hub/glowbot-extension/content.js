/**
 * GlowBot - Content Script (Optimizat: Raffle, Batching, Flagging)
 */
(() => {
  'use strict';

  if (!window.location.pathname.includes('/b/')) return;

  let chatObserver = null;
  let statusIntervalId = null;
  let chatRetryTimeoutId = null;
  let observerRetryCount = 0;
  const MAX_OBSERVER_RETRIES = 20;

  const CHAT_CONTAINER_SELECTORS = ['#chat_text_list', '.chat-list', "[data-testid='chat-container']", '.text-list', '.chat-box'];
  const CHAT_INPUT_SELECTORS = ['#chat_message_input', 'textarea.chat-input', 'input.chat-input'];

  const state = {
    modelUsername: window.location.pathname.match(/^\/b\/([a-zA-Z0-9_\-]+)/i)?.[1]?.toLowerCase() || 'broadcaster',
    settings: {
      vipThreshold: 100,
      autoThankTemplate: 'Mulțumesc mult, {user}, pentru cele {tokens} token-uri! ❤️',
      autoThankMinTokens: 10,
      enableBatchedThanks: true,
      batchDelayMs: 3000,
      enableRaffleTracker: true,
      raffleTokenAmount: 10,
      forbiddenWordsList: 'free show,scam,fake'
    },
    sessionTokens: 0,
    sessionTipsCount: 0,
    raffleCount: 0,
    pendingThanks: [],
    thanksTimer: null,
    welcomedUsers: new Set(),
    processedEventIds: new Set()
  };

  chrome.storage.local.get('glowbot_settings', (res) => {
    if (res?.glowbot_settings) state.settings = { ...state.settings, ...res.glowbot_settings };
    init();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.glowbot_settings) {
      state.settings = { ...state.settings, ...changes.glowbot_settings.newValue };
      updateHud();
    }
  });

  function cleanupObservers() {
    if (chatObserver) chatObserver.disconnect();
    if (chatRetryTimeoutId) clearTimeout(chatRetryTimeoutId);
    if (statusIntervalId) clearInterval(statusIntervalId);
    if (state.thanksTimer) clearTimeout(state.thanksTimer);
    state.processedEventIds.clear();
  }
  window.addEventListener('beforeunload', cleanupObservers);

  function init() {
    startChatObserver();
    createOnScreenHud();
  }

  function startChatObserver() {
    let found = null;
    for (const sel of CHAT_CONTAINER_SELECTORS) {
      const el = document.querySelector(sel);
      if (el) { found = el; break; }
    }

    if (!found) {
      if (observerRetryCount++ <= MAX_OBSERVER_RETRIES) chatRetryTimeoutId = setTimeout(startChatObserver, 1200);
      return;
    }

    if (chatObserver) chatObserver.disconnect();
    chatObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) handleChatMessageNode(node);
        }
      }
    });
    chatObserver.observe(found, { childList: true, subtree: false });
  }

  function handleChatMessageNode(node) {
    const rawText = node.textContent || '';
    if (!rawText.trim()) return;
    const sig = rawText.slice(0, 100);
    if (state.processedEventIds.has(sig)) return;
    state.processedEventIds.add(sig);
    if (state.processedEventIds.size > 1000) state.processedEventIds.clear();

    // 1. Flagging Cuvinte Interzise
    const words = state.settings.forbiddenWordsList ? state.settings.forbiddenWordsList.split(',').map(w => w.trim().toLowerCase()) : [];
    if (words.length > 0 && words.some(w => rawText.toLowerCase().includes(w))) {
      node.style.border = '2px solid #ff3344';
      node.style.background = 'rgba(255, 51, 68, 0.15)';
      node.style.borderRadius = '6px';
      node.style.padding = '4px';
    }

    // 2. Detectare Tip
    const tipRegex = /([a-zA-Z0-9_\-]+)\s+tipped\s+(\d+)\s+tokens?/i;
    const match = rawText.match(tipRegex);
    if (match) {
      const tipper = match[1];
      const tokens = parseInt(match[2], 10);
      if (tokens > 0) handleTipDetected(tipper, tokens, node);
    }
  }

  function handleTipDetected(tipper, tokens, node) {
    state.sessionTokens += tokens;
    state.sessionTipsCount += 1;

    // Raffle Tracker
    if (state.settings.enableRaffleTracker && tokens === state.settings.raffleTokenAmount) {
      state.raffleCount += 1;
    }

    updateHud();

    // VIP Highlight
    if (tokens >= state.settings.vipThreshold && node?.style) {
      node.style.border = '2px solid gold';
      node.style.background = 'rgba(255, 215, 0, 0.12)';
      node.style.boxShadow = '0 0 14px rgba(255, 215, 0, 0.45)';
      setTimeout(() => { if(node.style) { node.style.border=''; node.style.background=''; node.style.boxShadow=''; } }, 5000);
    }

    // Trimitere către Background
    chrome.runtime.sendMessage({ type: 'EVENT_CAPTURED', payload: { type: 'tip', model: state.modelUsername, timestamp: new Date().toISOString(), data: { tipper, tokens, isVip: tokens >= state.settings.vipThreshold } } });

    // Batched Anti-Spam Thanks
    if (tokens >= state.settings.autoThankMinTokens) {
      if (state.settings.enableBatchedThanks) {
        state.pendingThanks.push(tipper);
        if (state.thanksTimer) clearTimeout(state.thanksTimer);
        state.thanksTimer = setTimeout(() => {
          if (state.pendingThanks.length === 0) return;
          const batch = state.pendingThanks.splice(0, 5);
          const names = batch.map(n => '@' + n).join(', ');
          sendChatMessageToRoom(`Mulțumesc frumos ${names} pentru energie! ❤️`);
          if (state.pendingThanks.length > 0) state.thanksTimer = setTimeout(arguments.callee, 500);
        }, state.settings.batchDelayMs);
      } else {
        const msg = state.settings.autoThankTemplate.replace('{user}', tipper).replace('{tokens}', tokens.toString());
        setTimeout(() => sendChatMessageToRoom(msg), 1200);
      }
    }
  }

  function sendChatMessageToRoom(messageText) {
    if (!messageText) return;
    let chatInput = null;
    for (const sel of CHAT_INPUT_SELECTORS) { chatInput = document.querySelector(sel); if (chatInput) break; }
    if (!chatInput) return;
    chatInput.focus();
    chatInput.value = messageText;
    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    const sendBtn = document.querySelector('#chat_message_send_button') || chatInput.form?.querySelector('button');
    if (sendBtn) sendBtn.click();
    else chatInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
  }

  function createOnScreenHud() {
    if (document.querySelector('#glowbot_hud')) return;
    const hudEl = document.createElement('div');
    hudEl.id = 'glowbot_hud';
    hudEl.style.cssText = `position: fixed; bottom: 20px; right: 20px; z-index: 999999; background: rgba(15, 17, 26, 0.94); color: #fff; padding: 12px 16px; border-radius: 12px; font-family: sans-serif; font-size: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); border: 1px solid rgba(255, 64, 129, 0.4); display: flex; flex-direction: column; gap: 8px; backdrop-filter: blur(8px);`;
    
    hudEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="width:8px; height:8px; background:#00e676; border-radius:50%; box-shadow:0 0 8px #00e676;"></span>
        <span style="font-weight:700; color:#ff4081; letter-spacing:0.5px;">GLOWBOT</span>
      </div>
      <div style="display:flex; gap:12px; font-size: 11px;">
        <span>💰 <strong id="gb_tokens" style="color:#ffd700;">0</strong> tk</span>
        <span>⚡ <strong id="gb_tips">0</strong> tips</span>
      </div>
      <div id="gb_raffle_box" style="display:none; background: rgba(255,215,0,0.1); border: 1px solid gold; padding: 4px 8px; border-radius: 6px; text-align: center; color: gold; font-weight: bold;">
        🎟️ Raffle: <span id="gb_raffle">0</span>
      </div>
    `;
    document.body.appendChild(hudEl);
    updateHud();
  }

  function updateHud() {
    const t = document.querySelector('#gb_tokens'); if(t) t.textContent = state.sessionTokens;
    const tp = document.querySelector('#gb_tips'); if(tp) tp.textContent = state.sessionTipsCount;
    if (state.settings.enableRaffleTracker) {
      const rb = document.querySelector('#gb_raffle_box'); if(rb) rb.style.display = 'block';
      const r = document.querySelector('#gb_raffle'); if(r) r.textContent = state.raffleCount;
    }
  }
})();
