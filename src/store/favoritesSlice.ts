import { createSlice } from '@reduxjs/toolkit';

import { addFavoriteItem, deleteFavoriteItem, getFavorite } from './thunk';
import { FavoriteItemType, IFavoriteState } from '../lib/types';

const initialState: IFavoriteState = {
  favorites: null,
  normalizeFavorites: {},
  error: null,
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        const booksInCart = state.favorites?.favoritesItems.reduce<
          Record<number, FavoriteItemType>
        >((result, current) => {
          result[current.book.id] = current;
          return result;
        }, {});
        if (booksInCart) state.normalizeFavorites = booksInCart;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFavoriteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.normalizeFavorites !== null) {
          state.normalizeFavorites[action.payload.book.id] = action.payload;
        }
        state.favorites?.favoritesItems.push(action.payload);
      })
      .addCase(addFavoriteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFavoriteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavoriteItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.favorites?.favoritesItems.findIndex(
          (item) => item.id === action.payload
        );
        if (itemIndex !== -1 && state.favorites && itemIndex !== undefined) {
          const idFavorite = state.favorites.favoritesItems[itemIndex].book.id;
          state.favorites.favoritesItems =
            state.favorites.favoritesItems.filter((item) => {
              return item.id !== action.payload;
            });
          if (
            state.normalizeFavorites &&
            state.normalizeFavorites[idFavorite]
          ) {
            delete state.normalizeFavorites[idFavorite];
          }
        } else {
          console.error('Item not found in favorite:', action.payload);
        }
      })
      .addCase(deleteFavoriteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoritesSlice.reducer;
