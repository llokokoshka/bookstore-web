import { PropsWithChildren, useEffect, useState } from 'react';

import { useAppDispatch } from '../hooks';
import { getUser } from '../store/thunk';
import { ERROR_GET_USER_DATA } from '../constants/errorConstants';

const CheckUserAuth: React.FC<PropsWithChildren> = (props) => {
  const dispatch = useAppDispatch();

  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const checkUserF = async () => {
      if (!accessToken) {
        setIsInit(true);
      }
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        console.error(ERROR_GET_USER_DATA, error);
      } finally {
        setIsInit(true);
      }
    };
    checkUserF();
  }, [dispatch]);

  if (!isInit) {
    return null;
  }

  return <>{props.children}</>;
};

export default CheckUserAuth;
