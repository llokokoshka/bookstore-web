import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCartApi,
  addCartItemApi,
  changeAmountItemInCartApi,
  deteleItemInCartApi,
} from '../../api/userApi';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';
import { CartNormalizeType, CartItemNormalizeType } from '../../lib/cartTypes';

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
