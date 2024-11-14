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

export const getBooks = createAsyncThunk(
  `/`,
  async (data: {
    pageNum?: string | null;
    genres?: string[] | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    sortBy?: string | null;
  }) => {
    try {
      const { pageNum, genres, minPrice, maxPrice, sortBy } = data;

      const allGenres = genres?.join(',');
      console.log('Genres in thun >>>> ', allGenres);
      if (genres && minPrice && maxPrice && sortBy) {
        const response = await axiosInstance.get(
          `/books/paginate?page=${pageNum}&take=12&genres=${allGenres}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`
        );
        return response.data;
      }

      if (genres && minPrice && maxPrice) {
        const response = await axiosInstance.get(
          `/books/paginate?page=${pageNum}&take=12&genres=${allGenres}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        return response.data;
      }

      if (genres && minPrice) {
        const response = await axiosInstance.get(
          `/books/paginate?page=${pageNum}&take=12&genres=${allGenres}&minPrice=${minPrice}`
        );
        return response.data;
      }

      if (genres) {
        const response = await axiosInstance.get(
          `/books/paginate?page=${pageNum}&take=12&genres=${allGenres}`
        );
        return response.data;
      }

      const response = await axiosInstance.get(
        `/books/paginate?page=${pageNum}&take=12`
      );
      return response.data;
    } catch (err: any) {
      return err.response.status;
    }
  }
);
