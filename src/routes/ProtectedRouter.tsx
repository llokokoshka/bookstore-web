import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../actions/authActions';
import { addUser } from '../store/authSlice';

const ProtectedRouter: React.FC = () => {
  const localStorageToken = localStorage.getItem('access');
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const gettUser = async () => {
      if (localStorageToken && !user) {
        const user = await getUser();
        dispatch(addUser({ user: user }));
      }
    };
    gettUser();
  }, [user, localStorageToken, dispatch]);
  return localStorageToken ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRouter;
