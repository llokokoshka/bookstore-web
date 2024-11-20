import { createSlice } from '@reduxjs/toolkit';

import { addComment, getComments } from './thunk';


interface commentsState {
    comments: any[];
    loading: boolean;
    error: string | null;

}

const initialState: commentsState = {
    comments: [],
    error: null,
    loading: false,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload)
            });
    },
});

// export const {  } = commentsSlice.actions;

export default commentsSlice.reducer;
