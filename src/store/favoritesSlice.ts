import { createSlice } from '@reduxjs/toolkit';

import { addFavoriteItem, deleteFavoriteItem, getFavorite } from './thunk';
import { IFavoriteState } from '../lib/types';

const initialState: IFavoriteState = {
  favorites: null,
  normalizeFavorites: [],
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
        const booksInFav = state.favorites?.favoritesItems.map((item) => {
          return item.book;
        });

        if (booksInFav) state.normalizeFavorites = booksInFav;
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
        if (state.normalizeFavorites.length > 0) {
          state.normalizeFavorites.push(action.payload.book);
        } else {
          state.normalizeFavorites = [action.payload.book];
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
          const idFavorite = state.favorites.favoritesItems[itemIndex].book;
          state.favorites.favoritesItems =
            state.favorites.favoritesItems.filter((item) => {
              return item.id !== action.payload;
            });
          if (
            state.normalizeFavorites &&
            state.normalizeFavorites.find((item) => item === idFavorite)
          ) {
            delete state.normalizeFavorites[
              state.normalizeFavorites.findIndex((item) => item === idFavorite)
            ];
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
