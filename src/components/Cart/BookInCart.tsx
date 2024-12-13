import React from 'react';
import styled from 'styled-components';

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
import { IBookInCartProps } from '../../lib/bookTypes';

const BookInCart: React.FC<IBookInCartProps> = (props) => {
  const dispatch = useAppDispatch();
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  let bookImg, bookName, bookAuthor;
  if (props.book) {
    bookImg = props.book.img;
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }

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
      <img src={dirnameBookImg + bookImg} alt="img" className="book-img"></img>
      <div className="info-block">
        <div>
          <div className="big-title">{bookName}</div>
          <div className="normal-title normal-title--size">
            {bookAuthor?.text}
          </div>
        </div>
        <div className="info-block__amount">
          <div className="amount__block">
            <div className="block__button" onClick={handleMinusQuantity}>
              <img src={minus} alt="img" className="button__img"></img>
            </div>
            <div>{props.quantity}</div>
            <div className="block__button" onClick={handlePlusQuantity}>
              <img src={plus} alt="img" className="button__img"></img>
            </div>
          </div>
          <img
            src={rubbish}
            alt="img"
            className="amount__rubbish-img"
            onClick={handleDeleteItem}
          ></img>
        </div>
        <div className="total-prise">$ {props.price} USD</div>
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
  @media screen and (max-width: 834px) {
    column-gap: 17px;
  }

  .book-img {
    width: 197px;
    height: 289px;
    border-radius: 16px;
    @media screen and (max-width: 834px) {
      width: 255px;
      height: 375px;
    }
  }

  .info-block {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
  }

  .block__button {
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

  .block__button:hover {
    cursor: pointer;
  }

  .info-block__amount {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 58px;
  }

  .amount__block {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 14px;
  }

  .amount__rubbish-img {
    width: 20px;
    height: 20px;
  }

  .amount__rubbish-img:hover {
    cursor: pointer;
  }

  .button__img {
    width: 8px;
    height: auto;
  }

  .total-prise {
    font-size: 36px;
    font-weight: 400;
    line-height: 54px;
  }

  .normal-title--size {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }
`;
