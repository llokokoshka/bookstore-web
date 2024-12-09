import React from 'react';

import Book from './Book';
import { BookType } from '../../lib/types';

const Catalog: React.FC<{
  id: number;
  booksInCart: number[];
  booksInFavorites: number[];
  books: Record<number, BookType>;
}> = (props) => {
  let inCart = false;
  let inFavorites = false;
  if (
    props.booksInCart &&
    props.booksInCart.find((book) => book === props.id)
  ) {
    inCart = true;
  }
  if (
    props.booksInFavorites &&
    props.booksInFavorites.find((book) => book === props.id)
  ) {
    inFavorites = true;
  }
  const currentBook = props.id in props.books ? props.books[props.id] : null;
  return (
    <React.Fragment key={currentBook?.id}>
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
          isBestseller={
            currentBook.isBestseller ? currentBook.isBestseller : false
          }
          isNew={currentBook.isNew ? currentBook.isNew : false}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Catalog;
