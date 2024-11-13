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
  reducers: {
    filteredBooks(state, action) {
      // console.log(action.payload.data);
      for (let i = 0; i < action.payload.data.length; i++) {
        state.books = state.books.filter((book) => book.id !== action.payload.data[i].id);
      }
      // if (action.payload.data.length === 1) {
      // } else {

      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.data.map((book: Book) => {
          return state.books?.push(book);
        });
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filteredBooks } = bookSlice.actions;

export default bookSlice.reducer;
