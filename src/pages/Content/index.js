import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let jobId
let event

const observer = new MutationObserver(function(mutations) {

    const url=new URL(window.location.href)
    const params=url.searchParams

    if (!jobId || params?.get("currentJobId")!=jobId) {
        jobId=params.get("currentJobId")
        console.log(jobId)
        getJobDetails()
       

      }
  });
  const config = {subtree: true, childList: true};



  const getJobDetails=async()=>{
    let test=Array.from(document.querySelectorAll("a"))?.find(el=>el?.href?.includes(`https://www.linkedin.com/jobs/view/${jobId}/`))
    console.log(test.id)
    const id=parseInt(test.id.match(/\D+|\d+/g)?.[1])
    const position=document.querySelector(`#ember${id}`).innerHTML.trim("\n")
    const company=document.querySelector(`#ember${id+1} > span`).innerHTML.trim("\n")
     console.log(position)
     console.log(company)    
        await sleep(5000)
        const button=  document.getElementsByClassName('jobs-apply-button')[0]
        console.log(button)

        button?.addEventListener("click", function() {
              console.log("You clicked me");
           });

  } 
  
  // start listening to changes
  observer.observe(document, config);


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}