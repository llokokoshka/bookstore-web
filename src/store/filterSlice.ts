import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from '../lib/types';

const initialState: FilterState = {
    genres: [],
    minPrice: 0,
    maxPrice: 100000,
    sortBy: 'price',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<string[]>) {
            state.genres = action.payload;
        },
        setMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        }
    },
});

// export const {} = bookSlice.actions;

export default filterSlice.reducer;
