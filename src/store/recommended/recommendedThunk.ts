import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRecommendedApi } from '../../api/bookApi';
import { IRecommendedThunk } from '../../lib/types';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';

export const getRecommended = createAsyncThunk<IRecommendedThunk, number>(
  'books/recommended',
  async (bookId, thunkAPI) => {
    try {
      const data = await getRecommendedApi(bookId);
      thunkAPI.dispatch(addOrUpdBook(data.books));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
