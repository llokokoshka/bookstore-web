import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import catalogReducer from './catalogSlice';
import filterReducer from './filterSlice';
import commentsReducer from './commentsSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';
import booksEntitiesReducer from './booksEntitiesSlice';
import bookReducer from './bookItemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booksEntities: booksEntitiesReducer,
    catalog: catalogReducer,
    book: bookReducer,
    filters: filterReducer,
    comments: commentsReducer,
    cart: cartReducer,
    favorite: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
