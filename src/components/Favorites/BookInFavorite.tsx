import React from 'react';
import styled from 'styled-components';
import { PropsBookInCart } from '../../lib/types';

import rubbish from '../../img/Delete.png';
import { useAppDispatch } from '../../hooks';
import { deleteCartItem } from '../../store/thunk';

const BookInFavorite: React.FC<PropsBookInCart> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}/uploads/books/`;
  const { img, name, author } = props.book;
  const dispatch = useAppDispatch();

  const handleDeleteItem = async () => {
    await dispatch(deleteCartItem(props.id));
  };
  return (
    <StyledWrapper>
      <img src={dirnameBookImg + img} alt="img" className="img-book"></img>
      <div className="info-block">
        <div className="big-title">{name}</div>
        <div className="normal-title">{author.text}</div>
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
  .amount-bitton {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.light};
    width: 32px;
    height: 32px;
    gap: 0px;
    border-radius: 22px;
    opacity: 0px;
  }

  .amount-bitton:hover {
    cursor: pointer;
  }
  .amount {
    display: flex;
    flex-direction: row;
    column-gap: 58px;
  }
  .amount-block {
    display: flex;
    flex-direction: row;
    column-gap: 14px;
  }

  .icon-img :hover {
    cursor: pointer;
  }

  .button-img {
    width: 8px;
    height: auto;
  }
`;
