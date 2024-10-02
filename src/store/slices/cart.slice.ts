import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  showCart: boolean;
  cartItems: {
    item: {
      id: string;
      price: number;
      name: string;
    };
    quantity: number;
  }[];
} = {
  showCart: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const foodItemPresent = state.cartItems.findIndex(
        (item) => item.item.id === action.payload.id
      );
      if (foodItemPresent > -1) {
        state.cartItems[foodItemPresent].quantity += 1;
      } else {
        state.cartItems.push({ item: action.payload, quantity: 1 });
      }
      return state;
    },
    removeFromCart: (state, action) => {
      const foodItemPresent = state.cartItems.findIndex(
        (item) => item.item.id === action.payload.id
      );
      if (foodItemPresent > -1) {
        if (state.cartItems[foodItemPresent].quantity > 1) {
          state.cartItems[foodItemPresent].quantity -= 1;
        } else {
          state.cartItems.splice(foodItemPresent, 1);
        }
      }
      return state;
    },
    checkoutFromCart: (state) => {
      // checkout
      state.cartItems = [];
      return state;
    },

    toggleCart: (state, action) => {
      state.showCart = action.payload.isOpen;
    },
  },
});

export const { addToCart, checkoutFromCart, removeFromCart, toggleCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
