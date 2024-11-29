import { createSlice } from '@reduxjs/toolkit';

import { IBookItemState } from '../lib/types';
import { addComment, getBookRating, getComments } from './thunk';

const initialState: IBookItemState = {
  book: null,
  error: null,
  loading: false,
};

const bookItemSlice = createSlice({
  name: 'bookItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookRating.fulfilled, (state, action) => {
        state.loading = false;
        if (state.book && state.book.id === action.payload.bookId) {
          state.book.rates = { rating: action.payload.rating };
        }
      })
      .addCase(getBookRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = bookItemSlice.actions;

export default bookItemSlice.reducer;
