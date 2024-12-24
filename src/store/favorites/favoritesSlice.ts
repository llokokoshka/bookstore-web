import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFavorite, toggleFavorite } from './favoritesThunk';
import { FavoriteType, IFavoriteState } from '../../lib/favoriteTypes';

const initialState: IFavoriteState = {
  favoriteId: null,
  booksIdsInFavorites: [],
  error: null,
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    cleanFav: (state) => {
      state.favoriteId = null;
      state.booksIdsInFavorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFavorite.fulfilled,
        (state, action: PayloadAction<FavoriteType>) => {
          state.loading = false;
          state.favoriteId = action.payload.id;
          state.booksIdsInFavorites = action.payload.booksIdsInFavorites;
        }
      )
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<FavoriteType>) => {
          state.loading = false;
          state.favoriteId = action.payload.id;
          state.booksIdsInFavorites = action.payload.booksIdsInFavorites;
        }
      )
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
        console.log(action);
      });
  },
});
export const { cleanFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
