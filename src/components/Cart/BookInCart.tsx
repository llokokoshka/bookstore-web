import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AppPages } from '../../constants/textConstants';
import BookInfoBlock from './BookInfoBlock';
import { BookType } from '../../lib/types';

type Props = {
  id: number;
  price: number;
  quantity: number;
  book?: BookType;
};

const BookInCart: React.FC<Props> = (props) => {
  let bookImg;
  if (props.book) {
    bookImg = props.book.img;
  }

  return (
    <StyledWrapper>
      <Link to={props.book ? `${AppPages.getBookIdUrl(props.book.id)}` : ''}>
        <img src={bookImg} alt="img" className="book-img"></img>
      </Link>
      <BookInfoBlock
        id={props.id}
        price={props.price}
        quantity={props.quantity}
        book={props.book}
      />
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
    @media screen and (max-width: 834px) {
      width: 135px;
      height: 202px;
    }
  }
`;
