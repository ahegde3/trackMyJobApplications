import { printLine } from './modules/print';
import { MESSAGES } from '../../constants/message';
import {LINKS,SOURCE} from "../../constants/listingSource"

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

  switch (url.hostname) {
    case LINKS.INSTAHYRE:
      getJobDetailsForInstahyre();
      break;

    case LINKS.LINKEDIN:
      if (
        !jobId ||
        (jobId != params?.get('currentJobId') &&
          url.pathname?.includes(LINKS.LINKEDIN_JOBS_PAGE))
      ) {
        console.log('inside');
        jobId = params.get('currentJobId');
        getJobDetailsForLinkedIn();
      }

      break;
    default:
      break;
  }

});
const config = { subtree: true, childList: true };

const getJobDetailsForLinkedIn = async () => {
  console.log('jobDetails', jobId);
  let test = Array.from(document.querySelectorAll('a'))?.find((el) =>
    el?.href?.includes(`https://www.linkedin.com/jobs/view/${jobId}/`)
  );
  if (!test?.id) return;
  console.log('after if');
  const id = parseInt(test.id.match(/\D+|\d+/g)?.[1]);
  const position = document.querySelector(`#ember${id}`).innerHTML.trim('\n');
  const company = document
    .querySelector(`#ember${id + 1} > span`)
    .innerHTML.trim('\n');
  console.log(position);
  console.log(company);

  jobProfile = { position, company, source: SOURCE.LINKEDIN };

  sendJobProfile(jobProfile);

  await sleep(5000);
  const button = document.getElementsByClassName('jobs-apply-button')[0];
  if (event) event.removeEventListener();
  if (button) {
    event = button?.addEventListener('click', function () {
      console.log('You clicked me');
      chrome.runtime.sendMessage({
        message: MESSAGES.JOB_APPLIED,
        jobProfile,
      });
    });
    console.log('event listner created');
  }
};

const getJobDetailsForInstahyre = () => {
  const jobDetailContainer =
    document.getElementsByClassName('profile-info')?.[0];
  if (jobDetailContainer?.childNodes) {
    const position = jobDetailContainer.children?.[0]?.textContent;
    const company = jobDetailContainer.children?.[1]?.textContent;
    if(jobProfile?.company=== company) return;  
    jobProfile = { position, company, source: SOURCE.INSTAHYRE};
    console.log(position, company);
    sendJobProfile(jobProfile);
    if (event) event.removeEventListener('click');
    event = document
      .getElementsByClassName('apply ng-scope')?.[0]
      ?.addEventListener('click', () => {
        console.log('You clicked me');
        chrome.runtime.sendMessage({
          message: MESSAGES.JOB_APPLIED,
          jobProfile,
        });
      });
    console.log('event registered');
  }
};

// start listening to changes
observer.observe(document, config);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sendJobProfile = (jobProfile) => {
  chrome.runtime.sendMessage({
    message: MESSAGES.JOB_PROFILE,
    jobProfile,
  });
};
