import { BookType, UserType } from '../../lib/types';

export interface IBookState {
  books: Record<number, BookType>;
  error?: string | undefined | null;
  loading: boolean;
}

export type RatingThunkType = {
  bookId: number;
  rate: number;
};

export type AddCommentThunkType = {
  text: string;
  bookId: number;
  user: UserType;
};
