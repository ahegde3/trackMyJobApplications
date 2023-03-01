import { useEffect, useState } from 'react';
import TitleComponent from '../../containers/TitleComponent';
import JobApplicationComponent from '../../containers/JobApplicationComponent';
import Button from '@mui/material/Button';
import React from 'react';
import './index.css';

// export default function Home() {

//   // useEffect(() => {
//   //   chrome.runtime.sendMessage({ data: 'Handshake' }, function (response) {});

//   //   chrome.runtime.onMessage.addListener(function (
//   //     request,
//   //     sender,
//   //     sendResponse
//   //   ) {
//   //     if (request.message == 'jobProfile')
//   //       setJobProfile({
//   //         position: request.jobProfile?.position,
//   //         company: request.jobProfile?.company,
//   //         site: request.jobProfile?.site,
//   //       });
//   //   });
//   // }, []);

//   return (
//     <div>
//       <TitleComponent />
//       <JobApplicationComponent
//         position={jobProfile?.position}
//         company={jobProfile?.company}
//         site={jobProfile?.site}
//       />
//     </div>
//   );
// }

export default function Home() {
  const [showHome, setShowHome] = useState(true);
  const [jobProfile, setJobProfile] = useState({});
  return (
    <div>
      <TitleComponent />
      {showHome ? (
        <div className="job-options">
          <Button
            onClick={() =>
              chrome.tabs.create({
                url: 'https://docs.google.com/spreadsheets/d/1R3jmmDR6W9Ljm_vOiZAnND4tiSwrYzrooVPboVMCDlo/edit#gid=0',
              })
            }
          >
            Track Existing Job Application
          </Button>
          <Button onClick={() => setShowHome(false)}>
            {' '}
            Add a job application
          </Button>
        </div>
      ) : (
        <JobApplicationComponent
          position={jobProfile?.position}
          company={jobProfile?.company}
          site={jobProfile?.site}
        />
      )}
    </div>
  );
}
