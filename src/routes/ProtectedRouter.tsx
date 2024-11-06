import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { getUserF } from '../actions/authActions';
import { addUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

function CheckUser() {
  const localStorageToken = localStorage.getItem('access');
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (localStorageToken && !user) {
          const user = await getUserF();
          dispatch(addUser({ user }));
        }
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
        return err;
      }
    };
    getUser();
  }, [localStorageToken, dispatch, navigate]);
  return { localStorageToken };
}

const ProtectedRouter: React.FC = () => {
  const { localStorageToken } = CheckUser();
  return localStorageToken ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRouter;
