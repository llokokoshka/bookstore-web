import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';

import { store } from './store';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import router from './routes/routes';
import CheckUserAuth from './components/CheckUserAuth';
import InitialSocket from './components/InitialSocket';

export default function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Provider store={store}>
        <GlobalStyles />
        <InitialSocket />
        <CheckUserAuth>
          <RouterProvider router={router} />
        </CheckUserAuth>
      </Provider>
    </ThemeProvider>
  );
}
