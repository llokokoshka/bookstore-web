import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestPackage } from '../axiosDefaul';
import { IFormReg } from '../lib/actionTypes';

export const loginUser = createAsyncThunk(
  '/sign-in',
  async ({ email, password }: IFormReg, thunkAPI) => {
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

export async function refreshToken(
  refToken: string | null
): Promise<string | null> {
  try {
    const response = await requestPackage.post('/auth/refresh-token', {
      refresh_token: refToken,
    });
    const { access_token, refresh_token } = response.data;
    console.log(response.data);

    localStorage.setItem('access', access_token);
    localStorage.setItem('refresh', refresh_token);

    return access_token;
  } catch (err) {
    console.error('Ошибка обновления токена');
    return null;
  }
}

export async function getUser() {
  try {
    const response = await requestPackage.get('/user/me');
    return response.data;
  } catch (err) {
    console.error('Ошибка при получении пользователя');
    return null;
  }
}
