import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterState, GenresType } from '../lib/types';

const initialState: IFilterState = {
  page: 1,
  genres: [],
  checkedGenresId: [],
  minPrice: 0,
  maxPrice: 100,
  sortBy: 'price',
  query: '',
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
    setCheckedGenres(state, action: PayloadAction<number>) {
      state.checkedGenresId.push(action.payload);
    },
    deleteCheckedGenres(state, action: PayloadAction<number>) {
      const newSortArray = state.checkedGenresId.filter(
        (id) => id !== action.payload
      );
      state.checkedGenresId = newSortArray;
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
    setSearcheParam(state, action: PayloadAction<string>) {
      state.query = action.payload;
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
  setSearcheParam,
} = filterSlice.actions;

export default filterSlice.reducer;
