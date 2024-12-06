import React from 'react';

import Book from '../Catalog/Book';
import { BookType } from '../../lib/types';

const Recommendations: React.FC<{
  id: number;
  booksInCart: number[];
  booksInFavorites: number[];
  books: Record<number, BookType>;
}> = (props) => {
  const idBook = props.id;

  let inCart = false;
  let inFavorites = false;
  if (props.booksInCart && props.booksInCart.find((book) => book === idBook)) {
    inCart = true;
  }
  if (
    props.booksInFavorites &&
    props.booksInFavorites.find((book) => book === idBook)
  ) {
    inFavorites = true;
  }

  const currentBook = idBook in props.books ? props.books[idBook] : null;
  return (
    <React.Fragment key={currentBook?.id}>
      {currentBook ? (
        <Book
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
    </React.Fragment>
  );
};

export default Recommendations;
