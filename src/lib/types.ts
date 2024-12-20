import { SetURLSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store';
import { BookType, CommentsType, CoverType, GenresType } from './bookTypes';
import { IFormInfo, IFormPass, IUserRating, UserType } from './authTypes';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from 'react-hook-form';

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

export interface IBaseButtonProps {
  buttonClassName?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: React.CSSProperties | undefined;
}

export interface IBookButtonProps {
  type: string;
  amount: number;
  price: number;
}

export interface IBookCoverProps {
  id: number;
  isFav: boolean;
  img: string;
}

export interface IBookDescriptionProps {
  description: string;
}

export interface IBookInfoProps {
  description: string;
  cover: CoverType;
}

export interface IBookMainInfoProps {
  id: number;
  name: string;
  author: string;
}

export interface ICommentInputProps {
  id: number;
}

export interface IRatingProps {
  bookId: number;
  isUserRate: boolean;
}

export interface IBookAmountProps {
  id: number;
  quantity: number;
}

export interface IEmptyPageProps {
  page: string;
}

export interface ICatalogBookCoverProps {
  img: string;
  id: number;
  isInFavorites: boolean;
  isBestseller: boolean;
  isNew: boolean;
}

export interface IAuthButtonProps {
  page: string;
}

export interface IRoundButtonsProps {
  img: string;
  url: string;
}

export interface ISearchProps {
  className?: string;
  inputClassName?: string;
}

export interface IUserButtonsProps {
  itemsInCart: number;
}

export interface IProfileInfoFormProps {
  user: UserType | null;
  onSubmitFormInfo: SubmitHandler<IFormInfo>;
  handleChangeInfo: () => void;
  changeInfo: boolean;
  editValueName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editValueMail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitFormInfo: (
    onValid: SubmitHandler<IFormInfo>,
    onInvalid?: SubmitErrorHandler<IFormInfo> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  registerFormInfo: UseFormRegister<IFormInfo>;
  infoErrors: FieldErrors<IFormInfo>;
}

export interface IProfilePassFormProps {
  user: UserType | null;
  handleSubmitFormPass: (
    onValid: SubmitHandler<IFormPass>,
    onInvalid?: SubmitErrorHandler<IFormPass> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmitFormPass: SubmitHandler<IFormPass>;
  handleChangePass: () => void;
  changePass: boolean;
  registerFormPass: UseFormRegister<IFormPass>;
  passErrors: FieldErrors<IFormPass>;
}
