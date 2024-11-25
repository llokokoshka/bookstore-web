import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import bookReducer from './bookSlice';
import filterReducer from './filterSlice';
import commentsReducer from './commentsSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    filters: filterReducer,
    comments: commentsReducer,
    cart: cartReducer,
    favorite: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
