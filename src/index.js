import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';

import './index.css';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { CloudinaryContextProvider } from './context/cloudinaryContext';
import GlobalContextProvider from './context/globalContext';
import {Toaster} from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <CloudinaryContextProvider>
      <NotificationsProvider
        position = "top-right"
      >
        <AuthContextProvider>
          <Router>
              <GlobalContextProvider>
                <App />
                <Toaster />
              </GlobalContextProvider>
          </Router>
        </AuthContextProvider>
      </NotificationsProvider>
            </CloudinaryContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
