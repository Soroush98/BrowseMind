const DOMAIN = "https://api.browsemind.net";
let lastUrl = location.href;
let lastTimestamp = Date.now();

// Log every site user goes
console.log("[Site Visit]", lastUrl);

// Track hyperlink clicks
window.addEventListener('click', function(e) {
  const anchor = e.target.closest('a[href]');
  if (anchor && anchor.href) {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      const now = Date.now();
      const duration = now - lastTimestamp;
      sendWebLogToApiAsync(lastUrl, lastTimestamp, duration);
      lastUrl = anchor.href;
      lastTimestamp = now;
      console.log("[Site Visit]", lastUrl);
    }
  }
}, true);

// Track reload/close
window.addEventListener('beforeunload', function() {
  const now = Date.now();
  const duration = now - lastTimestamp;
  sendWebLogToApiAsync(lastUrl, lastTimestamp, duration);
});

// On initial load, set trackers
lastUrl = location.href;
lastTimestamp = Date.now();

async function sendWebLogToApiAsync(url, timestamp, duration) {
  try {
    let html = document.documentElement.outerHTML;
    const response = await fetch(DOMAIN + "/api/weblog/", {
      method: "POST",
      headers: { 
      "Content-Type": "application/json"
      },
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
    console.log("[✓] WebLog sent for:", url, "duration:", duration);
  } catch (err) {
    console.error("[✗] Failed to send WebLog:", err);
  }
}
