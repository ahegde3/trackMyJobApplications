import { insertToGSheet } from '../../api/jobs';
import { chromeLocalStorage } from '../../helpers/chromeStorageHelpers';
import { MESSAGES } from '../../constants/message';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(request);

  switch (request.message) {
    case MESSAGES.TEST:
      console.log('test message recieved');
      break;
    case MESSAGES.LOGIN:
      await chromeLocalStorage.setItemAsync('uid', request.uid);
      break;
    case MESSAGES.JOB_PROFILE:
      chrome.runtime.sendMessage({
        msg: 'jobProfile',
        jobProfile: request.jobProfile,
      });
      sendResponse({ message: 'done' });
      break;
    case MESSAGES.JOB_APPLIED:
      const uid = await chromeLocalStorage.getItemAsync('uid');
      if (uid) {
        await insertToGSheet(uid, request.jobProfile).then(() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                message: MESSAGES.JOB_APPLIED_ACK,
              });
            }
          );
        });
      }

      sendResponse({ message: 'done' });
      break;
    case MESSAGES.HANDSHAKE:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: MESSAGES.HANDSHAKE });
      });
      break;
    case MESSAGES.KEEP_ALIVE:
      console.log('keepAlive');
      break;
    default:
      break;
  }
});

// create the offscreen document if it doesn't already exist
async function createOffscreen() {
  console.log('offscreen');
  if (await chrome.offscreen.hasDocument?.()) return;
  console.log('offscreen create document');
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['BLOBS'],
    justification: 'keep service worker running',
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onStartup');
  createOffscreen();
});
