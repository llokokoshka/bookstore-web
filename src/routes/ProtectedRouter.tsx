import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CheckUser } from '../api/authApi';

const ProtectedRouter: React.FC = () => {
  CheckUser();
  const accessToken = localStorage.getItem('access');
  return accessToken ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRouter;
