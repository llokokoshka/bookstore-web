import React from 'react';
import styled from 'styled-components';

import BookInCart from './BookInCart';
import { useAppSelector } from '../../hooks';

const CartPageBody: React.FC = () => {
  const BooksInCart = useAppSelector((state) => state.cart.cart);
  const books = useAppSelector((state) => state.booksEntities.books);
  return (
    <StyledWrapper>
      {BooksInCart?.cartItems?.map((item) => {
        const Book = books?.find((book) => book.id === item.book);
        return (
          <BookInCart
            key={item.id}
            id={item.id}
            price={item.total_price}
            quantity={item.quantity}
            book={Book}
          />
        );
      })}
      <div className="big-title">Total: {BooksInCart?.total_price}</div>
      <div className="buttons">
        <button className="cart-button">Continue shopping</button>
        <button className="base-button">Chekout</button>
      </div>
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

  .buttons {
    display: flex;
    flex-direction: row;
    row-gap: 20px;
  }
  .cart-button {
    width: 268px;
    height: 48px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border: 1px solid #344966;
    color: #344966;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;
  }
  .cart-button:hover {
    cursor: pointer;
  }
`;
