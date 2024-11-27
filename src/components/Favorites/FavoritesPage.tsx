import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorite } from '../../store/thunk';
import FavoritePageBody from './FavoritesPageBody';

const FavoritePage: React.FC = () => {
  const Favorites = useAppSelector((state) => state.favorite.favorites);
  const dispatch = useAppDispatch();

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
      <Header />
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