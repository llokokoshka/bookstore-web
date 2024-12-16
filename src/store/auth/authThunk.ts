import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, regUserApi } from '../../api/authApi';
import { AppPages } from '../../constants/textConstants';
import { getUserApi } from '../../api/userApi';
import { IUserResponseData, IFormReg } from '../../lib/authTypes';

export const loginUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.login,
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginUserApi(email, password);

      const { access_token, refresh_token } = data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const regUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.registration,
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await regUserApi(email, password);

      const { access_token, refresh_token } = data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return data;
    } catch (err: any) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk<IUserResponseData>(
  AppPages.profile,
  async (_, thunkAPI) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
