import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState, GenresType } from '../lib/types';

const initialState: FilterState = {
  page: 1,
  genres: [],
  checkedGenres: [],
  minPrice: 0,
  maxPrice: 100000,
  sortBy: 'price',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setGenres(state, action: PayloadAction<GenresType[]>) {
      state.genres = action.payload;
    },
    setCheckedGenres(state, action: PayloadAction<GenresType>) {
      state.checkedGenres.push(action.payload);
    },
    deleteCheckedGenres(state, action: PayloadAction<GenresType>) {
      state.checkedGenres = state.checkedGenres.filter(
        (genre) => genre.id !== action.payload.id
      );
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setPage,
  setGenres,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  setCheckedGenres,
  deleteCheckedGenres,
} = filterSlice.actions;

export default filterSlice.reducer;
