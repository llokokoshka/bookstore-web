import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const ProtectedRouter: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRouter;
