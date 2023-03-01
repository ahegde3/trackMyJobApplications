import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from '../../store';
import { Provider } from 'react-redux';

import Popup from './Popup';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <Popup />
  </Provider>
);
