import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CartPageBody from './CartPageBody';
import { getCart } from '../../store/cart/cartThunk';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const BooksInCart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Header page="Cart" />
      <CartPageBody />
      <Footer />
    </StyledWrapper>
  );
};

export default CartPage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
