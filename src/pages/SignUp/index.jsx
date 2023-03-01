import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from '../../store';
import { Provider } from 'react-redux';
import SignUp from './SignUp';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <SignUp />
  </Provider>
);
