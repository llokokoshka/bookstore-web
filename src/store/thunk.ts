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
    genres?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    sortBy?: string | null;
  }) => {
    try {
      const { pageNum, genres, minPrice, maxPrice, sortBy } = data;
      let strOfSearch = `/books/?page=${pageNum}&take=12`;

      if (genres) {
        strOfSearch += `&genres=${genres}`;
      }
      if (minPrice) {
        strOfSearch += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        strOfSearch += `&maxPrice=${maxPrice}`;
      }
      if (sortBy) {
        strOfSearch += `&sortBy=${sortBy}`;
      }

      const response = await axiosInstance.get(strOfSearch);

      return response.data;
    } catch (err: any) {
      return err.response.status;
    }
  }
);
type dataType = {
  text: string;
  bookId: number;
  userId: number;
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ text, bookId, userId }: dataType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`books/${bookId}/comment`, {
        text,
      });

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`books/${bookId}/comment`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBookRating = createAsyncThunk(
  'books/fetchBookRating',
  async (bookId: number) => {
    const response = await axiosInstance.get(`/books/${bookId}/rating`);
    return { bookId, rating: response.data };
  }
);

export const addOrUpdateRating = createAsyncThunk(
  'books/addOrUpdateRating',
  async ({ bookId, value }: { bookId: number; value: number }) => {
    await axiosInstance.post(`/books/${bookId}/rating`, { value });
    const response = await axiosInstance.get(`/books/${bookId}/rating`);
    return { bookId, rating: response.data };
  }
);

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await axiosInstance.get(`user/cart`);
  return response.data;
});

export const addCartItem = createAsyncThunk(
  'cart/addItemInCart',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post('user/cart/item', { bookId });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const upAmountCartItem = createAsyncThunk(
  'cart/upAmountCartItem',
  async (ItemId: number, thunkAPI) => {
    try {
      const action = true;
      const response = await axiosInstance.patch(`user/cart/item/${ItemId}`, {
        action,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const downAmountCartItem = createAsyncThunk(
  'cart/downAmountCartItem',
  async (ItemId: number, thunkAPI) => {
    try {
      const action = false;
      const response = await axiosInstance.patch(`user/cart/item/${ItemId}`, {
        action,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteItemInCart',
  async (ItemId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`user/cart/item/${ItemId}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getFavorite = createAsyncThunk(
  'favorite/getFavorite',
  async () => {
    const response = await axiosInstance.get(`user/favorites`);
    console.log(response.data);

    return response.data;
  }
);

export const addFavoriteItem = createAsyncThunk(
  'favorite/addItemInFavorite',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post('user/favorites/item', {
        bookId,
      });
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteFavoriteItem = createAsyncThunk(
  'favorite/deleteItemFromFavorite',
  async (ItemId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `user/favorites/item/${ItemId}`
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
