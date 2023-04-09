import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './Popup.css';
import Button from '@mui/material/Button';
import Login from '../Login/Login';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import { setShowHome, saveUserData } from '../../slices/userSlice';
import { setJobProfile, addToGSheet } from '../../slices/jobSlice';
import { MESSAGES } from '../../constants/message';

function Popup(props) {
  const {
    saveUserData,
    uid,
    isRegisteredUser,
    showHome,
    setShowHome,
    isLoggedIn,
  } = props;

  const logOut = () => {
    saveUserData(null);
    localStorage.setItem('IS_LOGGED_IN', false);
    localStorage.removeItem('uid');
  };

  useEffect(() => {
    //Save userData if already loggedIn
    if (
      localStorage.getItem('IS_LOGGED_IN') &&
      localStorage.getItem('uid') &&
      !isLoggedIn
    ) {
      saveUserData({ uid: localStorage.getItem('uid') });
    }

    if (chrome.runtime) {
      chrome.runtime.sendMessage({ message: MESSAGES.HANDSHAKE, uid: uid });

      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == MESSAGES.JOB_PROFILE)
          setJobProfile({
            position: request.jobProfile?.position,
            company: request.jobProfile?.company,
            source: request.jobProfile?.source,
          });
      });
    }
  }, [props]);
  return (
    <React.StrictMode>
      {!isLoggedIn ? (
        <div className="container">
          {isRegisteredUser ? <Login /> : <SignUp />}
        </div>
      ) : (
        <div className="container">
          <div className="logout-button">
            <Button onClick={logOut}>Logout</Button>
          </div>
          {!showHome && (
            <div>
              <Button
                onClick={() => {
                  setShowHome(true);
                }}
              >
                Go Back
              </Button>{' '}
            </div>
          )}
          <Home />
        </div>
      )}

      {/* </Provider> */}
    </React.StrictMode>
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
    saveUserData: (payload) => dispatch(saveUserData(payload)),
    setShowHome: (payload) => dispatch(setShowHome(payload)),
    setJobProfile: (payload) => dispatch(setJobProfile(payload)),
    addToGSheet: (payload) => dispatch(addToGSheet(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
