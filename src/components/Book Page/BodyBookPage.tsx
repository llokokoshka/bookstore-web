import React, { useState } from 'react';
import styled from 'styled-components';

import { BookType } from '../../lib/types';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Rating from './Rating';
import { ApiPath } from '../../constants/textConstants';
import heart from '../../img/Heart.png';
import fullHeart from '../../img/fullHeart.png';
import { handleFavorites } from '../../utils/favoriteUtil';
import { useParams } from 'react-router-dom';
import {
  addComment,
  getBookById,
} from '../../store/booksEntities/booksEntitiesThunk';

const BookPageBody: React.FC<BookType> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const bookId = Number(id);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFav, setIsFav] = useState(props.isFav);

  const [localState, setLocalState] = useState(props);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const Favorites = useAppSelector((state) => state.favorite.favorites);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue?.length > 0 && props.id && user && user.id) {
      try {
        setLoading(true);
        await dispatch(
          addComment({
            text: inputValue,
            bookId: bookId,
          })
        ).unwrap();
        const updBook = await dispatch(getBookById(props.id)).unwrap();
        setLocalState(updBook);
        setInputValue('');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const useHandleFav = async () => {
    const result = await handleFavorites(
      props.id,
      dispatch,
      booksInFavorites,
      Favorites,
      isFav || false
    );
    setIsFav(result);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <StyledWrapper>
      <div className="book-information">
        <div className="book-cover">
          {localState.isFav ? (
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
            <div className="big-title">{localState.name}</div>
            <div className="normal-title">{localState.author.text}</div>
          </div>
          <div className="rating-block">
            {localState.id ? (
              <Rating bookId={localState.id} isUserRAte={true} />
            ) : null}
          </div>
          <div className="description">
            <div className="normal-title">Description</div>
            <div
              className={`base-text param ${
                isDescriptionExpanded ? 'expanded' : ''
              }`}
            >
              {localState.description}
            </div>
            {!isDescriptionExpanded && localState.description.length > 800 && (
              <span className="show-more" onClick={toggleDescription}>
                ... See more
              </span>
            )}
            {isDescriptionExpanded && (
              <span className="show-more" onClick={toggleDescription}>
                See less
              </span>
            )}
          </div>
          <div className="book-buttons">
            <div>
              <p>Paperback</p>
              {localState.cover.paperback_amount > 0 ? (
                <button className="base-button">
                  ${localState.cover.paperback_price} USD
                </button>
              ) : (
                <button className="base-button not-aviable"></button>
              )}
            </div>
            <div>
              <p>Hardcover</p>
              {localState.cover.hardcover_amount > 0 ? (
                <button className="base-button">
                  ${localState.cover.hardcover_price} USD
                </button>
              ) : (
                <button className="base-button opacity"></button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="comments-block">
        {Array.isArray(localState.comments) &&
          localState.comments?.map((comment) => (
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
        <form onSubmit={handleAddComment} className="form">
          <input
            type="text"
            placeholder="Share a comment"
            className="input-s"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button className="base-button width" type="submit">
            {loading ? <>loading...</> : <> Post a comment</>}
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
    border-radius: 16px;
  }
  .book-cover {
    position: relative;
  }

  .book-information {
    display: flex;
    flex-direction: row;
    column-gap: 128px;
    height: auto;
  }
  .img-book {
    width: 522px;
    height: 779px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    max-width: 630px;
    width: 100%;
    height: auto;
  }
  .comments-block {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
  }
  .book_favorite-button {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    width: 59px;
    height: 59px;
    top: 30px;
    left: 433px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .book_favorite-button:hover {
    cursor: pointer;
  }

  .width {
    width: 276px;
  }
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
  .description {
    display: flex;
    flex-direction: column;
    row-gap: 19px;
  }

  .description .base-text {
    max-height: 264px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description .base-text.expanded {
    max-height: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
  }

  .show-more {
    display: flex;
    justify-content: end;
    color: ${({ theme }) => theme.colors.dark};
    cursor: pointer;
  }

  .show-more:hover {
    text-decoration: underline;
  }

  .book-buttons {
    display: flex;
    flex-direction: row;
    max-width: 541px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .param {
    max-width: 630px;
    max-height: 264px;
    width: 100%;
    height: 100%;
  }
  .opacity {
    opacity: 50%;
  }
  .opacity:hover {
    opacity: 100%;
  }
`;
