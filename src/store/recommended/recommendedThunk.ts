import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendedApi } from '../../api/bookApi';
import { IRecommendedThunk } from '../../lib/types';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';

export const getRecommended = createAsyncThunk<IRecommendedThunk>(
  'books/recommended',
  async (_, thunkAPI) => {
    try {
      const data = await getRecommendedApi();
      thunkAPI.dispatch(addOrUpdBook(data.books));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
