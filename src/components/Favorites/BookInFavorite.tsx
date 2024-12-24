import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import rubbish from '../../assets/img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { ApiPath, AppPages } from '../../constants/textConstants';
import { toggleFavorite } from '../../store/favorites/favoritesThunk';
import { BookType } from '../../lib/types';

type Props = {
  id: number;
  book: BookType | undefined;
};
const BookInFavorite: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
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
          <img
            src={dirnameBookImg + bookImg}
            alt="img"
            className="favorite__book-img"
          ></img>
        </Link>
        <div className="favorite__info-block">
          <div className="big-title">{bookName}</div>
          <div className="normal-title normal-title--size">
            {bookAuthor?.text}
          </div>
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

  @media screen and (max-width: 320px) {
    flex-direction: column;
  }

  .favorite {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .favorite__book-img {
    width: 197px;
    height: 289px;
    @media screen and (max-width: 834px) {
      width: 255px;
      height: 375px;
    }
    @media screen and (max-width: 834px) {
      width: 135px;
      height: 202px;
    }
  }

  .favorite__info-block {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    word-break: break-all;
    hyphens: auto;
    @media screen and (max-width: 834px) {
      width: 532px;
    }
    @media screen and (max-width: 320px) {
      width: 135px;
    }
  }
  .rubbish-img {
    margin-top: 30px;
    width: 30px;
    height: 30px;
    @media screen and (max-width: 320px) {
      width: 20px;
      height: 20px;
      margin-top: 5px;
      margin-left: 260px;
    }
  }
  .rubbish-img:hover {
    cursor: pointer;
  }
  .normal-title--size {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    @media screen and (max-width: 320px) {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;
