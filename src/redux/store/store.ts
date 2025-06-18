import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';
import restaurantReducer from './features/restaurantSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    restaurants: restaurantReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;