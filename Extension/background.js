importScripts('../config.js');

chrome.action.onClicked.addListener((tab) => {
  fetch(DOMAIN + '/api/session', { credentials: 'include' })
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

let lastUrl = null;
let lastTimestamp = null;

async function sendWebLogToApiAsync(url, timestamp, duration, html) {
  try {
    const response = await fetch(DOMAIN + "/api/weblog/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        url: url,
        html: html,
        timestamp: new Date(timestamp).toISOString(),
        duration: duration
      }),
    });
    response.json().then(weblog => {
      console.log("weblog", weblog);
      if (response.status !== 202) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });
  } catch (err) {
    console.error("Failed to send WebLog:", err);
  }
}

// Listen for tab updates (URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => document.documentElement.outerHTML
    }, (results) => {
      const html = results && results[0] ? results[0].result : '';
      const now = Date.now();
      if (lastUrl && lastTimestamp) {
        const duration = now - lastTimestamp;
        sendWebLogToApiAsync(lastUrl, lastTimestamp, duration, html);
      }
      lastUrl = tab.url;
      lastTimestamp = now;
      console.log("[Site Visit]", lastUrl);
    });
  }
});

// Listen for tab activation (switching tabs)
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && !tab.url.startsWith('chrome')) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: () => document.documentElement.outerHTML
      }, (results) => {
        const html = results && results[0] ? results[0].result : '';
        const now = Date.now();
        if (lastUrl && lastTimestamp) {
          const duration = now - lastTimestamp;
          sendWebLogToApiAsync(lastUrl, lastTimestamp, duration, html);
        }
        lastUrl = tab.url;
        lastTimestamp = now;
        console.log("[Site Visit]", lastUrl);
      });
    }
  });
});

