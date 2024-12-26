import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBookById,
  getComments,
} from '../../store/booksEntities/booksEntitiesThunk';
import AuthPoster from '../Catalog/AuthPoster';
import { favoriteSelectors } from '../../store/favorites/selectors';
import RecommendedBlock from './RecommendedBlock';
import { bookSelectors } from '../../store/booksEntities/selectors';

const BookPage: React.FC = () => {
  const dispatch = useAppDispatch();

  let { id } = useParams();
  const bookId = Number(id);

  const user = useAppSelector((state) => state.auth.user);
  const book = useAppSelector((state) => bookSelectors.getBook(state, bookId));
  const comments = book?.comments;

  useEffect(() => {
    if (!book) {
      dispatch(getBookById(bookId));
    }
    if (book && !comments) {
      dispatch(getComments(bookId));
    }
    // eslint-disable-next-line
  }, [bookId, dispatch, comments]);

  const isInFavorites = useAppSelector((state) =>
    favoriteSelectors.getIsInFavorite(state, bookId)
  );

  return (
    <StyledWrapper>
      <Header page="Book" />
      {book && (
        <BookPageBody
          key={bookId}
          id={bookId}
          img={book.img}
          name={book.name}
          author={book.author}
          description={book.description}
          cover={book.cover}
          rates={book.rates}
          comments={book.comments}
          isFav={isInFavorites}
        />
      )}
      {user === null && <AuthPoster />}
      <RecommendedBlock bookId={bookId} />
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
