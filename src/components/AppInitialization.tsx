import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { getFavorite } from '../store/favorites/favoritesThunk';
import { getCart } from '../store/cart/cartThunk';

const AppInitialization: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(getFavorite());
      dispatch(getCart());
    } catch (err) {
      console.error(err);
    }
  }, []);
  return null;
};

export default AppInitialization;
