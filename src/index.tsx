import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { API } from './config';

console.log(API);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
