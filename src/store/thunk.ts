import { createAsyncThunk } from '@reduxjs/toolkit';

import { IFormReg } from '../lib/types';
import { axiosInstance } from '../axiosDefaul';

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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const regUser = createAsyncThunk(
  '/sign-up',
  async ({ email, password }: IFormReg, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/sign-up', {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return response.data;
    } catch (err: any) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserApi = createAsyncThunk('/profile', async () => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  } catch (err: any) {
    return err.response.status;
  }
});

export const getAllBooks = createAsyncThunk('/', async () => {
  try {
    const response = await axiosInstance.get('/books/paginate?page=1&take=4');
    return response.data;
  } catch (err: any) {
    return err.response.status;
  }
});
