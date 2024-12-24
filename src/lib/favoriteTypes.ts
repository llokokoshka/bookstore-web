import { BookType } from './bookTypes';

export type FavoriteType = {
  id: number;
  booksIdsInFavorites: number[];
  favoriteBooks: BookType[];
};

export interface IFavoriteState {
  favoriteId: number | null;
  booksIdsInFavorites: number[];
  loading: boolean;
  error: string | null;
}
