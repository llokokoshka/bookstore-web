import React from 'react';
import styled from 'styled-components';
import { IPropsBookInCart } from '../../lib/types';

import plus from '../../img/plus.png';
import minus from '../../img/minus.png';
import rubbish from '../../img/Delete.png';
import { useAppDispatch } from '../../hooks';

import { ApiPath } from '../../constants/textConstants';
import {
  deleteCartItem,
  downAmountCartItem,
  upAmountCartItem,
} from '../../store/cart/cartThunk';

const BookInCart: React.FC<IPropsBookInCart> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  let bookImg, bookName, bookAuthor;
  if (props.book) {
    bookImg = props.book.img;
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }
  const dispatch = useAppDispatch();
  const handleMinusQuantity = async () => {
    if (props.quantity === 1) {
      await dispatch(deleteCartItem(props.id));
    } else {
      await dispatch(downAmountCartItem(props.id));
    }
  };
  const handlePlusQuantity = async () => {
    await dispatch(upAmountCartItem(props.id));
  };
  const handleDeleteItem = async () => {
    await dispatch(deleteCartItem(props.id));
  };
  return (
    <StyledWrapper>
      <img src={dirnameBookImg + bookImg} alt="img" className="img-book"></img>
      <div className="info-block">
        <div className="big-title">{bookName}</div>
        <div className="normal-title">{bookAuthor?.text}</div>
        <div className="amount">
          <div className="amount-block">
            <div className="amount-bitton" onClick={handleMinusQuantity}>
              <img src={minus} alt="img" className="button-img"></img>
            </div>
            <div>{props.quantity}</div>
            <div className="amount-bitton" onClick={handlePlusQuantity}>
              <img src={plus} alt="img" className="button-img"></img>
            </div>
          </div>
          <img
            src={rubbish}
            alt="img"
            className="icon-img"
            onClick={handleDeleteItem}
          ></img>
        </div>
        <div>{props.price}</div>
      </div>
    </StyledWrapper>
  );
};

export default BookInCart;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  padding: 40px 0px;

  border-bottom: 1px solid grey;

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
