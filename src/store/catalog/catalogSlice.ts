import { createSlice } from '@reduxjs/toolkit';

import { ICatalogState } from '../../lib/types';
import { getCatalog } from './catalogThunk';

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
        state.error = action.payload as string;
      });
  },
});

export default catalogSlice.reducer;
