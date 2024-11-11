import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';

import { store } from './store';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import router from './routes/routes';

const CheckUserAuth = lazy(() => import('./components/CheckUserAuth'));

export default function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Provider store={store}>
        <GlobalStyles />
        <Suspense
          fallback={
            <StyledWrapper>
              <div className="vk-preloader">Loading...</div>
            </StyledWrapper>
          }
        >
          <CheckUserAuth />
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ThemeProvider>
  );
}

const StyledWrapper = styled.div`
  .vk-preloader {
    position: absolute;
    left: 0;
    top: 100px;
    right: 0;
    bottom: 0;
    background: #ffffff;
    text-align: center;
    font-size: 50px;
    color: #344966;
  }

  .vk-preloader.hidden {
    opacity: 0;
    transition: opacity 2s;
  }

  .vk-preloader.none {
    display: none;
  }
`;
