console.log('This is the background page.');
console.log('Put the background scripts here.');



chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
  
    if (request.message == 'TEST') console.log('test message recieved');
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

  sendResponse({ message: 'done' });
    }
  });
