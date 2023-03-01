import React from 'react';
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
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
// import { store } from '../../store';
// import { Provider } from 'react-redux';
import Login from '../Login/Login';
import Home from '../Home/Home';

const history = createMemoryHistory();
function Popup(props) {
  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}

      {!props.isLoggedIn && localStorage.getItem('IS_LOGGED_IN') !== true ? (
        <Login />
      ) : (
        <Home />
      )}

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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
