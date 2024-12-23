import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const getIsInFavorite = createSelector(
  (store: RootState) => store.favorite.booksIdsInFavorites,
  (store: RootState, id: number) => id,
  (favoriteIdsList, id) => {
    return favoriteIdsList.includes(id);
  }
);

export const favoriteSelectors = {
  getIsInFavorite,
};
