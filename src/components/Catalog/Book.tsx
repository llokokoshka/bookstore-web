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

interface Props {
  img: string;
  id: number | undefined;
  name: string;
  author: string;
  price: number | undefined;
  isInCart: boolean;
  isInFavorites: boolean;
}

const Book: React.FC<Props> = (props) => {
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
          <img src={dirname + props.img} alt="img" className="avatar"></img>
        </Link>
      </div>
      <Link to={`/${props.id}`}>
        <div className="normal-title">{props.name}</div>
        <div className="base-text">{props.author}</div>
        <div></div>
      </Link>
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
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;

  .avatar {
    z-index: 4;
  }
  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
  }
  .poster__img {
    position: absolute;
    bottom: 0;
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;
  }
  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .correct {
    width: 305px;
    height: 48px;
    top: 615px;
    padding: 10px 50px 10px 50px;
    gap: 0px;
    border-radius: 16px;
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
  .book {
    position: relative;
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
  .opacity {
    opacity: 50%;
  }
  .opacity:hover {
    opacity: 100%;
  }
`;
