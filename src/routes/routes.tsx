import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/Profile';
import ProtectedRouter from './ProtectedRouter';
import RegistrationPage from '../pages/Registration';
import BookPage from '../components/Book Page/BookPage';
import CartPage from '../components/Cart/CartPage';
import FavoritePage from '../components/Favorites/FavoritesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:id',
    element: <BookPage />,
  },
  {
    path: '/sign-in',
    element: <AuthorizationPage />,
  },
  { path: '/sign-up', element: <RegistrationPage /> },
  {
    element: <ProtectedRouter />,
    children: [
      { path: '/profile', element: <ProfilePage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/favorite', element: <FavoritePage /> },
    ],
  },
]);

export default router;
