import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { AppPages } from '../constants/textConstants';

const ProtectedRouter: React.FC<
  PropsWithChildren & { skipNavigation?: boolean }
> = (props) => {
  const user = useAppSelector((state) => state.auth.user);
  if (user) {
    return <>{props.children}</>;
  }

  if (!props.skipNavigation) {
    return <Navigate to={AppPages.base} />;
  }
  return null;
};

export default ProtectedRouter;
