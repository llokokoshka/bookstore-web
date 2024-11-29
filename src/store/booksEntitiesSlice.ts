import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookType, IBookState } from '../lib/types';
import { addComment, addOrUpdateRating } from './thunk';

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
        if (exBookIndex !== -1 && state.books && exBookIndex) {
          state.books[exBookIndex] = {
            ...state.books[exBookIndex],
            ...newBook,
          };
        } else {
          state.books?.push(newBook);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log('need done that !!!', action.payload);
        // state.books;
        // state.books?.comments.push(action.payload);
      });
  },
});

export const { addOrUpdBook } = bookEntititesSlice.actions;

export default bookEntititesSlice.reducer;
