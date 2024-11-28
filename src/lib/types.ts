import { SetURLSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store';

export interface IFormInput {
  email: string;
  password: string;
  passwordRep: string;
}

export interface IFormReg {
  email: string;
  password: string;
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
type Rating = {
  id: number;
  value: string;
  book: Book;
};

export type User = {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  passwordNew?: string;
  avatar?: string;
  rating: Rating[];
};

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

type author = {
  id: number;
  text: string;
};

type bookGenre = { id: number };

export type coverType = {
  id: number;
  paperback_price: number;
  paperback_amount: number;
  hardcover_price: number;
  hardcover_amount: number;
};

export type commentsType = {
  id: number;
  text: string;
  dateOfCreate: Date;
  user: {
    id: number;
    fullName: string;
    avatar: string;
  };
};

export type Book = {
  id: number;
  name: string;
  img: string;
  description: string;
  quantity?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  author: author;
  bookGenres?: [bookGenre];
  comments?: [commentsType];
  rates?: { rating: number };
  cover: coverType;
};

export interface PropsBookPageBody {
  id: number;
  img: string;
  name: string;
  author: string;
  description: string;
  cover: coverType;
  comments: commentsType[] | undefined;
}

export interface PropsBookInCart {
  id: number;
  price: number;
  quantity: number;
  book: Book;
}

export interface BookProps {
  img: string;
  id: number | undefined;
  name: string;
  author: string;
  price: number | undefined;
  isInCart: boolean;
  isInFavorites: boolean;
}

export interface PropsFavorite {
  id: number;
  book: Book;
}

export interface BookState {
  books: Book[] | null;
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    page: number;
    pageCount: number;
  } | null;
  error: string | null;
  loading: boolean;
}

export type GenresType = {
  id: number;
  name: string;
};

export interface FilterState {
  page: number;
  genres: GenresType[];
  checkedGenresId: number[];
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export interface commentsState {
  comments: commentsType[];
  loading: boolean;
  error: string | null;
}

export type InputProps = {
  img: string;
  label: string;
  typeP: string;
  register: any;
  name: string;
  value: string | undefined;
  disable: boolean;
  errors: any;
};

export type cartItemType = {
  id: number;
  total_price: number;
  quantity: number;
  book: Book;
};

export type cartType = {
  id: number;
  total_price: number;
  cartItems: cartItemType[];
};

export interface cartState {
  cart: cartType | null;
  normalizeCart: Record<number, cartItemType>;
  numberOfItemsInCart: number;
  loading: boolean;
  error: string | null;
}

export type favoriteItemType = {
  id: number;
  book: Book;
};

export type favoriteType = {
  id: number;
  favoritesItems: favoriteItemType[];
};

export interface favoriteState {
  favorites: favoriteType | null;
  normalizeFavorites: Record<number, favoriteItemType>;
  loading: boolean;
  error: string | null;
}

export type addCommentThunkType = {
  text: string;
  bookId: number;
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
}
