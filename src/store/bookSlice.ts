import { createSlice } from '@reduxjs/toolkit';

import { BookState } from '../lib/types';
import { getBooks } from './thunk';

const initialState: BookState = {
  books: null,
  error: null,
  loading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.books = action.payload.data;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {  } = bookSlice.actions;

export default bookSlice.reducer;
