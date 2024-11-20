import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import bookReducer from './bookSlice';
import filterReducer from './filterSlice';
import commentsReducer from './commentsSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    filters: filterReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
