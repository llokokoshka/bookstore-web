//@ts-ignore
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AddCommentThunkType,
  CommentsType,
  RatingThunkType,
  ICatalog,
  IFormReg,
  IUserResponseData,
  QueryParamsType,
  IUserRating,
  BookType,
  CartNormalizeType,
  CartItemNormalizeType,
  FavoriteNormalizeType,
  FavoriteItemNormalizeType,
  IRecommendedThunk,
} from '../lib/types';
import { AppPages } from '../constants/textConstants';
import { addOrUpdBook } from './booksEntitiesSlice';
import { loginUserApi, regUserApi } from '../api/authApi';
import {
  addCartItemApi,
  changeAmountItemInCartApi,
  deteleItemInCartApi,
  getCartApi,
  getUserApi,
  getFavoriteApi,
  addFavoriteItemApi,
  deleteFavoriteItemApi,
} from '../api/userApi';
import {
  addCommentApi,
  addRateApi,
  getAllCommentsApi,
  getAvarageRatingApi,
  getBookByIdApi,
  getBookRatingApi,
  getCatalogApi,
  getRatingApi,
  getRecommendedApi,
  getSearchedApi,
} from '../api/bookApi';

export const loginUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.login,
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginUserApi(email, password);

      const { access_token, refresh_token } = data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const regUser = createAsyncThunk<IUserResponseData, IFormReg>(
  AppPages.registration,
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await regUserApi(email, password);

      const { access_token, refresh_token } = data;

      localStorage.setItem('access', access_token);
      localStorage.setItem('refresh', refresh_token);

      return data;
    } catch (err: any) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk<IUserResponseData>(
  AppPages.profile,
  async (_, thunkAPI) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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
      let book = await getBookByIdApi(bookId);
      return book;
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
      const { pageNum, genres, minPrice, maxPrice, sortBy, search } = data;

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

      if (search) {
        strOfSearch += `&search=${search}`;
      }
      const catalog = await getCatalogApi(strOfSearch);

      const arrayWithBooks = catalog.data;
      if (arrayWithBooks) {
        thunkAPI.dispatch(addOrUpdBook(arrayWithBooks));

        const ratings = await Promise.all(
          arrayWithBooks.map((book) => getRatingApi(book.id))
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
        meta: catalog.meta,
      };

      return newDataForCatalog;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getSearched = createAsyncThunk<IRecommendedThunk>(
  'books/searched',
  async (_, thunkAPI) => {
    try {
      const data = await getSearchedApi();
      thunkAPI.dispatch(addOrUpdBook(data.books));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getRecommended = createAsyncThunk<IRecommendedThunk>(
  'books/recommended',
  async (_, thunkAPI) => {
    try {
      const data = await getRecommendedApi();
      thunkAPI.dispatch(addOrUpdBook(data.books));
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

export const getCart = createAsyncThunk<CartNormalizeType>(
  'cart/getCart',
  async (_, thunkAPI) => {
    const data = await getCartApi();

    const booksInCart = data.cartItems.map((item) => {
      return item.book;
    });
    thunkAPI.dispatch(addOrUpdBook(booksInCart));
    const arrayWithCartItems = data.cartItems;
    const newArrWithBookIds = arrayWithCartItems
      ? arrayWithCartItems.map((item) => {
          const bookId = item.book.id;
          return { ...item, book: bookId };
        })
      : null;
    const newData = {
      ...data,
      cartItems: newArrWithBookIds ? newArrWithBookIds : [],
    };
    return newData;
  }
);

export const addCartItem = createAsyncThunk<CartItemNormalizeType, number>(
  'cart/addItemInCart',
  async (bookId, thunkAPI) => {
    try {
      const data = await addCartItemApi(bookId);

      thunkAPI.dispatch(addOrUpdBook([data.book]));
      const newData = {
        ...data,
        book: data.book.id,
      };
      return newData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const upAmountCartItem = createAsyncThunk<CartItemNormalizeType, number>(
  'cart/upAmountCartItem',
  async (ItemId, thunkAPI) => {
    try {
      const action = true;
      const data = await changeAmountItemInCartApi(ItemId, action);
      const newData = {
        ...data,
        book: data.book.id,
      };
      return newData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const downAmountCartItem = createAsyncThunk<
  CartItemNormalizeType,
  number
>('cart/downAmountCartItem', async (ItemId, thunkAPI) => {
  try {
    const action = false;
    const data = await changeAmountItemInCartApi(ItemId, action);
    const newData = {
      ...data,
      book: data.book.id,
    };
    return newData;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deleteCartItem = createAsyncThunk(
  'cart/deleteItemInCart',
  async (ItemId: number, thunkAPI) => {
    try {
      const data = await deteleItemInCartApi(ItemId);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getFavorite = createAsyncThunk<FavoriteNormalizeType>(
  'favorite/getFavorite',
  async (_, thunkAPI) => {
    const data = await getFavoriteApi();
    const booksInFav = data.favoritesItems.map((item) => {
      return item.book;
    });

    thunkAPI.dispatch(addOrUpdBook(booksInFav));

    const arrayWithFavItems = data.favoritesItems;

    const newArrWithBookIds = arrayWithFavItems
      ? arrayWithFavItems.map((item) => {
          const bookId = item.book.id;
          return { ...item, book: bookId };
        })
      : null;

    const newData = {
      ...data,
      favoritesItems: newArrWithBookIds ? newArrWithBookIds : [],
    };

    return newData;
  }
);

export const addFavoriteItem = createAsyncThunk<
  FavoriteItemNormalizeType,
  number
>('favorite/addItemInFavorite', async (bookId, thunkAPI) => {
  try {
    const data = await addFavoriteItemApi(bookId);
    thunkAPI.dispatch(addOrUpdBook([data.book]));
    const newData = {
      ...data,
      book: data.book.id,
    };
    return newData;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deleteFavoriteItem = createAsyncThunk(
  'favorite/deleteItemFromFavorite',
  async (ItemId: number, thunkAPI) => {
    try {
      const data = await deleteFavoriteItemApi(ItemId);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
