import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBookRatingApi,
  getBookByIdApi,
  getGenresApi,
  addCommentApi,
  addRateApi,
  getAllCommentsApi,
  getAvarageRatingApi,
} from '../../api/bookApi';
import {
  RatingThunkType,
  BookType,
  GenresType,
  AddCommentThunkType,
  CommentsType,
  IUserRating,
} from '../../lib/types';
import { addOrUpdBook } from './booksEntitiesSlice';
import { setGenres } from '../filter/filterSlice';

export const getBookRating = createAsyncThunk<RatingThunkType, number>(
  'books/fetchBookRating',
  async (bookId) => {
    const data = await getBookRatingApi(bookId);
    return data;
  }
);

export const getBookById = createAsyncThunk<BookType, number>(
  'books/getBook',
  async (bookId, thunkAPI) => {
    try {
      const book = await getBookByIdApi(bookId);
      thunkAPI.dispatch(addOrUpdBook([book]));
      return book;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getGenres = createAsyncThunk<GenresType[]>(
  'books/genres',
  async (_, thunkAPI) => {
    try {
      const data = await getGenresApi();
      thunkAPI.dispatch(setGenres(data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addComment = createAsyncThunk<CommentsType, AddCommentThunkType>(
  'comments/addComment',
  async ({ text, bookId }, thunkAPI) => {
    try {
      const data = await addCommentApi(bookId, text);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getComments = createAsyncThunk<CommentsType[], number>(
  'comments/getComments',
  async (bookId: number, thunkAPI) => {
    try {
      const data = await getAllCommentsApi(bookId);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addOrUpdateRating = createAsyncThunk<
  { bookId: number; rating: IUserRating; avarageRating: number },
  RatingThunkType
>('books/addOrUpdateRating', async ({ bookId, rate }) => {
  const rating = await addRateApi(bookId, rate);
  const avarageRate = await getAvarageRatingApi(bookId);

  return {
    bookId,
    rating: rating,
    avarageRating: avarageRate,
  };
});
