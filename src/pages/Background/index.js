import { insertToGSheet } from '../../api/jobs';
import { chromeLocalStorage } from '../../helpers/chromeStorageHelpers';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(request);

  switch (request.message) {
    case 'TEST':
      console.log('test message recieved');
      break;
    case 'LOGIN':
      await chromeLocalStorage.setItemAsync('uid', request.uid);
      break;
    case 'jobProfile':
      chrome.runtime.sendMessage({
        msg: 'jobProfile',
        jobProfile: request.jobProfile,
      });
      sendResponse({ message: 'done' });
      break;
    case 'JOB_APPLIED':
      const uid = await chromeLocalStorage.getItemAsync('uid');
      if (uid) {
        await insertToGSheet(uid, request.jobProfile).then(() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                message: 'JOB_APPLIED_ACK',
              });
            }
          );
        });
      }

      sendResponse({ message: 'done' });
      break;
    case 'Handshake':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'Handshake' });
      });
      break;
    case 'keepAlive':
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
