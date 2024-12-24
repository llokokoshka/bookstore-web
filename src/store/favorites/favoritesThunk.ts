import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getFavoriteApi,
  addFavoriteItemApi,
  deleteFavoriteItemApi,
} from '../../api/userApi';
import { FavoriteType } from '../../lib/favoriteTypes';
import { RootState } from '..';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';

export const getFavorite = createAsyncThunk<FavoriteType>(
  'favorite/getFavorite',
  async (_, { dispatch }) => {
    const data = await getFavoriteApi();
    dispatch(addOrUpdBook(data.favoriteBooks));
    return data;
  }
);

export const toggleFavorite = createAsyncThunk<
  FavoriteType,
  { bookId: number; isInFavorites: boolean },
  {
    state: RootState;
  }
>(
  'favorite/toffleItemInFavorite',
  async ({ bookId, isInFavorites }, thunkAPI) => {
    try {
      if (isInFavorites) {
        const data = await deleteFavoriteItemApi(bookId);
        return data;
      }
      const data = await addFavoriteItemApi(bookId);
      thunkAPI.dispatch(addOrUpdBook(data.favoriteBooks));

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
