import { createSlice } from '@reduxjs/toolkit';
import { Restaurant } from '../../types/restaurant';

interface RestaurantSliceState {
  coordinates: GeolocationCoordinates | null;
  address: string | null;
  restaurants: Restaurant[];
}

const initialState: RestaurantSliceState = {
  coordinates: null,
  address: null,
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: initialState,
  reducers: {
    addRestaurants: (state, action) => {
      state.restaurants = action.payload ?? [];
      return state;
    },

    updateCurrentLocation: (state, action) => {
      state.address = action.payload.address;
      state.coordinates = action.payload.coordinates;
    },

    addRestaurant: (state, action) => {
      const restaurantIndex = state.restaurants.findIndex(
        (val) => val._id === action.payload._id
      );
      if (restaurantIndex > -1) {
        state.restaurants[restaurantIndex] = action.payload;
      } else {
        state.restaurants.push(action.payload);
      }
      return state;
    },
  },
});

export const { addRestaurants, addRestaurant, updateCurrentLocation } =
  restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;
