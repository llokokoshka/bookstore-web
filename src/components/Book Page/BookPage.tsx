import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBookById } from '../../store/thunk';

const BookPage: React.FC = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const bookId = Number(id);
  const getBooks = useAppSelector((state) => state.booksEntities.books);
  const getFav = useAppSelector((state) => state.favorite.normalizeFavorites);

  useEffect(() => {
    if (!getBooks) {
      dispatch(getBookById(bookId));
    }
  }, [bookId, dispatch]);

  const book = getBooks?.find((book) => book.id === bookId);
  const isInFav = getFav.find((id) => id === book?.id);
  return (
    <StyledWrapper>
      <Header />
      {book && getBooks ? (
        <BookPageBody
          key={bookId}
          id={bookId}
          img={book.img}
          name={book.name}
          author={book.author.text}
          description={book.description}
          cover={book.cover}
          comments={book.comments}
          isFav={isInFav === undefined ? false : true}
        />
      ) : null}
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
