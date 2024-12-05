import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import Header from '../Header/Header';
import BookPageBody from './BodyBookPage';
import Footer from '../Footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBookById,
  getCart,
  getFavorite,
  getRecommended,
} from '../../store/thunk';
import Book from '../Catalog/Book';

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
    if (!books) {
      dispatch(getBookById(bookId));
    }
    if (recommendedBooks.length === 0) {
      dispatch(getRecommended());
    }
  }, [bookId, dispatch]);

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

  const book = books?.find((book) => book.id === bookId);
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
          author={book.author.text}
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
            let inCart = false;
            let inFavorites = false;
            if (booksInCart && booksInCart.find((book) => book === idBook)) {
              inCart = true;
            }
            if (
              booksInFavorites &&
              booksInFavorites.find((book) => book === idBook)
            ) {
              inFavorites = true;
            }
            const currentBook = books?.find((book) => book.id === idBook);
            return (
              <>
                {currentBook ? (
                  <Book
                    key={currentBook.id}
                    id={currentBook.id}
                    img={currentBook.img}
                    name={currentBook.name}
                    author={currentBook.author.text}
                    price={
                      currentBook.cover?.hardcover_amount &&
                      currentBook.cover?.hardcover_amount > 0
                        ? currentBook.cover?.hardcover_price
                        : currentBook.cover?.paperback_price
                    }
                    isInCart={inCart}
                    isInFavorites={inFavorites}
                  />
                ) : null}
              </>
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
