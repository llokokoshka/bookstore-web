import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addComment,
  addOrUpdateRating,
  getBookRating,
  getBookById,
} from './booksEntitiesThunk';
import { IBookState, BookType } from '../../lib/bookTypes';
import { useAppSelector } from '../../hooks';

const initialState: IBookState = {
  books: {},
  error: undefined,
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
      .addCase(addComment.pending, (state, action) => {
        state.loading = true;
        const bookId = action.meta.arg.bookId;
        const text = action.meta.arg.text;
        const currentBook = bookId in state.books ? state.books[bookId] : null;
        // const userId = useAppSelector((state) => state.auth.user?.id);

        const newComment = {
          // id:
          //   Number(
          //     Object.values(state.books[bookId].comments.reverse()[0])[0]
          //   ) + 1,
          text: text,
          dateOfCreate: Date.now(),
          // user: { id: userId },
        };

        if (currentBook) {
          state.books[bookId].comments = {
            ...state.books[bookId].comments,
            ...newComment,
          };
        }
        console.log(state.books[bookId].comments);
        state.error = undefined;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const bookId = action.payload.bookId;
        if (bookId && bookId in state.books) {
          state.books[bookId].comments[
            state.books[bookId].comments.length - 1
          ] = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        const deleteComment = action.meta.arg;
        const lastComment =
          state.books[deleteComment.bookId].comments.reverse()[0];
        state.books[deleteComment.bookId].comments.filter(
          (comment) => comment.id !== lastComment.id
        );
        state.error = action.error.message;
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
        state.error = undefined;
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
        state.error = action.error.message;
      })
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
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
