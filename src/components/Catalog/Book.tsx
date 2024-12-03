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
import { IBookProps } from '../../lib/types';
import Rating from '../Book Page/Rating';
import { ApiPath } from '../../constants/textConstants';

const Book: React.FC<IBookProps> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
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
  let isFav = props.isInFavorites;
  const handleFavorites = async () => {
    if (
      booksInFavorites &&
      props.id &&
      !booksInFavorites.find((book) => book === props.id)
    ) {
      await dispatch(addFavoriteItem(props.id));
      isFav = true;
    } else if (
      booksInFavorites &&
      props.id &&
      booksInFavorites.find((book) => book === props.id)
    ) {
      const bookInFav = Favorites?.favoritesItems.find(
        (item) => item.book === props.id
      );
      if (bookInFav) await dispatch(deleteFavoriteItem(bookInFav?.id));
      isFav = false;
    }
  };

  return (
    <StyledWrapper>
      <div className="book">
        {isFav ? (
          <div className="book_favorite-button" onClick={handleFavorites}>
            <img src={fullHeart} alt="fullHeart"></img>
          </div>
        ) : (
          <div
            className="book_favorite-button opacity"
            onClick={handleFavorites}
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
      {props.id ? <Rating bookId={props.id} isUserRAte={false} /> : null}

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
    width: 305px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border: ${({ theme }) => theme.border.blue};
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
  .cart-button:hover {
    /* cursor: pointer; */
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
