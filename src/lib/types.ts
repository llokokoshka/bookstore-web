import { SetURLSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store';

type Rating = {
  id: number;
  value: string;
  book: BookType;
};

type Author = {
  id: number;
  text: string;
};

type BookGenre = { id: number };

export type UserType = {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  passwordNew?: string;
  avatar?: string;
  rating: Rating[];
};

export interface IUserResponseData {
  access_token: string;
  refresh_token: string;
  user: UserType;
}

export interface IFormReg {
  email: string;
  password: string;
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

export interface IAuthState {
  user: UserType | null;
  error: string | null;
  loading: boolean;
}

export type CoverType = {
  id: number;
  paperback_price: number;
  paperback_amount: number;
  hardcover_price: number;
  hardcover_amount: number;
};

export type CommentsType = {
  id: number;
  text: string;
  dateOfCreate: Date;
  user: {
    id: number;
    fullName: string;
    avatar: string;
  };
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
  bookGenres?: BookGenre[];
  comments?: CommentsType[];
  rates?: { rating: number };
  cover: CoverType;
};

export interface IPropsBookPageBody {
  id: number;
  img: string;
  name: string;
  author: string;
  description: string;
  cover: CoverType;
  comments: CommentsType[] | undefined;
}

export interface IPropsBookInCart {
  id: number;
  price: number;
  quantity: number;
  book: BookType;
}

export interface IBookProps {
  img: string;
  id: number | undefined;
  name: string;
  author: string;
  price: number | undefined;
  isInCart: boolean;
  isInFavorites: boolean;
}

export interface IPropsFavorite {
  id: number;
  book: BookType;
}

type MetaType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
};
export interface IBook {
  data: BookType[] | null;
  meta: MetaType | null;
}

export interface IBookState {
  books: BookType[] | null;
  meta: MetaType | null;
  error: string | null;
  loading: boolean;
}

export type GenresType = {
  id: number;
  name: string;
};

export interface IFilterState {
  page: number;
  genres: GenresType[];
  checkedGenresId: number[];
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export interface ICommentsState {
  comments: CommentsType[];
  loading: boolean;
  error: string | null;
}

export type InputPropsType = {
  img: string;
  label: string;
  typeP: string;
  register: any;
  name: string;
  value: string | undefined;
  disable: boolean;
  errors: any;
};

export type CartItemType = {
  id: number;
  total_price: number;
  quantity: number;
  book: BookType;
};

export type CartType = {
  id: number;
  total_price: number;
  cartItems: CartItemType[];
};

export interface ICartState {
  cart: CartType | null;
  normalizeCart: Record<number, CartItemType>;
  numberOfItemsInCart: number;
  loading: boolean;
  error: string | null;
}

export type FavoriteItemType = {
  id: number;
  book: BookType;
};

export type FavoriteType = {
  id: number;
  favoritesItems: FavoriteItemType[];
};

export interface IFavoriteState {
  favorites: FavoriteType | null;
  normalizeFavorites: Record<number, FavoriteItemType>;
  loading: boolean;
  error: string | null;
}

export type AddCommentThunkType = {
  text: string;
  bookId: number;
};

export type QueryParamsType = {
  pageNum?: string | null;
  genres?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  sortBy?: string | null;
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
