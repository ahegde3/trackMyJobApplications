import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import TitleComponent from '../../containers/TitleComponent';
import JobApplicationComponent from '../../containers/JobApplicationComponent';
import Button from '@mui/material/Button';
import './index.css';
import { MESSAGES } from '../../constants/message';
import {
  setJobProfile,
  addToGSheet,
  modifyJobProfile,
} from '../../slices/jobSlice';
import { setShowHome } from '../../slices/userSlice';

function Home(props) {
  const { sheetId, showHome, setShowHome, modifyJobProfile } = props;

  const GOOGLE_DOCS_LINK = 'https://docs.google.com/spreadsheets/d/';

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == MESSAGES.JOB_PROFILE) {
          modifyJobProfile({
            position: request.jobProfile?.position,
            company: request.jobProfile?.company,
            source: request.jobProfile?.source,
          });
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
              const url = GOOGLE_DOCS_LINK + sheetId;
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
