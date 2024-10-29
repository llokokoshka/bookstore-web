import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestPackage } from '../axiosDefaul';

interface IFormInput {
  email: string;
  password: string;
}

export const regUser = createAsyncThunk(
  '/sign-up',
  async ({ email, password }: IFormInput, thunkAPI) => {
    try {
      const response = await requestPackage.post('/auth/sign-up', {
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
