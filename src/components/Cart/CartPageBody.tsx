import React from 'react';
import styled from 'styled-components';

import BookInCart from './BookInCart';
import { useAppSelector } from '../../hooks';
import EmptyPage from './EmtyPage';

const CartPageBody: React.FC = () => {
  const BooksInCart = useAppSelector((state) => state.cart.cart);
  const books = useAppSelector((state) => state.booksEntities.books);

  return (
    <StyledWrapper
      $numberItems={
        BooksInCart?.cartItems && BooksInCart?.cartItems?.length !== 0
          ? BooksInCart.cartItems.length
          : 0
      }
    >
      {BooksInCart?.cartItems.length !== 0 ? (
        <>
          {BooksInCart?.cartItems?.map((item) => {
            const Book = item.book in books ? books[item.book] : undefined;
            return (
              <div className="cart-item" key={item.id}>
                <BookInCart
                  key={item.id}
                  id={item.id}
                  price={item.total_price}
                  quantity={item.quantity}
                  book={Book}
                />
              </div>
            );
          })}
          <div className="cart-info">
            <div className="big-title">Total: {BooksInCart?.total_price}</div>
            <div className="buttons">
              <button className="cart-button">Continue shopping</button>
              <button className="base-button">Chekout</button>
            </div>
          </div>
        </>
      ) : (
        <EmptyPage page="cart" />
      )}
    </StyledWrapper>
  );
};

export default CartPageBody;

const StyledWrapper = styled.div<{ $numberItems: number }>`
  padding: ${({ theme }) => theme.padding.header};

  @media screen and (max-width: 834px) {
    padding: 20px 15px 110px 15px;
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .cart-item:not(:nth-child(n + ${(props) => props.$numberItems})) {
    border-bottom: 1px solid #d6d8e7;
  }
  .cart-info {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .cart-button {
    width: 268px;
    height: 48px;
    top: 8px;
    left: 1056px;
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

  .empty-cart {
    padding: 118px 0px 148px 0;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    column-gap: 109px;
  }

  .empty-cart__info {
    display: flex;
    flex-direction: column;
    row-gap: 60px;
  }

  .info__text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .cart__text {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 465px;
  }
`;
