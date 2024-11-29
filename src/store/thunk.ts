import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AddCommentThunkType,
  CommentsType,
  IBook,
  ICatalog,
  IFormReg,
  IUserResponseData,
  QueryParamsType,
} from '../lib/types';
import { axiosInstance } from '../axiosDefaul';
import { ApiPath, AppPages } from '../constants/textConstants';
import { addOrUpdBook } from './booksEntitiesSlice';

export const loginUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.login,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<IUserResponseData>(
        ApiPath.login,
        {
          email,
          password,
        }
      );

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const regUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.registration,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<IUserResponseData>(
        ApiPath.registration,
        {
          email,
          password,
        }
      );

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return response.data;
    } catch (err: any) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserApi = createAsyncThunk<IUserResponseData>(
  AppPages.profile,
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<IUserResponseData>(
        ApiPath.user.me
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBooks = createAsyncThunk<IBook, QueryParamsType>(
  `getBooks`,
  async (data, thunkAPI) => {
    try {
      const { pageNum, genres, minPrice, maxPrice, sortBy } = data;
      let strOfSearch;
      if (pageNum === undefined || pageNum === null) {
        strOfSearch = `/books/?page=1&take=12`;
      } else {
        strOfSearch = `/books/?page=${pageNum}&take=12`;
      }

      if (genres) {
        strOfSearch += `&genres=${genres}`;
      }
      if (minPrice) {
        strOfSearch += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        strOfSearch += `&maxPrice=${maxPrice}`;
      }
      if (sortBy) {
        strOfSearch += `&sortBy=${sortBy}`;
      }

      const response = await axiosInstance.get(strOfSearch);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCatalog = createAsyncThunk<ICatalog, QueryParamsType>(
  `getCatalog`,
  async (data, thunkAPI) => {
    try {
      let strOfSearch;
      const { pageNum, genres, minPrice, maxPrice, sortBy } = data;

      if (pageNum === undefined || pageNum === null) {
        strOfSearch = `/books/?page=1&take=12`;
      } else {
        strOfSearch = `/books/?page=${pageNum}&take=12`;
      }

      if (genres) {
        strOfSearch += `&genres=${genres}`;
      }
      if (minPrice) {
        strOfSearch += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        strOfSearch += `&maxPrice=${maxPrice}`;
      }
      if (sortBy) {
        strOfSearch += `&sortBy=${sortBy}`;
      }

      const response = await axiosInstance.get<IBook>(strOfSearch);
      const arrayWithBooks = response.data.data;

      const newArrWithBookIds = arrayWithBooks
        ? arrayWithBooks.map((book) => {
            return book.id;
          })
        : null;

      if (arrayWithBooks) {
        thunkAPI.dispatch(addOrUpdBook(arrayWithBooks));
      }

      const newDataForCatalog: ICatalog = {
        data: newArrWithBookIds,
        meta: response.data.meta,
      };

      return newDataForCatalog;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addComment = createAsyncThunk<CommentsType[], AddCommentThunkType>(
  'comments/addComment',
  async ({ text, bookId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<CommentsType[]>(
        ApiPath.getBookCommentWithIdUrl(bookId),
        {
          text,
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getComments = createAsyncThunk<CommentsType[], number>(
  'comments/getComments',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get<CommentsType[]>(
        ApiPath.getBookCommentWithIdUrl(bookId)
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBookRating = createAsyncThunk<
  {
    bookId: number;
    rating: number;
  },
  number
>('books/fetchBookRating', async (bookId) => {
  const response = await axiosInstance.get(
    ApiPath.getBookRatingWithIdUrl(bookId)
  );
  return { bookId, rating: response.data };
});

export const addOrUpdateRating = createAsyncThunk(
  'books/addOrUpdateRating',
  async ({ bookId, value }: { bookId: number; value: number }) => {
    await axiosInstance.post(ApiPath.getBookRatingWithIdUrl(bookId), { value });
    const response = await axiosInstance.get(
      ApiPath.getBookRatingWithIdUrl(bookId)
    );
    return { bookId, rating: response.data };
  }
);

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await axiosInstance.get(ApiPath.user.cart.allItems);
  return response.data;
});

export const addCartItem = createAsyncThunk(
  'cart/addItemInCart',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post(ApiPath.user.cart.item, {
        bookId,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const upAmountCartItem = createAsyncThunk(
  'cart/upAmountCartItem',
  async (ItemId: number, thunkAPI) => {
    try {
      const action = true;
      const response = await axiosInstance.patch(
        ApiPath.user.cart.getItemWithIdUrl(ItemId),
        {
          action,
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const downAmountCartItem = createAsyncThunk(
  'cart/downAmountCartItem',
  async (ItemId: number, thunkAPI) => {
    try {
      const action = false;
      const response = await axiosInstance.patch(
        ApiPath.user.cart.getItemWithIdUrl(ItemId),
        {
          action,
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteItemInCart',
  async (ItemId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        ApiPath.user.cart.getItemWithIdUrl(ItemId)
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getFavorite = createAsyncThunk(
  'favorite/getFavorite',
  async () => {
    const response = await axiosInstance.get(
      ApiPath.user.favorites.allFavorites
    );
    return response.data;
  }
);

export const addFavoriteItem = createAsyncThunk(
  'favorite/addItemInFavorite',
  async (bookId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.post(ApiPath.user.favorites.item, {
        bookId,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteFavoriteItem = createAsyncThunk(
  'favorite/deleteItemFromFavorite',
  async (ItemId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        ApiPath.user.favorites.getItemWithIdUrl(ItemId)
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
