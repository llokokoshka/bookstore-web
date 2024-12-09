import React from 'react';
import styled from 'styled-components';

import BookInCart from './BookInCart';
import { useAppSelector } from '../../hooks';
import booksImg from '../../img/booksImg.png';
import { Link } from 'react-router-dom';
import { AppPages } from '../../constants/textConstants';

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
              <div className="cartItem" key={item.id}>
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
          <div className="big-title">Total: {BooksInCart?.total_price}</div>
          <div className="buttons">
            <button className="cart-button">Continue shopping</button>
            <button className="base-button">Chekout</button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <img src={booksImg} alt="booksiMG"></img>
          <div className="cart_info">
            <div className="info-text">
              <div className="big-title">Your cart is empty</div>
              <div className="cart_text">
                Add items to cart to make a purchase. Go to the catalogue no.
              </div>
            </div>
            <Link to={AppPages.base}>
              <button className="base-button">Go to catalog</button>
            </Link>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

export default CartPageBody;

const StyledWrapper = styled.div<{ $numberItems: number }>`
  padding: ${({ theme }) => theme.padding.header};

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .cartItem:not(:nth-child(n + ${(props) => props.$numberItems})) {
    border-bottom: 1px solid #d6d8e7;
  }

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
  .cart_info {
    display: flex;
    flex-direction: column;
    row-gap: 60px;
  }
  .info-text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .cart_text {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 465px;
  }
`;
