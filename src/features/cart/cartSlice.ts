/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

export interface CartItemType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartState {
  cart: CartItemType[];
}
const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: any) => state.cart.cart;

export const getTotalCartQuantity = (state: any) =>
  state.cart.cart.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0,
  );

export const getTotalCartPrice = (state: any) =>
  state.cart.cart.reduce(
    (sum: number, item: { totalPrice: number }) => sum + item.totalPrice,
    0,
  );

export const getCurrentQuantityById = (id: number) => (state: any) =>
  state.cart.cart.find((item: { pizzaId: number }) => item.pizzaId === id)
    ?.quantity ?? 0;
