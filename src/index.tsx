import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { loggerInit } from './services/logger';
import { theme } from './styles/theme';
import { ThemeProvider } from '@material-ui/core';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/analytics';
import * as configs from './configs.json';

var firebaseConfig = {
  apiKey: configs.apiKey,
  authDomain: configs.authDomain,
  projectId: configs.projectId,
  storageBucket: configs.storageBucket,
  messagingSenderId: configs.messagingSenderId,
  appId: configs.appId,
  measurementId: configs.measurementId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

loggerInit();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
