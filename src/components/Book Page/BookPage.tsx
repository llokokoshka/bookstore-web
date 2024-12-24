import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Recommendations from './Recomendations';
import {
  getBookById,
  getComments,
} from '../../store/booksEntities/booksEntitiesThunk';
import { getRecommended } from '../../store/recommended/recommendedThunk';
import AuthPoster from '../Catalog/AuthPoster';
import { favoriteSelectors } from '../../store/favorites/selectors';

const BookPage: React.FC = () => {
  const dispatch = useAppDispatch();

  let { id } = useParams();
  const bookId = Number(id);

  const user = useAppSelector((state) => state.auth.user);
  const books = useAppSelector((state) => state.booksEntities.books);

  const recommendedBooks = useAppSelector(
    (state) => state.recommended.recommended
  );

  const [currentRecommendedBooks, setCurrentRecommendedBooks] =
    useState<number[]>(recommendedBooks);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getRecommended(bookId));
    // eslint-disable-next-line
  }, [pathname]);

  const book = books[bookId];
  const comments = book.comments;

  useEffect(() => {
    if (!book || !books) {
      dispatch(getBookById(bookId));
    }
    if (book && !comments) {
      dispatch(getComments(bookId));
    }
    if (recommendedBooks.length < 4) {
      dispatch(getRecommended(bookId));
      for (let idRec of recommendedBooks) {
        if (!(idRec in books)) {
          dispatch(getBookById(idRec));
        }
      }
    }

    let newData: number[] = [...recommendedBooks];

    const width = window.outerWidth;
    if (width > 320 && width < 835) {
      newData.pop();
    } else if (width <= 320) {
      newData.pop();
      newData.pop();
    }

    setCurrentRecommendedBooks(newData);
    // eslint-disable-next-line
  }, [bookId, dispatch, comments, recommendedBooks]);

  const isInFavorites = useAppSelector((state) =>
    favoriteSelectors.getIsInFavorite(state, bookId)
  );

  return (
    <StyledWrapper>
      <Header page="Book" />
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
      {user === null && <AuthPoster />}
      <div className="recommended">
        <div className="big-title">Recommendations</div>
        <div className="recommended__books">
          {currentRecommendedBooks?.map((idBook) => {
            return <Recommendations key={idBook} book={books[idBook]} />;
          })}
        </div>
      </div>
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

  .recommended {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.padding.base};
    row-gap: 50px;
    @media screen and (max-width: 834px) {
      padding: 0 15px 100px 15px;
    }
  }

  .recommended__books {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
