chrome.action.onClicked.addListener((tab) => {
  fetch('https://127.0.0.1:8000/api/session', { credentials: 'include' })
    .then(response => response.json())
    .then(data => {
      if (data && data.valid) {
        chrome.windows.create({ url: 'monitoring.html', type: 'popup', width: 420, height: 400 });
      } else {
        chrome.windows.create({ url: 'popup.html', type: 'popup', width: 420, height: 400 });
      }
    })
    .catch(() => {
      chrome.windows.create({ url: 'popup.html', type: 'popup', width: 420, height: 400 });
    });
});

// Example background.js logic
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Check session data in chrome.storage.local
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkSession') {
    chrome.storage.local.get('email', (result) => {
      sendResponse({ email: result.email || null });
    });
    return true; // Keep the message channel open for async response
  }
});