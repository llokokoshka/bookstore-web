import React from 'react';
import styled from 'styled-components';

import BookAmount from './BookAmount';
import { BookType } from '../../lib/types';

type Props = {
  id: number;
  price: number;
  quantity: number;
  book?: BookType;
};

const BookInfoBlock: React.FC<Props> = (props) => {
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
  ${({ theme }) => theme.media.tablet} {
    width: 532px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 135px;
    row-gap: 48px;
  }

  .info-block__total-info {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    ${({ theme }) => theme.media.mobile} {
      row-gap: 30px;
    }
  }

  .total-prise {
    font-size: 36px;
    font-weight: 400;
    line-height: 54px;
    ${({ theme }) => theme.media.mobile} {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
    }
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
