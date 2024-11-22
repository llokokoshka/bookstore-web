import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCart } from '../../store/thunk';
import FavoritePageBody from './FavoritesPageBody';

const FavoritePage: React.FC = () => {
  const BooksInCart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!BooksInCart) {
      try {
        dispatch(getCart());
      } catch (err) {
        console.error(err);
      }
    }
  }, [BooksInCart, dispatch]);

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
