import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { cartReducer } from './slices/cart.slice';
import { restaurantReducer } from './slices/restaurant.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
});
