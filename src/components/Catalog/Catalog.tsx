import React from 'react';

import CatalogBook from './CatalogBook';
import { ICatalogProps } from '../../lib/bookTypes';

const Catalog: React.FC<ICatalogProps> = (props) => {
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
        <CatalogBook
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
