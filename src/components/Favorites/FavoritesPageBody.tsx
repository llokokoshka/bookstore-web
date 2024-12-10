import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks';
import BookInFavorite from './BookInFavorite';
import booksImg from '../../img/booksImg.png';
import { Link } from 'react-router-dom';
import { AppPages } from '../../constants/textConstants';

const FavoritePageBody: React.FC = () => {
  const Favorites = useAppSelector((state) => state.favorite.favorites);
  const books = useAppSelector((state) => state.booksEntities.books);

  return (
    <StyledWrapper
      $numberItems={
        Favorites?.favoritesItems && Favorites.favoritesItems.length !== 0
          ? Favorites?.favoritesItems.length
          : 0
      }
    >
      {Favorites?.favoritesItems.length !== 0 ? (
        <>
          {Favorites?.favoritesItems?.map((item) => {
            const Book = item.book in books ? books[item.book] : undefined;
            return (
              <div className="cart-item" key={item.id}>
                <BookInFavorite key={item.id} id={item.id} book={Book} />{' '}
              </div>
            );
          })}
        </>
      ) : (
        <div className="empty-cart">
          <img src={booksImg} alt="booksiMG"></img>
          <div className="cart__info">
            <div className="info__text">
              <div className="big-title">Your favorites is empty</div>
              <div className="cart-text">
                Add items to favorites. Go to the catalogue no.
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

export default FavoritePageBody;

const StyledWrapper = styled.div<{ $numberItems: number }>`
  padding: ${({ theme }) => theme.padding.header};

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .cart-item:not(:nth-child(n + ${(props) => props.$numberItems})) {
    border-bottom: 1px solid #d6d8e7;
  }

  .empty-cart {
    padding: 118px 0px 148px 0;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    column-gap: 109px;
  }

  .cart__info {
    display: flex;
    flex-direction: column;
    row-gap: 60px;
  }

  .info__text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .cart-text {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 465px;
  }
`;
