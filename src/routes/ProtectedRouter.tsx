import React from 'react';
import { Outlet } from 'react-router-dom';
import { CheckUser } from '../actions/authActions';

const ProtectedRouter: React.FC = () => {
  const { localStorageToken } = CheckUser();
  return localStorageToken ? <Outlet /> : null;
};

export default ProtectedRouter;
