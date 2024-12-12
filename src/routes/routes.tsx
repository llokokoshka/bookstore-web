import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/Profile';
import ProtectedRouter from './ProtectedRouter';
import RegistrationPage from '../pages/Registration';
import BookPage from '../components/Book Page/BookPage';
import CartPage from '../components/Cart/CartPage';
import FavoritePage from '../components/Favorites/FavoritesPage';
import { AppPages } from '../constants/textConstants';

const router = createBrowserRouter([
  {
    path: AppPages.base,
    element: <HomePage />,
  },
  {
    path: AppPages.bookId,
    element: <BookPage />,
  },
  {
    path: AppPages.login,
    element: <AuthorizationPage />,
  },
  { path: AppPages.registration, element: <RegistrationPage /> },
  {
    element: <ProtectedRouter />,
    children: [
      { path: AppPages.profile, element: <ProfilePage /> },
      { path: AppPages.cart, element: <CartPage /> },
      { path: AppPages.favorite, element: <FavoritePage /> },
    ],
  },
]);

export default router;
