chrome.webNavigation.onCompleted.addListener(async (details) => {
  const url = details.url;
  if (url.startsWith("http")) {
    console.log("Navigated to:", url);

    // Send the URL to your Django server
    try {
      await fetch("http://127.0.0.1:8000/api/analyze_url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });
      console.log("URL sent to server:", url);
    } catch (error) {
      console.error("Error sending URL to server:", error);
    }
  }
});