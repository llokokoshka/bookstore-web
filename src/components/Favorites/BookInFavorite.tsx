import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import rubbish from '../../assets/img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { toggleFavorite } from '../../store/favorites/favoritesThunk';
import { BookType } from '../../lib/types';

type Props = {
  id: number;
  book: BookType | undefined;
};
const BookInFavorite: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  let bookImg, bookName, bookAuthor;

  if (props.book) {
    bookImg = props.book.img;
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }

  const handleDeleteItem = async () => {
    if (props.book) {
      await dispatch(
        toggleFavorite({ bookId: props.book.id, isInFavorites: true })
      );
    }
  };

  return (
    <StyledWrapper>
      <div className="favorite">
        <Link to={props.book ? `${AppPages.getBookIdUrl(props.book.id)}` : ''}>
          <img src={bookImg} alt="img" className="favorite__book-img"></img>
        </Link>
        <div className="favorite__info-block">
          <div>
            <div className="big-title">{bookName}</div>
            <div className="normal-title normal-title--size">
              {bookAuthor?.text}
            </div>
          </div>
          <div className="description">{props.book?.description}</div>
        </div>
      </div>
      <img
        src={rubbish}
        alt="img"
        className="rubbish-img"
        onClick={handleDeleteItem}
      ></img>
    </StyledWrapper>
  );
};

export default BookInFavorite;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 0px;

  ${({ theme }) => theme.media.mobile} {
    /* flex-direction: column; */
  }

  .favorite {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .favorite__book-img {
    width: 197px;
    height: 289px;
    ${({ theme }) => theme.media.tablet} {
      width: 255px;
      height: 375px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 135px;
      height: 202px;
    }
  }

  .description {
    max-height: 150px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
  }

  .favorite__info-block {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    word-break: break-all;
    hyphens: auto;
    row-gap: 20px;
    ${({ theme }) => theme.media.tablet} {
      max-width: 532px;
    }
    ${({ theme }) => theme.media.mobile} {
      max-width: none;
    }
  }
  .rubbish-img {
    margin-top: 30px;
    width: 30px;
    height: 30px;
    ${({ theme }) => theme.media.mobile} {
      width: 20px;
      height: 20px;
      margin-top: 5px;
    }
  }
  .rubbish-img:hover {
    cursor: pointer;
  }
  .normal-title--size {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    ${({ theme }) => theme.media.mobile} {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;
