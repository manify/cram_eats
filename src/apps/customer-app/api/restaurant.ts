import apiClient from './client';
import { RestaurantsResponse, RestaurantDetail } from '../types/api';

export const restaurantApi = {
  getRestaurants: async (page: number = 1, limit: number = 10): Promise<RestaurantsResponse> => {
    console.log(`API: Fetching restaurants - Page: ${page}, Limit: ${limit}`);
    // Use the simple API client (no auth required)
    const response = await apiClient.get('/crameats/get/restaurants/', {
      params: { page, limit }
    });
    console.log(`API: Received ${response.data?.restaurants?.length || 0} restaurants`);
    return response.data;
  },
  
  getRestaurantById: async (id: number): Promise<RestaurantDetail> => {
    console.log(`API: Fetching restaurant details for ID: ${id}`);
    // Use the simple API client (no auth required)
    const response = await apiClient.get(`/crameats/restaurants/${id}`);
    console.log(`API: Received restaurant details for: ${response.data?.name || 'Unknown'}`);
    return response.data;
  }
};
