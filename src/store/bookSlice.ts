import { createSlice } from '@reduxjs/toolkit';

import { BookState } from '../lib/types';
import { addOrUpdateRating, getBookRating, getBooks } from './thunk';

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
        state.books = action.payload.data;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBookRating.fulfilled, (state, action) => {
        if (state.books) {
          const updatedBooks = state.books.map((book) => {
            if (book.id === action.payload.bookId) {
              return { ...book, rates: { rating: action.payload.rating } };
            }
            return book;
          });
          state.books = updatedBooks;
        }
      })
      .addCase(addOrUpdateRating.fulfilled, (state, action) => {
        if (state.books) {
          const updatedBooks = state.books.map((book) => {
            if (book.id === action.payload.bookId) {
              return { ...book, rates: { rating: action.payload.rating } }; 
            }
            return book;
          });
          state.books = updatedBooks;
        }
      });
  },
});

// export const {  } = bookSlice.actions;

export default bookSlice.reducer;
