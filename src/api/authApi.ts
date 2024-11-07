import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserApi } from '../store/thunk';
import { ERROR_GET_USER_DATA } from '../constants/errorConstants';

export function CheckUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const checkUserF = async () => {
      const accessToken = localStorage.getItem('access');

      if (accessToken && !user) {
        try {
          const getUserData = await dispatch(getUserApi());
          return getUserData.payload;
        } catch (error) {
          console.error(ERROR_GET_USER_DATA, error);
          navigate('/sign-in');
        }
      }
    };
    checkUserF();
  }, [dispatch, navigate, user]);

  return user;
}
