import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './stores';
import App from './App.jsx';

render(
  // <BrowserRouter>
  <Provider store = {store}>
    <App />
  </Provider>,
  // </BrowserRouter>,
  document.getElementById('app'),
);