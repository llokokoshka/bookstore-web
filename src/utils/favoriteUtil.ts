import { FavoriteNormalizeType } from '../lib/favoriteTypes';
import { AppDispatch } from '../store';
import {
  addFavoriteItem,
  deleteFavoriteItem,
} from '../store/favorites/favoritesThunk';

export const handleFavorites = async (
  id: number | undefined,
  dispatch: AppDispatch,
  booksInFavorites: number[],
  Favorites: FavoriteNormalizeType | null,
  isInFavorites: boolean
) => {
  let isFav = isInFavorites;
  if (booksInFavorites && id && !booksInFavorites.find((book) => book === id)) {
    await dispatch(addFavoriteItem(id));
    isFav = true;
  } else if (
    booksInFavorites &&
    id &&
    booksInFavorites.find((book) => book === id)
  ) {
    const bookInFav = Favorites?.favoritesItems.find(
      (item) => item.book === id
    );
    if (bookInFav) await dispatch(deleteFavoriteItem(bookInFav?.id));
    isFav = false;
  }
  return isFav;
};
