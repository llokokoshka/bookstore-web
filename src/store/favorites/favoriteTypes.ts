import { BookType } from '../../lib/types';

export type FavoriteType = {
  id: number;
  booksIdsInFavorites: number[];
  favoriteBooks: BookType[];
};

export interface IFavoriteState {
  favoriteId: number | null;
  booksIdsInFavorites: number[];
  numberOfItemsInFavorite: number;
  loading: boolean;
  error: string | null;
}
