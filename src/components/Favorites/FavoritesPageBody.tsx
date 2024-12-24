import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks';
import BookInFavorite from './BookInFavorite';
import EmptyPage from '../Cart/EmtyPage';

const FavoritePageBody: React.FC = () => {
  const Favorites = useAppSelector(
    (state) => state.favorite.booksIdsInFavorites
  );
  const books = useAppSelector((state) => state.booksEntities.books);

  return (
    <StyledWrapper
      $numberItems={Favorites && Favorites.length !== 0 ? Favorites.length : 0}
    >
      {Favorites.length !== 0 ? (
        <>
          {Favorites.map((item) => {
            const Book = item in books ? books[item] : undefined;
            return (
              <div className="cart-item" key={item}>
                <BookInFavorite key={item} id={item} book={Book} />
              </div>
            );
          })}
        </>
      ) : (
        <EmptyPage page="favorites" />
      )}
    </StyledWrapper>
  );
};

export default FavoritePageBody;

const StyledWrapper = styled.div<{ $numberItems: number }>`
  padding: ${({ theme }) => theme.padding.base};
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
