chrome.action.onClicked.addListener((tab) => {
  fetch('https://127.0.0.1:8000/api/session', { credentials: 'include' })
    .then(response => response.json())
    .then(data => {
      if (data && data.ok) {
        chrome.windows.create({ url: 'monitoring/monitoring.html', type: 'popup', width: 420, height: 400 });
      } else {
        chrome.windows.create({ url: 'forms/forms.html', type: 'popup', width: 420, height: 400 });
      }
    })
    .catch(() => {
      chrome.windows.create({ url: 'forms/forms.html', type: 'popup', width: 420, height: 400 });
    });
});

// Example background.js logic
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

