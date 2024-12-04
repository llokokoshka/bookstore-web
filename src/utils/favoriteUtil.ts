import { addFavoriteItem, deleteFavoriteItem } from '../store/thunk';
import { FavoriteNormalizeType } from '../lib/types';
import { AppDispatch } from '../store';

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
