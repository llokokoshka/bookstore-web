import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IFormReg } from '../lib/actionTypes';
import { axiosInstance } from '../axiosDefaul';
import { useAppSelector } from '../hooks';

export const loginUser = createAsyncThunk(
  '/sign-in',
  async ({ email, password }: IFormReg, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/sign-in', {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return response.data;
    } catch (err: any) {
      console.error('login user error: ', err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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

export function CheckUser() {
  const localStorageToken = localStorage.getItem('access');
  const user = useAppSelector((state) => state.auth.user);

  return { localStorageToken, user };
}
