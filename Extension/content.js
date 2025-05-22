let lastUrl = location.href;
let lastTimestamp = Date.now();

const sendWebLogToApi = (url, timestamp, duration) => {
  chrome.storage.local.get('email', (result) => {
    const email = result.email || null;
    if (!email) {
      console.log("[!] Not sending weblog, user not logged in.");
      return;
    }
    sendWebLogToApiAsync(url, timestamp, duration, email);
  });
};

async function sendWebLogToApiAsync(url, timestamp, duration, email) {
  try {

    let html = document.documentElement.outerHTML;
    const weblog= await fetch("http://127.0.0.1:8000/api/weblog/", {
        
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: html,
        url: url,
        timestamp: new Date(timestamp).toISOString(),
        duration: duration,
        email: email
      }),
    });
    console.log("weblog", weblog);
    console.log("[✓] WebLog sent for:", url, "duration:");
  } catch (err) {
      console.error("[✗] Failed to send WebLog:", err);
  }
}

// Track hyperlink clicks
window.addEventListener('click', function(e) {
  const anchor = e.target.closest('a[href]');
  if (anchor && anchor.href) {
    // Only handle left-clicks and normal navigation
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      const now = Date.now();
      const duration = now - lastTimestamp;
      sendWebLogToApi(lastUrl, lastTimestamp, duration);
      lastUrl = anchor.href;
      lastTimestamp = now;
    }
  }
}, true);

// Track reload/close
window.addEventListener('beforeunload', function() {
  const now = Date.now();
  const duration = now - lastTimestamp;
  sendWebLogToApi(lastUrl, lastTimestamp, duration);
});

// On initial load, set trackers
lastUrl = location.href;
lastTimestamp = Date.now();
