document.addEventListener('DOMContentLoaded', async () => {
  const store = await chrome.storage.local.get('glowbot_settings');
  const s = store.glowbot_settings || {};

  document.getElementById('bot-token').value = s.botToken || '';
  document.getElementById('backend-url').value = s.backendUrl || 'https://glowbby.online/v1/bot/event';
  document.getElementById('toggle-raffle').checked = s.enableRaffleTracker !== false;
  document.getElementById('raffle-amount').value = s.raffleTokenAmount || 10;
  document.getElementById('toggle-batch').checked = s.enableBatchedThanks !== false;
  document.getElementById('forbidden-words').value = s.forbiddenWordsList || 'free show,scam,fake';

  updateQueueStatus();
  setInterval(updateQueueStatus, 3000);

  document.getElementById('btn-save').addEventListener('click', async () => {
    const updated = {
      ...s,
      botToken: document.getElementById('bot-token').value.trim(),
      backendUrl: document.getElementById('backend-url').value.trim(),
      enableRaffleTracker: document.getElementById('toggle-raffle').checked,
      raffleTokenAmount: parseInt(document.getElementById('raffle-amount').value) || 10,
      enableBatchedThanks: document.getElementById('toggle-batch').checked,
      forbiddenWordsList: document.getElementById('forbidden-words').value
    };
    await chrome.storage.local.set({ glowbot_settings: updated });
    alert('Setări salvate cu succes!');
  });

  document.getElementById('btn-test-conn').addEventListener('click', () => {
    const box = document.getElementById('test-result-box');
    box.style.display = 'block';
    box.className = '';
    box.textContent = 'Se testează...';
    chrome.runtime.sendMessage({ type: 'TEST_BACKEND_CONNECTION', payload: { botToken: document.getElementById('bot-token').value.trim(), backendUrl: document.getElementById('backend-url').value.trim() } }, (res) => {
      if (res?.success) { box.className = 'success'; box.textContent = '✅ Conexiune reușită!'; }
      else { box.className = 'error'; box.textContent = '❌ ' + (res?.message || 'Eroare'); }
    });
  });

  function updateQueueStatus() {
    chrome.runtime.sendMessage({ type: 'GET_QUEUE_STATUS' }, (res) => {
      if (res) document.getElementById('stat-queue').textContent = 'Coadă: ' + res.queueLength;
    });
  }
});
