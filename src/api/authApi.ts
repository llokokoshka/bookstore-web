import axios from 'axios';

import { axiosInstance } from '../axiosDefaul';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addUser } from '../store/authSlice';
import { getUserApi } from '../store/thunk';

// export async function getUserF() {
//   try {
//     const response = await axiosInstance.get('/user/me');
//     if (response.status === 401) {
//       return response.status;
//     }
//     return response.data;
//   } catch (err: any) {
//     console.error('Ошибка при получении пользователя');
//     err.response.status = 401;
//     return err.response.status;
//   }
// }

// export async function RefTokenF() {
//   const dispatch = useAppDispatch();
//   const refToken = localStorage.getItem('refresh');

//   if (!refToken) {
//     throw new Error('No refresh token');
//   }

//   try {
//     const response = await axios.post('/auth/refresh-token', { refToken });

//     console.log('Обновление токена!');

//     const { access_token, refresh_token } = response.data;

//     localStorage.setItem('access', access_token);
//     localStorage.setItem('refresh', refresh_token);

//     axiosInstance.defaults.headers.common[
//       'Authorization'
//     ] = `Bearer ${access_token}`;

//     const user = await getUserF();
//     console.log('user in refresh token function ', user);
//     if (user) {
//       dispatch(addUser({ user }));
//     }
//   } catch (err) {
//     console.error('Ошибка при обновлении токена');
//     return err;
//   }
// }

export function CheckUser() {
  const localStorageToken = localStorage.getItem('access');
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (localStorageToken && !user) {
          getUserApi();
        }
      } catch (err) {
        // localStorage.removeItem('access');
        // localStorage.removeItem('refresh');
        // navigate('/');
        return err;
      }
    };
    getUser();
  }, [user, localStorageToken, dispatch, navigate]);
  return { localStorageToken, user };
}
