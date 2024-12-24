import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, regUserApi } from '../../api/authApi';
import { AppPages } from '../../constants/textConstants';
import {
  getUserApi,
  updateUserData,
  updateUserPassword,
} from '../../api/userApi';
import { IFormReg, IUserResponseData } from './authTypes';
import { UserType } from '../../lib/types';

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

export const updateUserDataThunk = createAsyncThunk<
  UserType,
  { fullName?: string; email?: string }
>('user/updateUserData', async (data, { rejectWithValue }) => {
  try {
    const updatedUser = await updateUserData(data);

    if (updatedUser) {
      return updatedUser;
    } else {
      throw new Error('Failed to update user data');
    }
  } catch (err: any) {
    console.error('Error updating user data:', err);
    return rejectWithValue(
      err.response.data.message || 'Error updating user data'
    );
  }
});

export const updateUserPasswordThunk = createAsyncThunk<
  string,
  { password: string; passwordNew: string; passwordRep: string }
>('user/updateUserPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserPassword(data);

    if (response) {
      return 'Password updated successfully';
    } else {
      throw new Error('Failed to update password');
    }
  } catch (err: any) {
    console.error('Error updating user password:', err);

    return rejectWithValue(
      err.response.data.message || 'Error updating password'
    );
  }
});
