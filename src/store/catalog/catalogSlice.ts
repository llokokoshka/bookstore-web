import { createSlice } from '@reduxjs/toolkit';

import { getCatalog } from './catalogThunk';
import { ICatalogState } from '../../lib/bookTypes';

const initialState: ICatalogState = {
  books: null,
  meta: {
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 1,
    pageCount: 1,
  },
  error: null,
  loading: false,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default catalogSlice.reducer;
