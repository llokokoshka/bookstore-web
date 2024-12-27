import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addComment,
  addOrUpdateRating,
  getBookRating,
  getBookById,
} from './booksEntitiesThunk';
import { IBookState } from './bookTypes';
import { BookType, CommentsType } from '../../lib/types';

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
      const normalizedBooks = action.payload.reduce<Record<number, BookType>>(
        (result, current) => {
          result[current.id] = current;
          return result;
        },
        {}
      );
      for (let key in normalizedBooks) {
        state.books[key] = { ...state.books[key], ...normalizedBooks[key] };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state, action) => {
        state.loading = true;
        const bookId = action.meta.arg.bookId;
        const text = action.meta.arg.text;
        const currentBook = state.books[bookId];

        if (!currentBook) {
          return;
        }
        const user = action.meta.arg.user;

        const newComment: CommentsType = {
          id: action.meta.requestId,
          text: text,
          dateOfCreate: new Date().toISOString(),
          user: user,
        };

        if (currentBook) {
          state.books[bookId].comments = [
            ...state.books[bookId].comments,
            newComment,
          ];
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;

        const bookId = action.payload.bookId;
        if (bookId && state.books[bookId]) {
          const index: number = state.books[bookId].comments.findIndex(
            (comment: CommentsType) => {
              return comment.id === action.meta.requestId;
            }
          );
          if (index) {
            state.books[bookId].comments[index] = action.payload;
          }
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.books[action.meta.arg.bookId].comments.filter(
          (comment: CommentsType) => comment.id !== action.meta.requestId
        );
        state.error = action.error.message;
      })
      .addCase(addOrUpdateRating.fulfilled, (state, action) => {
        const bookId = action.payload.bookId;
        state.books[bookId].totalRate = action.payload.avarageRating;
      })
      .addCase(getBookRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookRating.fulfilled, (state, action) => {
        state.loading = false;
        const bookId = action.payload.bookId;
        if (bookId && state.books[bookId]) {
          state.books[bookId].totalRate = action.payload.rate;
        }
      })
      .addCase(getBookRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.books[action.payload.id] = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addOrUpdBook } = bookEntititesSlice.actions;

export default bookEntititesSlice.reducer;
