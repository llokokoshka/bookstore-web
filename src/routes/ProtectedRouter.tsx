import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter: React.FC = () => {
  const token = localStorage.getItem('access');
  return token ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRouter;
