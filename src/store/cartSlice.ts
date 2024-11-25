import { createSlice } from '@reduxjs/toolkit';

import {
  addCartItem,
  deleteCartItem,
  downAmountCartItem,
  getCart,
  upAmountCartItem,
} from './thunk';
import { cartItemType, cartState } from '../lib/types';

const initialState: cartState = {
  cart: null,
  normalizeCart: {},
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        const booksInCart = state.cart?.cartItems.reduce<
          Record<number, cartItemType>
        >((result, current) => {
          result[current.book.id] = current;
          return result;
        }, {});
        if (booksInCart) state.normalizeCart = booksInCart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.normalizeCart !== null) {
          state.normalizeCart[action.payload.book.id] = action.payload;
        }
        console.log(action.payload);
        state.cart?.cartItems.push(action.payload);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(upAmountCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upAmountCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.cart?.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex !== -1 && state.cart && itemIndex !== undefined) {
          state.cart.cartItems[itemIndex].quantity = action.payload.quantity;
          const addPrice =
            action.payload.total_price -
            state.cart.cartItems[itemIndex].total_price;
          state.cart.cartItems[itemIndex].total_price =
            action.payload.total_price;
          state.cart.total_price += addPrice;
        } else {
          console.error('Item not found in cart:', action.payload.id);
        }
      })
      .addCase(upAmountCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downAmountCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downAmountCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.cart?.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex !== -1 && state.cart && itemIndex !== undefined) {
          state.cart.cartItems[itemIndex].quantity = action.payload.quantity;
          const lessPrice =
            state.cart.cartItems[itemIndex].total_price -
            action.payload.total_price;
          state.cart.cartItems[itemIndex].total_price =
            action.payload.total_price;
          state.cart.total_price -= lessPrice;
        } else {
          console.error('Item not found in cart:', action.payload.id);
        }
      })
      .addCase(downAmountCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.cart?.cartItems.findIndex(
          (item) => item.id === action.payload
        );
        if (itemIndex !== -1 && state.cart && itemIndex !== undefined) {
          const sum = state.cart.cartItems[itemIndex].total_price;
          const idBook = state.cart.cartItems[itemIndex].book.id;
          state.cart.cartItems = state.cart.cartItems.filter((item) => {
            return item.id !== action.payload;
          });
          state.cart.total_price -= sum;
          if (state.normalizeCart && state.normalizeCart[idBook]) {
            delete state.normalizeCart[idBook];
          }
        } else {
          console.error('Item not found in cart:', action.payload);
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
