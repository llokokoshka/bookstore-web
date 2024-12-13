import { SetURLSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store';
import { BookType, CommentsType, GenresType } from './bookTypes';
import { IUserRating, PartialUserType, UserType } from './authTypes';

export interface IFavoriteProps {
  id: number;
  book: BookType | undefined;
}

export interface IFilterState {
  page: number;
  genres: GenresType[];
  checkedGenresId: number[];
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  search: string;
}

export interface ICommentsState {
  comments: CommentsType[];
  loading: boolean;
  error: string | null;
}

export type AddCommentThunkType = {
  text: string;
  bookId: number;
  user: UserType;
};

export type RatingResThunkType = {
  rateId: number;
  value: IUserRating;
};

export type RatingThunkType = {
  bookId: number;
  rate: number;
};

export interface IRecommendedProps {
  id: number;
  booksInCart: number[];
  booksInFavorites: number[];
  books: Record<number, BookType>;
}

export interface IRecommendedThunk {
  newArrayWithBookIds: number[];
  books: BookType[];
}

export interface IRecommendedState {
  recommended: number[];
  error: string | null;
  loading: boolean;
}

export interface ISearchedState {
  searched: number[];
  error: string | null;
  loading: boolean;
}

export type QueryParamsType = {
  pageNum?: string | null;
  genres?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  sortBy?: string | null;
  search?: string | null;
};

export interface IQueryParams {
  dispatch: AppDispatch;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  pageNum?: string;
  genres?: string[] | number[] | undefined;
  sortByOption?: string;
  minPriceParam?: string;
  maxPriceParam?: string;
  search?: string;
}
