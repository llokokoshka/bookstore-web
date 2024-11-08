import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';

import { store } from './store';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import router from './routes/routes';
const CheckUserAuth = lazy(() => import('./components/CheckUserAuth'));
// import CheckUserAuth from './components/CheckUserAuth';

export default function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Provider store={store}>
        <GlobalStyles />
        <Suspense fallback={<div>Loading...</div>}>
          <CheckUserAuth />
        </Suspense>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}
