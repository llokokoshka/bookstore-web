import React from 'react';
import styled from 'styled-components';
import { IPropsFavorite } from '../../lib/types';

import rubbish from '../../img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { ApiPath } from '../../constants/textConstants';
import { deleteFavoriteItem } from '../../store/favorites/favoritesThunk';

const BookInFavorite: React.FC<IPropsFavorite> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  let bookImg, bookName, bookAuthor;
  if (props.book) {
    bookImg = props.book.img;
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }
  const dispatch = useAppDispatch();

  const handleDeleteItem = async () => {
    await dispatch(deleteFavoriteItem(props.id));
  };
  return (
    <StyledWrapper>
      <div className="fav-main-block">
        <img
          src={dirnameBookImg + bookImg}
          alt="img"
          className="img-book"
        ></img>
        <div className="info-block">
          <div className="big-title">{bookName}</div>
          <div className="normal-title">{bookAuthor?.text}</div>
        </div>
      </div>
      <img
        src={rubbish}
        alt="img"
        className="icon-img"
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
  /* column-gap: 20px; */
  padding: 40px 0px;

  .fav-main-block {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .img-book {
    width: 197px;
    height: 289px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }
  .icon-img {
    margin-top: 30px;
    width: 30px;
    height: 30px;
  }
  .icon-img:hover {
    cursor: pointer;
  }
`;
