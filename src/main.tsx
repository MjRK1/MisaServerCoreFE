import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/main.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
