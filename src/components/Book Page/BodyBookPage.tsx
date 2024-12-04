import React, { useState } from 'react';
import styled from 'styled-components';

import { IPropsBookPageBody } from '../../lib/types';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addComment } from '../../store/thunk';
import Rating from './Rating';
import { ApiPath } from '../../constants/textConstants';
import heart from '../../img/Heart.png';
import fullHeart from '../../img/fullHeart.png';
import { handleFavorites } from '../../utils/favoriteUtil';

const BookPageBody: React.FC<IPropsBookPageBody> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>();
  const user = useAppSelector((state) => state.auth.user);
  const [isFav, setIsFav] = useState(props.isFav);
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const Favorites = useAppSelector((state) => state.favorite.favorites);

  const handleAddComment = async () => {
    if (inputValue && props.id && user && user.id) {
      try {
        const response = await dispatch(
          addComment({
            text: inputValue,
            bookId: props.id,
          })
        );
        setInputValue('');
        return response;
      } catch (err) {
        console.error(err);
      }
    }
  };

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
      <div className="book-information">
        <div>
          {props.isFav ? (
            <div className="book_favorite-button" onClick={useHandleFav}>
              <img src={fullHeart} alt="fullHeart"></img>
            </div>
          ) : (
            <div
              className="book_favorite-button opacity"
              onClick={useHandleFav}
            >
              <img src={heart} alt="heart"></img>
            </div>
          )}

          <img
            src={dirnameBookImg + props.img}
            alt="img"
            className="img-book"
          ></img>
        </div>
        <div className="info-block">
          <div>
            <div className="big-title">{props.name}</div>
            <div className="normal-title">{props.author}</div>
          </div>
          <div className="rating-block">
            {props.id ? <Rating bookId={props.id} isUserRAte={true} /> : null}
          </div>
          <div className="description">
            <div className="normal-title">Description</div>
            <div className="base-text param">{props.description}</div>
          </div>
          <div>
            <p>Paperback</p>
            {props.cover.paperback_amount > 0 ? (
              <button className="base-button">
                ${props.cover.paperback_price}USD
              </button>
            ) : (
              <button className="base-button not-aviable"></button>
            )}
            <p>Hardcover</p>
            {props.cover.hardcover_amount > 0 ? (
              <button className="base-button">
                ${props.cover.hardcover_price}USD
              </button>
            ) : (
              <button className="base-button not-aviable"></button>
            )}
          </div>
        </div>
      </div>

      <div>
        {props.comments?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            text={comment.text}
            dateOfCreate={comment.dateOfCreate}
            user={comment.user}
          />
        ))}
      </div>
      {user ? (
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Share a comment"
            className="input-s"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button className="base-button" type="submit">
            Post a comment
          </button>
        </form>
      ) : null}
    </StyledWrapper>
  );
};

export default BookPageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;
  row-gap: 110px;

  .input-s {
    background-color: ${({ theme }) => theme.colors.light};
    width: 738px;
    height: 128px;
    padding-left: 20px;
  }

  .book-information {
    display: flex;
    flex-direction: row;
    column-gap: 128px;
  }
  .img-book {
    width: 522px;
    height: 779px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
  .book_favorite-button {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 25px;
    width: 48px;
    height: 48px;
    top: 20px;
    left: 20px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .description {
    display: flex;
    flex-direction: column;
    row-gap: 19px;
  }
  .param {
    max-width: 630px;
    max-height: 264px;
    width: 100%;
    height: 100%;
  }
  .not-aviable {
    opacity: 50%;
  }
`;
