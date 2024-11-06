import { createBrowserRouter } from 'react-router-dom';

import App from '../pages/HomePage';
import Autorisate from '../pages/Autorisate';
import Registration from '../pages/Registration';
import ProfilePage from '../pages/Profile';
import ProtectedRouter from './ProtectedRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign-in',
    element: <Autorisate />,
  },
  { path: '/sign-up', element: <Registration /> },
  {
    element: <ProtectedRouter />,
    children: [{ path: '/me', element: <ProfilePage /> }],
  },
]);

export default router;
