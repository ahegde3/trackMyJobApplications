import { MESSAGES } from "../../constants/message";
// send a message every 20 sec to service worker
setInterval(() => {
    chrome.runtime.sendMessage({ message:MESSAGES.KEEP_ALIVE});
  }, 20000);