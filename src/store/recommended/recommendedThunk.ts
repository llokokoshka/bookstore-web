import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRecommendedApi } from '../../api/bookApi';
import { IRecommendedThunk } from '../../lib/types';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';

export type Data = {
  bookId: number;
  numberOfRecBooks: number;
};

export const getRecommended = createAsyncThunk<IRecommendedThunk, Data>(
  'books/recommended',
  async ({ bookId, numberOfRecBooks }, thunkAPI) => {
    try {
      const data = await getRecommendedApi({ bookId, numberOfRecBooks });
      thunkAPI.dispatch(addOrUpdBook(data.books));
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
