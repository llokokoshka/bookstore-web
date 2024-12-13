import React from 'react';
import styled from 'styled-components';
import { IFavoriteProps } from '../../lib/types';

import rubbish from '../../img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { ApiPath } from '../../constants/textConstants';
import { deleteFavoriteItem } from '../../store/favorites/favoritesThunk';

const BookInFavorite: React.FC<IFavoriteProps> = (props) => {
  const dispatch = useAppDispatch();
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  let bookImg, bookName, bookAuthor;

  if (props.book) {
    bookImg = props.book.img;
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }

  const handleDeleteItem = async () => {
    await dispatch(deleteFavoriteItem(props.id));
  };

  return (
    <StyledWrapper>
      <div className="favorite">
        <img
          src={dirnameBookImg + bookImg}
          alt="img"
          className="favorite__book-img"
        ></img>
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
  }

  .favorite__info-block {
    display: flex;
    flex-direction: column;
  }
  .rubbish-img {
    margin-top: 30px;
    width: 30px;
    height: 30px;
  }
  .rubbish-img:hover {
    cursor: pointer;
  }
  .normal-title--size {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }
`;
