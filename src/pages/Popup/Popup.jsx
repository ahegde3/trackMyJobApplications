import React from 'react';
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
import { store } from '../../store';
import Login from '../Login/Login';
import Home from '../Home/Home';

const history = createMemoryHistory();
const Popup = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Login />
          {/* <Home /> */}
        </Router>
      </Provider>
    </React.StrictMode>
  );
};

export default Popup;
