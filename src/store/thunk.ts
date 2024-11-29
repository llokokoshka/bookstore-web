import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AddCommentThunkType,
  IBook,
  IFormReg,
  IUserResponseData,
  QueryParamsType,
} from '../lib/types';
import { axiosInstance } from '../axiosDefaul';
import { ApiPath, AppPages } from '../constants/textConstants';

export const loginUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.login,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<IUserResponseData>(
        ApiPath.login,
        {
          email,
          password,
        }
      );

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const regUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.registration,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<IUserResponseData>(
        ApiPath.registration,
        {
          email,
          password,
        }
      );

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

export const getUserApi = createAsyncThunk<IUserResponseData>(
  AppPages.profile,
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<IUserResponseData>(
        ApiPath.user.me
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

/**
 * export const getUserApi = createAsyncThunk<
  { name: string },
  {chtoto: 'asdsa'},
  { state: RootState }
>('profile', async (arg, { getState, rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  } catch (err: any) {
    return err.response.status;
  }
});
 */

export const getBooks = createAsyncThunk<IBook, QueryParamsType>(
  `getBooks`,
  async (data, thunkAPI) => {
    try {
      const { pageNum, genres, minPrice, maxPrice, sortBy } = data;
      let strOfSearch;
      if (pageNum === undefined || pageNum === null) {
        strOfSearch = `/books/?page=1&take=12`;
      } else {
        strOfSearch = `/books/?page=${pageNum}&take=12`;
      }

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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ text, bookId }: AddCommentThunkType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        ApiPath.getBookCommentWithIdUrl(bookId),
        {
          text,
        }
      );
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
      const response = await axiosInstance.get(
        ApiPath.getBookCommentWithIdUrl(bookId)
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBookRating = createAsyncThunk(
  'books/fetchBookRating',
  async (bookId: number) => {
    const response = await axiosInstance.get(
      ApiPath.getBookRatingWithIdUrl(bookId)
    );
    return { bookId, rating: response.data };
  }
);

export const addOrUpdateRating = createAsyncThunk(
  'books/addOrUpdateRating',
  async ({ bookId, value }: { bookId: number; value: number }) => {
    await axiosInstance.post(ApiPath.getBookRatingWithIdUrl(bookId), { value });
    const response = await axiosInstance.get(
      ApiPath.getBookRatingWithIdUrl(bookId)
    );
    return { bookId, rating: response.data };
  }
);

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await axiosInstance.get(ApiPath.user.cart.allItems);
  return response.data;
});

export const addCartItem = createAsyncThunk(
  'cart/addItemInCart',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post(ApiPath.user.cart.item, {
        bookId,
      });
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
      const response = await axiosInstance.patch(
        ApiPath.user.cart.getItemWithIdUrl(ItemId),
        {
          action,
        }
      );
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
      const response = await axiosInstance.patch(
        ApiPath.user.cart.getItemWithIdUrl(ItemId),
        {
          action,
        }
      );
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
      const response = await axiosInstance.delete(
        ApiPath.user.cart.getItemWithIdUrl(ItemId)
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getFavorite = createAsyncThunk(
  'favorite/getFavorite',
  async () => {
    const response = await axiosInstance.get(
      ApiPath.user.favorites.allFavorites
    );
    return response.data;
  }
);

export const addFavoriteItem = createAsyncThunk(
  'favorite/addItemInFavorite',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post(ApiPath.user.favorites.item, {
        bookId,
      });
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
        ApiPath.user.favorites.getItemWithIdUrl(ItemId)
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
