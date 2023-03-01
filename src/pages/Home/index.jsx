import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from '../../store';
import { Provider } from 'react-redux';

import Home from './Home';
// import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);
