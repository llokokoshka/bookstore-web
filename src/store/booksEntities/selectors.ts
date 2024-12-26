import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const getBook = createSelector(
  (store: RootState) => store.booksEntities.books,
  (store: RootState, bookId: number) => bookId,
  (booksList, bookId) => {
    return booksList[bookId];
  }
);

export const bookSelectors = {
  getBook,
};
