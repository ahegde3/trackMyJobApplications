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

const history = createMemoryHistory();
function Popup(props) {
  const { setUid } = props;

  useEffect(() => {
    console.log(
      'popup useEffect called',
      localStorage.getItem('IS_LOGGED_IN'),
      localStorage.getItem('uid')
    );
    if (localStorage.getItem('IS_LOGGED_IN') && localStorage.getItem('uid')) {
      console.log('inside');
      setUid(localStorage.getItem('uid'));
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setUid: (payload) => dispatch(setUid(payload)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
