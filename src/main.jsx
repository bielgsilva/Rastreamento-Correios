import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Provider from './hooks/Provider';
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');


createRoot(rootElement).render(
  <React.StrictMode>
    <Provider>
      <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>
);
