import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';

import './index.css';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <MantineProvider>
      <NotificationsProvider
        position = "top-right"
      >
        <AuthContextProvider>
          <Router>
            <App />
          </Router>
        </AuthContextProvider>
      </NotificationsProvider>
    </MantineProvider>
  // </React.StrictMode>
);
