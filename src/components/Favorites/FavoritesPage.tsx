import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoritePageBody from './FavoritesPageBody';
import { getFavorite } from '../../store/favorites/favoritesThunk';

const FavoritePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const Favorites = useAppSelector((state) => state.favorite.favorites);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!Favorites) {
      try {
        dispatch(getFavorite());
      } catch (err) {
        console.error(err);
      }
    }
  }, [Favorites, dispatch]);

  return (
    <StyledWrapper>
      <Header page="Favorites" />
      <FavoritePageBody />
      <Footer />
    </StyledWrapper>
  );
};

export default FavoritePage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
