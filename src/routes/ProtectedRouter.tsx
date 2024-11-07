import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserApi } from '../store/thunk';

export function CheckUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const checkUserF = async () => {
      const accessToken = localStorage.getItem('access');

      if (accessToken && !user) {
        try {
          const getUserData = await dispatch(getUserApi());
          console.log(
            'Получение данных пользователя для обновления юзера в сторе ',
            getUserData.payload
          );
          return getUserData.payload;
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
          navigate('/sign-in');
        }
      }
    };

    checkUserF();
  }, [dispatch, navigate, user]);

  return user;
}

const ProtectedRouter: React.FC = () => {
  CheckUser();
  const accessToken = localStorage.getItem('access');
  return accessToken ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRouter;
