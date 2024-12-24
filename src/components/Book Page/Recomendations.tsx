import React from 'react';

import CatalogBook from '../Catalog/CatalogBook';
import { BookType } from '../../lib/types';
import { useAppSelector } from '../../hooks';
import { cartSelectors } from '../../store/cart/selectors';
import { favoriteSelectors } from '../../store/favorites/selectors';

type Props = {
  book: BookType;
};

const Recommendations: React.FC<Props> = (props) => {
  const currentBook = props.book;

  const isInCart = useAppSelector((state) =>
    cartSelectors.getIsInCart(state, currentBook.id)
  );

  const isInFavorites = useAppSelector((state) =>
    favoriteSelectors.getIsInFavorite(state, currentBook.id)
  );

  const bookPrice =
    currentBook.cover?.hardcover_amount &&
    currentBook.cover?.hardcover_amount > 0
      ? currentBook.cover?.hardcover_price
      : currentBook.cover?.paperback_price;

  const isBestseller = currentBook.isBestseller
    ? currentBook.isBestseller
    : false;

  const isNew = currentBook.isNew ? currentBook.isNew : false;

  return (
    <CatalogBook
      id={currentBook.id}
      img={currentBook.img}
      name={currentBook.name}
      author={currentBook.author.text}
      price={bookPrice}
      isInCart={isInCart}
      isInFavorites={isInFavorites}
      isBestseller={isBestseller}
      isNew={isNew}
    />
  );
};

export default Recommendations;
