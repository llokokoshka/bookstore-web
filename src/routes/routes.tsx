import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Autorisate from './Autorisate';
import Registration from './Registration';
import ProfilePage from './Profile';
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
