import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { store } from './stores';
import App from './App.jsx';

render(
  <CookiesProvider>
    <Provider store = {store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('app'),
);