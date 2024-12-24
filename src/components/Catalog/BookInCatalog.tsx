import React from 'react';

import CatalogBook from './CatalogBook';
import { useAppSelector } from '../../hooks';
import { cartSelectors } from '../../store/cart/selectors';
import { favoriteSelectors } from '../../store/favorites/selectors';
import { BookType } from '../../lib/types';

type Props = {
  book: BookType;
};

const BookInCatalog: React.FC<Props> = (props) => {
  const isInCart = useAppSelector((state) =>
    cartSelectors.getIsInCart(state, props.book.id)
  );

  const isInFavorites = useAppSelector((state) =>
    favoriteSelectors.getIsInFavorite(state, props.book.id)
  );

  const bookPrice =
    props.book.cover?.hardcover_amount > 0
      ? props.book.cover?.hardcover_price
      : props.book.cover?.paperback_price;

  return (
    <CatalogBook
      id={props.book.id}
      img={props.book.img}
      name={props.book.name}
      author={props.book.author.text}
      price={bookPrice}
      isInCart={isInCart}
      isInFavorites={isInFavorites}
      isBestseller={!!props.book.isBestseller}
      isNew={!!props.book.isNew}
    />
  );
};

export default BookInCatalog;
