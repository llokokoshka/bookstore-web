import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import heart from '../../img/Heart.png';
import fullHeart from '../../img/fullHeart.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCartItem } from '../../store/thunk';
import { IBookProps } from '../../lib/types';
import Rating from '../Book Page/Rating';
import { ApiPath } from '../../constants/textConstants';
import { handleFavorites } from '../../utils/favoriteUtil';

const Book: React.FC<IBookProps> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const [isFav, setIsFav] = useState(props.isInFavorites);
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

  const useHandleFav = async () => {
    const result = await handleFavorites(
      props.id,
      dispatch,
      booksInFavorites,
      Favorites,
      isFav
    );
    setIsFav(result);
  };

  return (
    <StyledWrapper>
      <div className="book">
        {isFav ? (
          <div className="book_favorite-button" onClick={useHandleFav}>
            <img src={fullHeart} alt="fullHeart"></img>
          </div>
        ) : (
          <div className="book_favorite-button opacity" onClick={useHandleFav}>
            <img src={heart} alt="heart"></img>
          </div>
        )}

        <Link to={`/${props.id}`}>
          <img src={dirname + props.img} alt="img" className="book-cover"></img>
        </Link>
      </div>
      <div className="book-info">
        <Link to={`/${props.id}`} className="book-info_text">
          <div className="text_title">{props.name}</div>
          <div className="text_base">{props.author}</div>
          <div></div>
        </Link>
        {props.id ? <Rating bookId={props.id} isUserRAte={false} /> : null}
      </div>

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
  row-gap: 30px;

  .book-info_text {
    text-decoration: none;
  }
  .text_title {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_blue};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text_base {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_grey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .book {
    position: relative;
    width: 100%;
    height: auto;
  }

  .book_favorite-button {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    width: 48px;
    height: 48px;
    top: 20px;
    left: 20px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .book_favorite-button:hover {
    cursor: pointer;
  }

  .book-cover {
    width: 305px;
    height: 448px;
    border-radius: 16px;
  }

  .book-info {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 299px;
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
    border: 1px solid #344966;
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
    padding: 10px 50px;
    border-radius: 16px;
  }
`;
