import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import {Provider} from 'react-redux';
import store from './app/store';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: 'bottom right',
  timeout: 2000,
  offset: '30px',
  type:'success',
  transition: 'scale'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App/>
    </AlertProvider>
  </Provider>
);