import React from 'react';
import styled from 'styled-components';
import { IPropsFavorite } from '../../lib/types';

import rubbish from '../../img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { deleteFavoriteItem } from '../../store/thunk';
import { ApiPath } from '../../constants/textConstants';

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
      <img src={dirnameBookImg + bookImg} alt="img" className="img-book"></img>
      <div className="info-block">
        <div className="big-title">{bookName}</div>
        <div className="normal-title">{bookAuthor?.text}</div>
        <img
          src={rubbish}
          alt="img"
          className="icon-img"
          onClick={handleDeleteItem}
        ></img>
      </div>
    </StyledWrapper>
  );
};

export default BookInFavorite;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;

  .img-book {
    width: 197px;
    height: 289px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }

  .icon-img :hover {
    cursor: pointer;
  }
`;
