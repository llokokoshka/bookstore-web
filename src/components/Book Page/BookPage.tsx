import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';

import Recommendations from './Recomendations';
import { getBookById } from '../../store/booksEntities/booksEntitiesThunk';
import { getCart } from '../../store/cart/cartThunk';
import { getFavorite } from '../../store/favorites/favoritesThunk';
import { getRecommended } from '../../store/recommended/recommendedThunk';

const BookPage: React.FC = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const bookId = Number(id);
  const books = useAppSelector((state) => state.booksEntities.books);
  const favorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const recommendedBooks = useAppSelector(
    (state) => state.recommended.recommended
  );
  const user = useAppSelector((state) => state.auth.user);
  const booksInCart = useAppSelector((state) => state.cart.normalizeCart);
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (user && Object.keys(booksInCart).length === 0) {
      try {
        dispatch(getCart());
      } catch (err) {
        console.error(err);
      }
    }
    if (user && Object.keys(booksInFavorites).length === 0) {
      try {
        dispatch(getFavorite());
      } catch (err) {
        console.error(err);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!books) {
      dispatch(getBookById(bookId));
    }
    if (recommendedBooks.length === 0 || recommendedBooks.length < 4) {
      dispatch(getRecommended());
      for (let idRec of recommendedBooks) {
        if (!(idRec in books)) {
          dispatch(getBookById(idRec));
        }
      }
    }
  }, [bookId, dispatch]);

  const book = bookId in books ? books[bookId] : null;
  console.log(book);
  const isInFav = favorites.find((id) => id === book?.id);
  return (
    <StyledWrapper>
      <Header />
      {book && books ? (
        <BookPageBody
          key={bookId}
          id={bookId}
          img={book.img}
          name={book.name}
          author={book.author}
          description={book.description}
          cover={book.cover}
          comments={book.comments}
          isFav={isInFav === undefined ? false : true}
        />
      ) : null}
      <div className="recommended">
        <div className="big-title">Recommendations</div>
        <div className="recommended_books">
          {recommendedBooks?.map((idBook) => {
            return (
              <Recommendations
                id={idBook}
                booksInCart={booksInCart}
                booksInFavorites={booksInFavorites}
                books={books}
              />
            );
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
    padding: ${({ theme }) => theme.padding.header};
    row-gap: 50px;
  }

  .recommended_books {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
