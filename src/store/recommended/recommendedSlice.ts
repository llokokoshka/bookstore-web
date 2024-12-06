import { createSlice } from '@reduxjs/toolkit';
import { IRecommendedState } from '../../lib/types';
import { getRecommended } from './recommendedThunk';

const initialState: IRecommendedState = {
  recommended: [],
  error: null,
  loading: false,
};

const recommendedSlice = createSlice({
  name: 'recommended',
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
        state.recommended = action.payload.newArrayWithBookIds;
      })
      .addCase(getRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default recommendedSlice.reducer;
