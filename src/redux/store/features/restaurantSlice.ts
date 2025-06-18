import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  menu: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }>;
}

interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.selectedRestaurant = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRestaurants, setSelectedRestaurant, setLoading, setError } = restaurantSlice.actions;
export default restaurantSlice.reducer;