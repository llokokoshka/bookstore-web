import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Autorisate from './Autorisate';
import Registration from './Registration';

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
]);

export default router;
