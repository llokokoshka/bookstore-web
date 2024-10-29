import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestPackage } from '../axiosDefaul';

interface IFormInput {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  '/sign-in',
  async ({ email, password }: IFormInput, thunkAPI) => {
    try {
      const response = await requestPackage.post('/auth/sign-in', {
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

export const refreshToken = createAsyncThunk(
  '/refresh-token',
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await requestPackage.post('/auth/refresh-token', {
        refreshToken,
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
