import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getFavoriteApi,
  addFavoriteItemApi,
  deleteFavoriteItemApi,
} from '../../api/userApi';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';
import {
  FavoriteNormalizeType,
  FavoriteItemNormalizeType,
} from '../../lib/favoriteTypes';
import { RootState } from '..';

export const getFavorite = createAsyncThunk<FavoriteNormalizeType>(
  'favorite/getFavorite',
  async (_, thunkAPI) => {
    const data = await getFavoriteApi();
    const booksInFav = data.favoritesItems.map((item) => {
      return item.book;
    });

    thunkAPI.dispatch(addOrUpdBook(booksInFav));

    const arrayWithFavItems = data.favoritesItems;

    const newArrWithBookIds = arrayWithFavItems
      ? arrayWithFavItems.map((item) => {
          const bookId = item.book.id;
          return { ...item, book: bookId };
        })
      : null;

    const newData = {
      ...data,
      favoritesItems: newArrWithBookIds ? newArrWithBookIds : [],
    };

    return newData;
  }
);

export const addFavoriteItem = createAsyncThunk<
  FavoriteItemNormalizeType,
  number,
  {
    state: RootState;
  }
>('favorite/addItemInFavorite', async (bookId, thunkAPI) => {
  try {
    const store = thunkAPI.getState();

    const data = await addFavoriteItemApi(bookId);
    thunkAPI.dispatch(addOrUpdBook([data.book]));
    const newData = {
      ...data,
      book: data.book.id,
    };
    return newData;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const deleteFavoriteItem = createAsyncThunk(
  'favorite/deleteItemFromFavorite',
  async (ItemId: number, thunkAPI) => {
    try {
      const data = await deleteFavoriteItemApi(ItemId);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
