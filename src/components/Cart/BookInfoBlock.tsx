import React from 'react';
import styled from 'styled-components';

import { IBookInCartProps } from '../../lib/bookTypes';
import BookAmount from './BookAmount';

const BookInfoBlock: React.FC<IBookInCartProps> = (props) => {
  let bookName, bookAuthor;
  if (props.book) {
    bookName = props.book.name;
    bookAuthor = props.book.author;
  }

  return (
    <StyledWrapper>
      <div className="info-block__total-info">
        <div>
          <div className="big-title">{bookName}</div>
          <div className="normal-title normal-title--size">
            {bookAuthor?.text}
          </div>
        </div>
        <BookAmount id={props.id} quantity={props.quantity} />
      </div>
      <div className="total-prise">$ {props.price} USD</div>
    </StyledWrapper>
  );
};

export default BookInfoBlock;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  width: 100%;
  flex-wrap: wrap;
  word-break: break-all;
  hyphens: auto;
  @media screen and (max-width: 834px) {
    width: 532px;
  }
  @media screen and (max-width: 320px) {
    width: 135px;
    row-gap: 48px;
  }

  .info-block__total-info {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    @media screen and (max-width: 320px) {
      row-gap: 30px;
    }
  }

  .total-prise {
    font-size: 36px;
    font-weight: 400;
    line-height: 54px;
    @media screen and (max-width: 320px) {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
    }
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
