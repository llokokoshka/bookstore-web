import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserApi } from '../store/thunk';
import { ERROR_GET_USER_DATA } from '../constants/errorConstants';
import { rejects } from 'assert';

let userInitializationPromise: Promise<void> | null = null;

const CheckUserAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = localStorage.getItem('access');

  if (!userInitializationPromise) {
    userInitializationPromise = new Promise<void>(async (resolve, reject) => {
      if (accessToken && !user) {
        const newData = await dispatch(getUserApi());
        console.log('user >>>', user);
      }
      resolve();
    });
  }

  throw userInitializationPromise;

  // useEffect(() => {
  //   const checkUserF = async () => {
  //     try {
  //       if (accessToken && !user) {
  //         const getUserData = await dispatch(getUserApi());
  //         // return getUserData.payload;
  //       }
  //     } catch (error) {
  //       console.error(ERROR_GET_USER_DATA, error);
  //     }
  //   };
  //   checkUserF();
  // }, [dispatch, user, accessToken]);

  // return null;
};

export default CheckUserAuth;
