import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TitleComponent from '../../containers/TitleComponent';
import JobApplicationComponent from '../../containers/JobApplicationComponent';
import Button from '@mui/material/Button';
import React from 'react';
import './index.css';
import {
  setJobProfile,
  addToGSheet,
  modifyJobProfile,
} from '../../slices/jobSlice';
import { setShowHome } from '../../slices/userSlice';

function Home(props) {
  const [isProfileSet, setProfileisSet] = useState(false);
  const {
    uid,
    position,
    company,
    sheetId,
    setJobProfile,
    addToGSheet,
    showHome,
    setShowHome,
    modifyJobProfile,
  } = props;

  useEffect(() => {
    console.log('Home', isProfileSet);
    if (chrome.runtime) {
      // chrome.runtime.sendMessage({ message: 'Handshake' });

      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == 'jobProfile') {
          modifyJobProfile({
            position: request.jobProfile?.position,
            company: request.jobProfile?.company,
            source: request.jobProfile?.source,
          });
          if (request.jobProfile?.company != company) {
            console.log('event handler', request.jobProfile?.company, company);
            setShowHome(false);
          }
          // if (!isProfileSet) {
          //   console.log('isProfile set');
          //   setShowHome(false);
          //   setProfileisSet(true);
          // }
        }
        return () => chrome.runtime.onMessage.removeListener();
      });
    }
  }, [props]);
  return (
    <div>
      <TitleComponent />
      {showHome ? (
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
    modifyJobProfile: (payload) => dispatch(modifyJobProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
