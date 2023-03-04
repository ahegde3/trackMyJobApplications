import { insertToGSheet} from "../../api/jobs"
import { chromeLocalStorage } from "../../helpers/chromeStorageHelpers";

console.log('This is the background page.');
console.log('Put the background scripts here.');



chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
     console.log(request)
    if (request.message == 'TEST') console.log('test message recieved');
    else if (request.message== 'LOGIN') { await chromeLocalStorage.setItemAsync("uid",request.uid)}
    else if (request.message == 'jobProfile') {
        chrome.runtime.sendMessage({
            msg: "jobProfile", 
            jobProfile:request.jobProfile
        });
  
      sendResponse({ message: 'done' });
      
    }
    else if  (request.message == 'JOB_APPLIED') {
      chrome.runtime.sendMessage({
        msg: 'JOB_APPLIED', 
    });
    console.log(await  chrome.storage.local.get("uid")?.["uid"])
    const uid= await chromeLocalStorage.getItemAsync("uid")
    console.log("uid",uid)
    if(uid) {
      console.log("inside uid if")
    await insertToGSheet(uid,request.jobProfile).then(()=>{
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {message: 'JOB_APPLIED_ACK'});  
    });
    })
  }    

  sendResponse({ message: 'done' });
    }
    else if  (request.message == 'Handshake') {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {message: 'Handshake'});  
  });

  sendResponse({ message: 'done' });
    } else  if (request.message=='keepAlive') {console.log('keepAlive');
    console.log(await chromeLocalStorage.getItemAsync("uid"))}
  });



  // create the offscreen document if it doesn't already exist
async function createOffscreen() {
  console.log("offscreen")
  if (await chrome.offscreen.hasDocument?.()) return;
  console.log("offscreen create document")
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['BLOBS'],
    justification: 'keep service worker running',
  });
}
chrome.runtime.onInstalled.addListener(() => {
  console.log("onStartup")
  createOffscreen();
});

