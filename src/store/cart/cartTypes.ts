import { BookType } from '../../lib/types';

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
export type CartItemNormalizeType = {
  id: number;
  total_price: number;
  quantity: number;
  book: number;
};

export type CartNormalizeType = {
  id: number;
  total_price: number;
  cartItems: CartItemNormalizeType[];
};

export interface ICartState {
  cart: CartNormalizeType | null;
  booksIdsInCart: number[];
  numberOfItemsInCart: number;
  loading: boolean;
  error: string | null;
}
