import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  profilePic: null,
  fullName: null,
  email: null,
  userId: null,
  accessToken: null,
  isLoggedIn: false,
};

const loadAuthData = () => {
  try {
    return JSON.parse(localStorage.getItem('auth') ?? '');
  } catch (err) {
    console.error('user details not found.');
    return initialAuthState;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthData,
  reducers: {
    loginUser: (state, action) => {
      // action : { type: "loginUser", payload: }

      if (action.payload.accessToken && action.payload.email) {
        state = action.payload;

        state.isLoggedIn = true;
        localStorage.setItem('auth', JSON.stringify(state));
      }
      return state;
    },
    logoutUser: (state) => {
      state = initialAuthState;
      localStorage.removeItem('auth');
      return state;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
