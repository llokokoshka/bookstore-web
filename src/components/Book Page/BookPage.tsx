import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const BookPage: React.FC = () => {
  let { id } = useParams();
  const bookId = Number(id);
  const getBooks = useAppSelector((state) => state.books.books);
  const book = getBooks?.find((book) => book.id === bookId);
  console.log(book);

  return (
    <StyledWrapper>
      <Header />
      <BookPageBody
        key={bookId}
        id={bookId}
        img={book?.img}
        name={book?.name}
        author={book?.author.text}
        description={book?.description}
        cover={book?.cover}
        comments={book?.comments}
      />
      <Footer />
    </StyledWrapper>
  );
};

export default BookPage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
