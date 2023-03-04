import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/img/logo.svg';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import './Popup.css';

import Login from '../Login/Login';
import Home from '../Home/Home';
import { setUid } from '../../slices/userSlice';
import { setJobProfile, addToGSheet } from '../../slices/jobSlice';
import { MESSAGES } from '../../constants/message';

const history = createMemoryHistory();
function Popup(props) {
  const { setUid, uid } = props;

  useEffect(() => {
    if (localStorage.getItem('IS_LOGGED_IN') && localStorage.getItem('uid')) {
      setUid(localStorage.getItem('uid'));
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
  });
  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <div className="container">
        {!props.isLoggedIn ? <Login /> : <Home />}
      </div>
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
    setUid: (payload) => dispatch(setUid(payload)),
    setJobProfile: (payload) => dispatch(setJobProfile(payload)),
    addToGSheet: (payload) => dispatch(addToGSheet(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
