import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CheckUser } from '../actions/authActions';

const ProtectedRouter: React.FC = () => {
  const { localStorageToken, user } = CheckUser();
  return localStorageToken ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRouter;
