import { SetURLSearchParams } from 'react-router-dom';

import { AppDispatch } from '../store';
import { IFormReg } from '../store/auth/authTypes';

export interface IUserRating {
  id: number;
  value: number;
}

export type UserType = {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  passwordNew?: string;
  avatar?: string;
  rating: Record<number, IUserRating>;
};

export type PartialUserType = {
  id: number;
  fullName: string;
  avatar: string;
  email?: string;
};

export interface IUserRatingWithTotalRate extends IUserRating {
  avarageRating: number;
}

export interface IFormInput extends IFormReg {
  passwordRep: string;
}

export interface IFormInfo {
  fullName: string;
  email: string;
}

export interface IFormPass {
  password: string;
  passwordNew: string;
  passwordRep: string;
}

export interface IFilterState {
  genres: GenresType[];
}

export interface ICommentsState {
  comments: CommentsType[];
  loading: boolean;
  error: string | null;
}

export type RatingResThunkType = {
  rateId: number;
  value: IUserRating;
};

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

type Author = {
  id: number;
  text: string;
};

export type BookGenreType = { id: number };

export type GenresType = {
  id: number;
  name: string;
};

export type CommentsType = {
  id: number | string;
  text: string;
  dateOfCreate: Date;
  user: UserType;
  bookId?: number;
};

export type CoverType = {
  id: number;
  paperback_price: number;
  paperback_amount: number;
  hardcover_price: number;
  hardcover_amount: number;
};

export type BookType = {
  id: number;
  name: string;
  img: string;
  description: string;
  quantity?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  author: Author;
  bookGenres?: BookGenreType[] | [];
  comments: CommentsType[];
  rates: IUserRating[] | [];
  totalRate?: number | null;
  cover: CoverType;
  isFav?: boolean;
};

export interface RatingBook extends IUserRating {
  book: BookType;
}

type MetaType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
};

export interface ICatalogState {
  books: number[] | null;
  meta: MetaType | null;
  error: string | null;
  loading: boolean;
}

export interface ICatalogFromServer {
  data: BookType[] | null;
  meta: MetaType | null;
}

export interface ICatalog {
  data: number[] | null;
  meta: MetaType | null;
}

export interface ICatalogProps {
  id: number;
  booksInCart: number[];
  booksInFavorites: number[];
  books: Record<number, BookType>;
}

export interface IBookItemState {
  book: BookType | null;
  error: string | null;
  loading: boolean;
}
