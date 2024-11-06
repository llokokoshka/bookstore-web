import axios from 'axios';

import { axiosInstance } from '../axiosDefaul';

export async function getUserF() {
  try {
    const response = await axiosInstance.get('/user/me');
    if (response.status === 401) {
      return response.status;
    }
    return response.data;
  } catch (err: any) {
    console.error('Ошибка при получении пользователя');
    err.response.status = 401;
    return err.response.status;
  }
}

export async function RefTokenF() {
  const refToken = localStorage.getItem('refresh');
  const response = await axios.post('/auth/refresh-token', { refToken });

  const { access_token, refresh_token } = response.data;

  localStorage.setItem('access', access_token);
  localStorage.setItem('refresh', refresh_token);
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${access_token}`;
}
