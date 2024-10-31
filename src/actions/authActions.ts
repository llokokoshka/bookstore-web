import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFormReg } from '../lib/actionTypes';
import { axiosInstance } from '../axiosDefaul';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { addUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

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

export async function refTokenF() {
  const refToken = localStorage.getItem('refresh');
  const response = await axios.post('/auth/refresh-token', { refToken });

  if (response.status === 401) {
    return response.status;
  }
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (localStorageToken && !user) {
          const user = await getUserF();
          dispatch(addUser({ user }));
        }
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/sign-in');
        return err;
      }
    };
    getUser();
  }, [user, localStorageToken, dispatch, navigate]);
  return { localStorageToken, user };
}
