import React from 'react';
import styled from 'styled-components';
import BookInCart from './BookInCart';
import { useAppSelector } from '../../hooks';

const CartPageBody: React.FC = () => {
  const BooksInCart = useAppSelector((state) => state.cart.cart);

  return (
    <StyledWrapper>
      {BooksInCart?.cartItems?.map((item) => {
        return (
          <BookInCart
            key={item.id}
            id={item.id}
            price={item.total_price}
            quantity={item.quantity}
            book={item.book}
          />
        );
      })}
      <div className="big-title">Total: {BooksInCart?.total_price}</div>
    </StyledWrapper>
  );
};

export default CartPageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
