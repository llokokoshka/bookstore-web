import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const getIsInCart = createSelector(
  (store: RootState) => store.cart.booksIdsInCart,
  (store: RootState, id: number) => id,
  (cartIdsList, id) => {
    return cartIdsList.includes(id);
  }
);

export const cartSelectors = {
  getIsInCart,
};
