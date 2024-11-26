import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addCartItem,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../../store/thunk';
import heart from '../../img/Heart.png';
import fullHeart from '../../img/fullHeart.png';
import { BookProps } from '../../lib/types';
import Rating from '../Book Page/Rating';

const Book: React.FC<BookProps> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/uploads/books/`;
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const Favorites = useAppSelector((state) => state.favorite.favorites);
  const dispatch = useAppDispatch();

  const addBookInCart = () => {
    if (props.id) dispatch(addCartItem(props.id));
  };

  if (props.price === undefined) {
    props.price = 0;
  }

  const handleAddInFavorites = async () => {
    if (booksInFavorites && props.id && !booksInFavorites[props.id]) {
      await dispatch(addFavoriteItem(props.id));
    } else if (booksInFavorites && props.id && booksInFavorites[props.id]) {
      const bookInFav = Favorites?.favoritesItems.find(
        (item) => item.book.id === props.id
      );
      console.log(bookInFav);
      if (bookInFav) await dispatch(deleteFavoriteItem(bookInFav?.id));
    }
  };

  return (
    <StyledWrapper>
      <div className="book">
        {props.isInFavorites ? (
          <div className="book_favorite-button" onClick={handleAddInFavorites}>
            <img src={fullHeart} alt="fullHeart"></img>
          </div>
        ) : (
          <div
            className="book_favorite-button opacity"
            onClick={handleAddInFavorites}
          >
            <img src={heart} alt="heart"></img>
          </div>
        )}

        <Link to={`/${props.id}`}>
          <img src={dirname + props.img} alt="img" className="book-cover"></img>
        </Link>
      </div>
      <Link to={`/${props.id}`}>
        <div className="normal-title">{props.name}</div>
        <div className="base-text">{props.author}</div>
        <div></div>
      </Link>
      {props.id ? <Rating bookId={props?.id} isUserRAte={false} /> : null}

      {props.isInCart ? (
        <button className="cart-button">Item in cart</button>
      ) : (
        <button className="base-button correct" onClick={addBookInCart}>
          $ {props.price} USD
        </button>
      )}
    </StyledWrapper>
  );
};

export default Book;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 305px;
  height: 663px;
  top: 748px;
  left: 80px;
  gap: 0px;
  opacity: 0px;

  .book {
    position: relative;
    width: 100%;
    height: auto;
  }

  .book_favorite-button {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 25px;
    width: 48px;
    height: 48px;
    top: 20px;
    left: 20px;
    gap: 0px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .book-cover {
    width: 305px;
    height: 448px;
    gap: 0px;
    border-radius: 16px;
    opacity: 0px;
  }

  .opacity {
    opacity: 50%;
  }
  .opacity:hover {
    opacity: 100%;
  }

  .cart-button {
    width: 231px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border-color: #344966;
    opacity: 0px;
    color: #344966;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;
  }

  .correct {
    width: 305px;
    height: 48px;
    top: 615px;
    padding: 10px 50px 10px 50px;
    gap: 0px;
    border-radius: 16px;
  }
`;
