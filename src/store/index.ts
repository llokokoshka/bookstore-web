import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import booksEntitiesReducer from './booksEntities/booksEntitiesSlice';
import catalogReducer from './catalog/catalogSlice';
import genresReducer from './filter/genresState';
import cartReducer from './cart/cartSlice';
import favoritesReducer from './favorites/favoritesSlice';
import recommendedReducer from './recommended/recommendedSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booksEntities: booksEntitiesReducer,
    catalog: catalogReducer,
    genres: genresReducer,
    cart: cartReducer,
    favorite: favoritesReducer,
    recommended: recommendedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
