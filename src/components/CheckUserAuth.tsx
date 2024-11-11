import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserApi } from '../store/thunk';
import { ERROR_GET_USER_DATA } from '../constants/errorConstants';

const CheckUserAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = localStorage.getItem('access');
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const checkUserF = async () => {
      if (accessToken && !user) {
        try {
          await dispatch(getUserApi());
        } catch (error) {
          console.error(ERROR_GET_USER_DATA, error);
        }
      }
      setIsInit(true);
    };
    checkUserF();
  }, [dispatch, user, accessToken]);

  // if (!isInit) {
  //   return null;
  // }

  return null;
};

export default CheckUserAuth;
