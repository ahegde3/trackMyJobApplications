// send a message every 20 sec to service worker
setInterval(() => {
    chrome.runtime.sendMessage({ message:"keepAlive" });
  }, 20000);