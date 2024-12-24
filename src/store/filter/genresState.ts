import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GenresType, IFilterState } from '../../lib/types';

const initialState: IFilterState = {
  genres: [],
};

const genresState = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres(state, action: PayloadAction<GenresType[]>) {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = genresState.actions;

export default genresState.reducer;
