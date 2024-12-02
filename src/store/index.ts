import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import booksEntitiesReducer from './booksEntitiesSlice';
import catalogReducer from './catalogSlice';
import filterReducer from './filterSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booksEntities: booksEntitiesReducer,
    catalog: catalogReducer,
    filters: filterReducer,
    cart: cartReducer,
    favorite: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
