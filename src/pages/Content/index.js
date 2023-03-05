import { printLine } from './modules/print';
import { MESSAGES } from '../../constants/message';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.message) {
    if (jobProfile)
      chrome.runtime.sendMessage({
        message: MESSAGES.JOB_PROFILE,
        jobProfile,
      });
  }
});

chrome.runtime.sendMessage({
  url: window.location.href,
  message: MESSAGES.TEST,
});

let jobId, event, jobProfile;

const observer = new MutationObserver(function (mutations) {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  if (
    !jobId ||
    (params?.get('currentJobId') != jobId &&
      url.pathname?.includes('/jobs/collections/'))
  ) {
    jobId = params.get('currentJobId');
    console.log(jobId);
    getJobDetails();
  }
});
const config = { subtree: true, childList: true };

const getJobDetails = async () => {
  let test = Array.from(document.querySelectorAll('a'))?.find((el) =>
    el?.href?.includes(`https://www.linkedin.com/jobs/view/${jobId}/`)
  );
  if (!test?.id) return;
  const id = parseInt(test.id.match(/\D+|\d+/g)?.[1]);
  const position = document.querySelector(`#ember${id}`).innerHTML.trim('\n');
  const company = document
    .querySelector(`#ember${id + 1} > span`)
    .innerHTML.trim('\n');
  console.log(position);
  console.log(company);

  jobProfile = { position, company, source: 'linkedIn' };

  chrome.runtime.sendMessage({
    message: MESSAGES.JOB_PROFILE,
    jobProfile,
  });

  await sleep(8000);
  const button = document.getElementsByClassName('jobs-apply-button')[0];
  if (button) {
    button?.addEventListener('click', function () {
      console.log('You clicked me');
      chrome.runtime.sendMessage({
        message: MESSAGES.JOB_APPLIED,
        jobProfile,
      });
    });
    console.log('event listner created');
  }
};

// start listening to changes
observer.observe(document, config);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
