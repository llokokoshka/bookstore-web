import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBookState, BookType } from '../../lib/types';
import {
  addComment,
  addOrUpdateRating,
  getBookRating,
  getBookById,
} from './booksEntitiesThunk';

const initialState: IBookState = {
  books: {},
  error: null,
  loading: false,
};

const bookEntititesSlice = createSlice({
  name: 'bookEntitites',
  initialState,
  reducers: {
    addOrUpdBook(state, action: PayloadAction<BookType[]>) {
      if (Object.keys(state.books).length === 0) {
        const normalizedBooks = action.payload.reduce<Record<number, BookType>>(
          (result, current) => {
            result[current.id] = current;
            return result;
          },
          {}
        );
        if (normalizedBooks) state.books = normalizedBooks;
      } else {
        action.payload.forEach((newBook) => {
          if (newBook.id in state.books) {
            state.books[newBook.id] = {
              ...state.books[newBook.id],
              ...newBook,
            };
          } else {
            state.books[newBook.id] = newBook;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (!(Object.keys(state.books).length === 0)) {
          const bookId = action.payload.bookId;
          if (bookId && bookId in state.books) {
            state.books[bookId].comments = {
              ...state.books[bookId].comments,
              ...action.payload,
            };
          } else if (bookId) {
            state.books[bookId].comments = [action.payload];
          }
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      .addCase(addOrUpdateRating.fulfilled, (state, action) => {
        if (!(Object.keys(state.books).length === 0)) {
          const bookId = action.payload.bookId;
          if (bookId && state.books[bookId].rates) {
            state.books[bookId].rates = {
              ...state.books[bookId].rates,
              ...action.payload.rating,
            };
            state.books[bookId].totalRate = action.payload.avarageRating;
          } else if (bookId) {
            state.books[bookId].rates = action.payload.rating;
            state.books[bookId].totalRate = action.payload.avarageRating;
          }
        }
      })
      .addCase(getBookRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookRating.fulfilled, (state, action) => {
        state.loading = false;
        if (!(Object.keys(state.books).length === 0)) {
          const bookId = action.payload.bookId;
          if (bookId && bookId in state.books) {
            state.books[bookId].totalRate = action.payload.rate;
          }
        }
      })
      .addCase(getBookRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [action.payload];
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addOrUpdBook } = bookEntititesSlice.actions;

export default bookEntititesSlice.reducer;
