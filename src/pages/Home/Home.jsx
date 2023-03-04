import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TitleComponent from '../../containers/TitleComponent';
import JobApplicationComponent from '../../containers/JobApplicationComponent';
import Button from '@mui/material/Button';
import React from 'react';
import './index.css';
import { setJobProfile, addToGSheet } from '../../slices/jobSlice';
import { setShowHome } from '../../slices/userSlice';

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

function Home(props) {
  // const [showHome, setShowHome] = useState(true);
  const {
    uid,
    position,
    sheetId,
    setJobProfile,
    addToGSheet,
    showHome,
    setShowHome,
  } = props;

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage({ message: 'Handshake' });

      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == 'jobProfile')
          setJobProfile({
            position: request.jobProfile?.position,
            company: request.jobProfile?.company,
            source: request.jobProfile?.source,
          });
      });
    }
  }, []);
  return (
    <div>
      <TitleComponent />
      {showHome && !position ? (
        <div className="job-options">
          <Button
            onClick={() => {
              const url = `https://docs.google.com/spreadsheets/d/${sheetId}`;
              if (chrome.tabs)
                chrome.tabs.create({
                  url: url,
                });
              else window.open(url, '_blank').focus();
            }}
          >
            Track Existing Job Application
          </Button>
          <Button onClick={() => setShowHome(false)}>
            {' '}
            Add a job application
          </Button>
        </div>
      ) : (
        <JobApplicationComponent />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
    ...state.jobProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJobProfile: (payload) => dispatch(setJobProfile(payload)),
    addToGSheet: (payload) => dispatch(addToGSheet(payload)),
    setShowHome: (payload) => dispatch(setShowHome(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
