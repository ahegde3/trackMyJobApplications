import { useEffect, useState } from 'react';
import TitleComponent from '../../containers/TitleComponent';
import JobApplicationComponent from '../../containers/JobApplicationComponent';
import React from 'react';

export default function Home() {
  const [jobProfile, setJobProfile] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage({ data: 'Handshake' }, function (response) {});

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.message == 'jobProfile')
        setJobProfile({
          position: request.jobProfile?.position,
          company: request.jobProfile?.company,
          site: request.jobProfile?.site,
        });
    });
  }, []);

  return (
    <div>
      <TitleComponent />
      <JobApplicationComponent
        position={jobProfile?.position}
        company={jobProfile?.company}
        site={jobProfile?.site}
      />
    </div>
  );
}
