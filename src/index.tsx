import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

import { store } from './store';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import router from './routes/routes';

const rootElem = document.getElementById('root');
const token = '16ri7';
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.common['Authorization'] = `Bearer${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={baseTheme}>
        <Provider store={store}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
