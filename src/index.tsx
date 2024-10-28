import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';

import { store } from './store';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import router from './routes/routes';

const rootElem = document.getElementById('root');

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
