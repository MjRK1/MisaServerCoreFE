import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/main.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/redux/store';

const root = document.getElementById("root");
// @ts-ignore
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
