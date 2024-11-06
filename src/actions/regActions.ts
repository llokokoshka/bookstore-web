import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../axiosDefaul';
import { IFormReg } from '../lib/actionTypes';

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
