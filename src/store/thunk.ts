import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AddCommentThunkType,
  CommentsType,
  RatingThunkType,
  IBook,
  ICatalog,
  IFormReg,
  IUserResponseData,
  QueryParamsType,
  RatingResThunkType,
  IUserRating,
  CartType,
  CartItemType,
  FavoriteType,
  FavoriteItemType,
  IUserRatingWithTotalRate,
  BookType,
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

export const getBookRating = createAsyncThunk<RatingThunkType, number>(
  'books/fetchBookRating',
  async (bookId) => {
    const response = await axiosInstance.get<RatingThunkType>(
      ApiPath.getBookRatingWithIdUrl(bookId)
    );
    return response.data;
  }
);

export const getBookById = createAsyncThunk<BookType, number>(
  'books/getBook',
  async (bookId, thunkAPI) => {
    try {
      let response = await axiosInstance.get<{
        book: BookType;
        totalRate: number;
      }>(ApiPath.getBookByIdWithIdUrl(bookId));
      response.data.book.totalRate = response.data.totalRate;
      return response.data.book;
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
      if (arrayWithBooks) {
        thunkAPI.dispatch(addOrUpdBook(arrayWithBooks));

        const ratings = await Promise.all(
          arrayWithBooks.map((book) =>
            axiosInstance
              .get<RatingThunkType>(ApiPath.getBookRatingWithIdUrl(book.id))
              .then((res) => ({
                bookId: book.id,
                rate: res.data.rate,
              }))
          )
        );
        const booksWithRatings = arrayWithBooks.map((book) => {
          const rating = ratings.find((r) => r.bookId === book.id)?.rate || 0;
          return { ...book, totalRate: rating };
        });
        thunkAPI.dispatch(addOrUpdBook(booksWithRatings));
      }

      const newArrWithBookIds = arrayWithBooks
        ? arrayWithBooks.map((book) => {
            return book.id;
          })
        : null;

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

export const addComment = createAsyncThunk<CommentsType, AddCommentThunkType>(
  'comments/addComment',
  async ({ text, bookId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<CommentsType>(
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

export const addOrUpdateRating = createAsyncThunk<
  { bookId: number; rating: IUserRating; avarageRating: number },
  RatingThunkType
>('books/addOrUpdateRating', async ({ bookId, rate }) => {
  const rating = await axiosInstance.post<RatingResThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId),
    { rate }
  );
  const response = await axiosInstance.get<RatingThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId)
  );

  return {
    bookId,
    rating: rating.data.rating,
    avarageRating: response.data.rate,
  };
});

export const getCart = createAsyncThunk<CartType>(
  'cart/getCart',
  async (_, thunkAPI) => {
    const response = await axiosInstance.get<CartType>(
      ApiPath.user.cart.allItems
    );
    const booksInCart = response.data.cartItems.map((item) => {
      return item.book;
    });

    thunkAPI.dispatch(addOrUpdBook(booksInCart));
    return response.data;
  }
);

export const addCartItem = createAsyncThunk<CartItemType, number>(
  'cart/addItemInCart',
  async (bookId, thunkAPI) => {
    try {
      const response = await axiosInstance.post<CartItemType>(
        ApiPath.user.cart.item,
        {
          bookId,
        }
      );

      thunkAPI.dispatch(addOrUpdBook([response.data.book]));
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

export const getFavorite = createAsyncThunk<FavoriteType>(
  'favorite/getFavorite',
  async (_, thunkAPI) => {
    const response = await axiosInstance.get<FavoriteType>(
      ApiPath.user.favorites.allFavorites
    );
    const booksInFav = response.data.favoritesItems.map((item) => {
      return item.book;
    });

    thunkAPI.dispatch(addOrUpdBook(booksInFav));
    return response.data;
  }
);

export const addFavoriteItem = createAsyncThunk<FavoriteItemType, number>(
  'favorite/addItemInFavorite',
  async (bookId, thunkAPI) => {
    try {
      const response = await axiosInstance.post<FavoriteItemType>(
        ApiPath.user.favorites.item,
        {
          bookId,
        }
      );
      thunkAPI.dispatch(addOrUpdBook([response.data.book]));
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
