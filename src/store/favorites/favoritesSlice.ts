import { createSlice } from '@reduxjs/toolkit';

import {
  getFavorite,
  addFavoriteItem,
  deleteFavoriteItem,
} from './favoritesThunk';
import { IFavoriteState } from '../../lib/favoriteTypes';

const initialState: IFavoriteState = {
  favorites: null,
  booksIdsInFavorites: [],
  error: null,
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    cleanFav: (state) => {
      state.favorites = null;
      state.booksIdsInFavorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        const booksInFav = state.favorites?.favoritesItems.map((item) => {
          return item.book;
        });

        if (booksInFav) state.booksIdsInFavorites = booksInFav;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(addFavoriteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.booksIdsInFavorites.length > 0) {
          state.booksIdsInFavorites.push(action.payload.book);
        } else {
          state.booksIdsInFavorites = [action.payload.book];
        }
        state.favorites?.favoritesItems.push(action.payload);
      })
      .addCase(addFavoriteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
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
        if (
          itemIndex !== -1 &&
          state.favorites &&
          (itemIndex || itemIndex === 0)
        ) {
          const idFavorite = state.favorites.favoritesItems[itemIndex].book;
          state.favorites.favoritesItems =
            state.favorites.favoritesItems.filter((item) => {
              return item.id !== action.payload;
            });
          if (
            state.booksIdsInFavorites &&
            state.booksIdsInFavorites.find((item) => item === idFavorite)
          ) {
            delete state.booksIdsInFavorites[
              state.booksIdsInFavorites.findIndex((item) => item === idFavorite)
            ];
          }
        } else {
          console.error('Item not found in favorite:', action.payload);
        }
      })
      .addCase(deleteFavoriteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});
export const { cleanFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
