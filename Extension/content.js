
let lastUrl = location.href;
let lastTimestamp = Date.now();
const DOMAIN = "https://api.browsemind.net";

const sendWebLogToApi = (url, timestamp, duration) => {
    // Check session validity
    fetch(DOMAIN + "/api/session/", {
      method: "GET",
      credentials: "include",
    })
    .then(res => res.ok ? res.json() : Promise.reject("Session invalid"))
    .then(() => {
      sendWebLogToApiAsync(url, timestamp, duration);
    })
    .catch(err => {
      console.log("[!] Not sending weblog, session invalid:", err);
    });
};

async function sendWebLogToApiAsync(url, timestamp, duration) {
  try {

    let html = document.documentElement.outerHTML;
    const weblog = await fetch(DOMAIN + "/api/weblog/", {
      method: "POST",
      headers: { 
      "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
      html: html,
      url: url,
      timestamp: new Date(timestamp).toISOString(),
      duration: duration
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
