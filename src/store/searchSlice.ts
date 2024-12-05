import { createSlice } from '@reduxjs/toolkit';

import { ISearchedState } from '../lib/types';
import { getRecommended } from './thunk';

const initialState: ISearchedState = {
  searched: [],
  error: null,
  loading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommended.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecommended.fulfilled, (state, action) => {
        state.loading = false;
        state.searched = action.payload.newArrayWithBookIds;
      })
      .addCase(getRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
