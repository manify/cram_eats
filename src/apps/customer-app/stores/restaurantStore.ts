import { create } from 'zustand';
import { Restaurant, RestaurantsResponse, RestaurantDetail } from '../types/api';
import { restaurantApi } from '../api/restaurant';

// Keep track of ongoing requests to prevent duplicates
let restaurantsController: AbortController | null = null;
let restaurantDetailController: AbortController | null = null;

interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: RestaurantDetail | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  lastFetchTime: number | null;
  
  // Actions
  fetchRestaurants: (page?: number, limit?: number, force?: boolean) => Promise<void>;
  fetchRestaurantById: (id: number) => Promise<void>;
  setSelectedRestaurant: (restaurant: RestaurantDetail | null) => void;
  clearError: () => void;
  clearRestaurants: () => void;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  selectedRestaurant: null,
  pagination: null,
  isLoading: false,
  isLoadingDetail: false,
  error: null,
  lastFetchTime: null,
  
  fetchRestaurants: async (page = 1, limit = 10, force = false) => {
    const state = get();
    
    // Prevent multiple concurrent requests
    if (state.isLoading && !force) {
      console.log('Restaurant fetch already in progress, skipping...');
      return;
    }
    
    // Cache for 30 seconds unless forced
    const now = Date.now();
    if (!force && state.lastFetchTime && (now - state.lastFetchTime < 30000) && state.restaurants.length > 0) {
      console.log('Using cached restaurants data');
      return;
    }
    
    // Cancel any existing request
    if (restaurantsController) {
      restaurantsController.abort();
    }
    restaurantsController = new AbortController();
    
    set({ isLoading: true, error: null });
    
    try {
      console.log('Fetching restaurants from API...');
      const response: RestaurantsResponse = await restaurantApi.getRestaurants(page, limit);
      
      // Check if request was cancelled
      if (restaurantsController.signal.aborted) {
        return;
      }
      
      set({
        restaurants: response.restaurants,
        pagination: response.pagination,
        isLoading: false,
        error: null,
        lastFetchTime: now
      });
      
      console.log(`Successfully fetched ${response.restaurants.length} restaurants`);
    } catch (error: any) {
      // Check if request was cancelled
      if (restaurantsController.signal.aborted) {
        return;
      }
      
      console.error('Failed to fetch restaurants:', error);
      let errorMessage = 'Failed to fetch restaurants';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - please check your connection and try again';
      } else if (error.response?.status === 404) {
        errorMessage = 'Restaurant service not available';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      set({
        restaurants: [],
        pagination: null,
        isLoading: false,
        error: errorMessage,
        lastFetchTime: null
      });
    } finally {
      restaurantsController = null;
    }
  },  fetchRestaurantById: async (id: number) => {
    const state = get();
    
    // Prevent multiple concurrent requests for the same restaurant
    if (state.isLoadingDetail) {
      console.log('Restaurant detail fetch already in progress, skipping...');
      return;
    }
    
    // Cancel any existing request
    if (restaurantDetailController) {
      restaurantDetailController.abort();
    }
    restaurantDetailController = new AbortController();
    
    set({ isLoadingDetail: true, error: null });
    
    try {
      console.log(`Fetching restaurant details for ID: ${id}...`);
      const restaurant: RestaurantDetail = await restaurantApi.getRestaurantById(id);
      
      // Check if request was cancelled
      if (restaurantDetailController.signal.aborted) {
        return;
      }
      
      set({
        selectedRestaurant: restaurant,
        isLoadingDetail: false,
        error: null
      });
      
      console.log(`Successfully fetched restaurant details for: ${restaurant.name}`);
    } catch (error: any) {
      // Check if request was cancelled
      if (restaurantDetailController.signal.aborted) {
        return;
      }
      
      console.error('Failed to fetch restaurant details:', error);
      let errorMessage = 'Failed to fetch restaurant details';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - please check your connection and try again';
      } else if (error.response?.status === 404) {
        errorMessage = 'Restaurant not found';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      set({
        selectedRestaurant: null,
        isLoadingDetail: false,
        error: errorMessage
      });
    } finally {
      restaurantDetailController = null;
    }
  },

  setSelectedRestaurant: (restaurant: RestaurantDetail | null) => {
    set({ selectedRestaurant: restaurant });
  },

  clearError: () => {
    set({ error: null });
  },
  clearRestaurants: () => {
    // Cancel any ongoing requests
    if (restaurantsController) {
      restaurantsController.abort();
      restaurantsController = null;
    }
    if (restaurantDetailController) {
      restaurantDetailController.abort();
      restaurantDetailController = null;
    }
    
    set({ 
      restaurants: [], 
      selectedRestaurant: null, 
      pagination: null, 
      error: null,
      lastFetchTime: null
    });
  }
}));
