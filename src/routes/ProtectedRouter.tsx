import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter: React.FC = () => {
  const localStorageToken = localStorage.getItem('access');
  return localStorageToken ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRouter;
