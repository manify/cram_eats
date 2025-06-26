import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantOwner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface RestaurantAuthState {
  user: RestaurantOwner | null;
  token: string | null;
  restaurantId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantAuthState = {
  user: null,
  token: null,
  restaurantId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const restaurantAuthSlice = createSlice({
  name: 'restaurantAuth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      user: RestaurantOwner;
      token: string;
      restaurantId: number;
    }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.restaurantId = action.payload.restaurantId;
      state.isAuthenticated = true;
      state.error = null;
      
      // Store in localStorage as backup
      localStorage.setItem('restaurantToken', action.payload.token);
      localStorage.setItem('restaurantId', action.payload.restaurantId.toString());
      localStorage.setItem('restaurantUser', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.restaurantId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      
      // Clear localStorage
      localStorage.removeItem('restaurantToken');
      localStorage.removeItem('restaurantId');
      localStorage.removeItem('restaurantUser');
    },
    initializeFromStorage: (state) => {
      const token = localStorage.getItem('restaurantToken');
      const restaurantId = localStorage.getItem('restaurantId');
      const user = localStorage.getItem('restaurantUser');
      
      if (token && restaurantId && user) {
        state.token = token;
        state.restaurantId = parseInt(restaurantId);
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  initializeFromStorage,
  clearError,
} = restaurantAuthSlice.actions;

export default restaurantAuthSlice.reducer;
