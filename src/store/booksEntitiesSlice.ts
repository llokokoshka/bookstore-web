import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookType, IBookState } from '../lib/types';
import {
  addComment,
  addOrUpdateRating,
  getBookById,
  getBookRating,
} from './thunk';

const initialState: IBookState = {
  books: null,
  error: null,
  loading: false,
};

const bookEntititesSlice = createSlice({
  name: 'bookEntitites',
  initialState,
  reducers: {
    addOrUpdBook(state, action: PayloadAction<BookType[]>) {
      action.payload.forEach((newBook) => {
        const exBookIndex = state.books?.findIndex(
          (book) => book.id === newBook.id
        );
        if (
          exBookIndex !== -1 &&
          state.books &&
          (exBookIndex || exBookIndex === 0)
        ) {
          state.books[exBookIndex] = {
            ...state.books[exBookIndex],
            ...newBook,
          };
        } else if (state.books) {
          state.books.push(newBook);
        } else {
          state.books = [newBook];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.books) {
          const indexOfBook = state.books.findIndex(
            (book) => book.id === action.payload.bookId
          );
          if (
            indexOfBook !== -1 &&
            (indexOfBook || indexOfBook === 0) &&
            state.books[indexOfBook].comments !== undefined
          ) {
            state.books[indexOfBook].comments = {
              ...state.books[indexOfBook].comments,
              ...action.payload,
            };
          } else if (indexOfBook !== -1 && (indexOfBook || indexOfBook === 0)) {
            state.books[indexOfBook].comments = [action.payload];
          }
        }
      })
      .addCase(addOrUpdateRating.fulfilled, (state, action) => {
        if (state.books) {
          const indexOfBook = state.books.findIndex(
            (book) => book.id === action.payload.bookId
          );
          if (
            indexOfBook !== -1 &&
            (indexOfBook || indexOfBook === 0) &&
            state.books[indexOfBook].rates &&
            state.books[indexOfBook].rates !== undefined
          ) {
            state.books[indexOfBook].rates = {
              ...state.books[indexOfBook].rates,
              ...action.payload.rating,
            };
            state.books[indexOfBook].totalRate = action.payload.avarageRating;
          } else if (indexOfBook !== -1 && (indexOfBook || indexOfBook === 0)) {
            state.books[indexOfBook].rates = action.payload.rating;
            state.books[indexOfBook].totalRate = action.payload.avarageRating;
          }
        }
      })
      .addCase(getBookRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookRating.fulfilled, (state, action) => {
        state.loading = false;
        if (state.books !== null) {
          const indexOfBook = state.books.findIndex(
            (book) => book.id === action.payload.bookId
          );
          if (
            (indexOfBook === 0 || indexOfBook) &&
            indexOfBook === action.payload.bookId
          ) {
            state.books[indexOfBook].totalRate = action.payload.rate;
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
