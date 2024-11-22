import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import BookInFavorite from './BookInFavorite';

const FavoritePageBody: React.FC = () => {
  const BooksInCart = useAppSelector((state) => state.cart.cart);

  return (
    <StyledWrapper>
      {BooksInCart?.cartItems?.map((item) => {
        return (
          <BookInFavorite
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

export default FavoritePageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
