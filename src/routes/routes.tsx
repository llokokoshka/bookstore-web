import { createBrowserRouter, Outlet } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/Profile';
import ProtectedRouter from './ProtectedRouter';
import RegistrationPage from '../pages/Registration';
import BookPage from '../components/Book Page/BookPage';
import CartPage from '../components/Cart/CartPage';
import FavoritePage from '../components/Favorites/FavoritesPage';
import { AppPages } from '../constants/textConstants';
import AppInitialization from '../components/AppInitialization';

const router = createBrowserRouter([
  {
    element: (
      <>
        <ProtectedRouter skipNavigation>
          <AppInitialization />
        </ProtectedRouter>
        <Outlet />
      </>
    ),
    path: '/',
    id: 'root',
    children: [
      {
        index: true,
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
        element: (
          <ProtectedRouter>
            <Outlet />
          </ProtectedRouter>
        ),
        children: [
          { path: AppPages.profile, element: <ProfilePage /> },
          { path: AppPages.cart, element: <CartPage /> },
          { path: AppPages.favorite, element: <FavoritePage /> },
        ],
      },
    ],
  },
]);

export default router;
