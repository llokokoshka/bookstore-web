import { createSlice } from '@reduxjs/toolkit';

import {
  getCart,
  addCartItem,
  upAmountCartItem,
  downAmountCartItem,
  deleteCartItem,
} from './cartThunk';
import { ICartState } from './cartTypes';

const initialState: ICartState = {
  cart: null,
  booksIdsInCart: [],
  numberOfItemsInCart: 0,
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cleanCart: (state) => {
      state.cart = null;
      state.booksIdsInCart = [];
      state.numberOfItemsInCart = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        const numberOfItemsInCart = action.payload.cartItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        );
        state.numberOfItemsInCart = numberOfItemsInCart;

        const booksInCart = state.cart?.cartItems.map((item) => {
          return item.book;
        });

        if (booksInCart) state.booksIdsInCart = booksInCart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.booksIdsInCart.length > 0) {
          state.booksIdsInCart.push(action.payload.book);
        } else {
          state.booksIdsInCart = [action.payload.book];
        }
        state.cart?.cartItems.push(action.payload);
        if (
          state.cart &&
          (state.cart.total_price || state.cart.total_price === 0)
        ) {
          state.cart.total_price += action.payload.total_price;
        }
        state.numberOfItemsInCart += 1;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
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
        if (itemIndex !== -1 && state.cart && (itemIndex || itemIndex === 0)) {
          state.cart.cartItems[itemIndex].quantity = action.payload.quantity;
          const addPrice =
            action.payload.total_price -
            state.cart.cartItems[itemIndex].total_price;
          state.cart.cartItems[itemIndex].total_price =
            action.payload.total_price;
          state.cart.total_price += addPrice;
          if (action.meta.arg.quantity < action.payload.quantity) {
            state.numberOfItemsInCart += 1;
          }
        } else {
          console.error('Item not found in cart:', action.payload.id);
        }
      })
      .addCase(upAmountCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
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
        if (itemIndex !== -1 && state.cart && (itemIndex || itemIndex === 0)) {
          state.cart.cartItems[itemIndex].quantity = action.payload.quantity;
          const lessPrice =
            state.cart.cartItems[itemIndex].total_price -
            action.payload.total_price;
          state.cart.cartItems[itemIndex].total_price =
            action.payload.total_price;
          state.cart.total_price -= lessPrice;
          state.numberOfItemsInCart -= 1;
        } else {
          console.error('Item not found in cart:', action.payload.id);
        }
      })
      .addCase(downAmountCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
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
        if (itemIndex !== -1 && state.cart && (itemIndex || itemIndex === 0)) {
          const sum = state.cart.cartItems[itemIndex].total_price;
          const colOfItemsInCart = state.cart.cartItems[itemIndex].quantity;
          const idBook = state.cart.cartItems[itemIndex].book;
          state.cart.cartItems = state.cart.cartItems.filter((item) => {
            return item.id !== action.payload;
          });
          state.cart.total_price -= sum;
          if (state.numberOfItemsInCart > 0) {
            state.numberOfItemsInCart -= colOfItemsInCart;
          }
          if (
            state.booksIdsInCart &&
            state.booksIdsInCart.find((item) => item === idBook)
          ) {
            delete state.booksIdsInCart[
              state.booksIdsInCart.findIndex((item) => item === idBook)
            ];
          }
        } else {
          console.error('Item not found in cart:', action.payload);
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
