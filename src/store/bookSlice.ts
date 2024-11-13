import { createSlice } from '@reduxjs/toolkit';

import { Book, BookState } from '../lib/types';
import { getAllBooks } from './thunk';

const initialState: BookState = {
  books: [],
  error: null,
  loading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.map((book: Book) => {
          state.books?.push(book);
        });
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {} = bookSlice.actions;

export default bookSlice.reducer;
