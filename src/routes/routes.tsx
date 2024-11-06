import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/Profile';
import ProtectedRouter from './ProtectedRouter';
import RegistrationPage from '../pages/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/sign-in',
    element: <AuthorizationPage />,
  },
  { path: '/sign-up', element: <RegistrationPage /> },
  {
    element: <ProtectedRouter />,
    children: [{ path: '/me', element: <ProfilePage /> }],
  },
]);

export default router;
