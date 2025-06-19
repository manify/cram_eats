import { authApiClient } from './client';
import { CreateOrderRequest, CreateOrderResponse } from '../types/api';
import { useAuthStore } from '../stores/authStore';

/**
 * Create a new order
 * @param orderData - The order data including userId, restaurantId, totalPrice, and items
 * @returns Promise containing the created order response
 */
export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await authApiClient.post('/orderservice/orders', orderData, {
      headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
    return response.data;
  } catch (error: any) {
    console.error('Create order error:', error);
    throw error;
  }
};

/**
 * Get orders for a specific user
 * @param userId - The user ID to get orders for
 * @param options - Optional query parameters like page, limit, status
 */
export const getUserOrders = async (userId: string, options: { page?: number; limit?: number; status?: string } = {}) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page.toString());
    if (options.limit) queryParams.append('limit', options.limit.toString());
    if (options.status) queryParams.append('status', options.status);

    const response = await authApiClient.get(`/orderservice/orders/user/${userId}?${queryParams.toString()}`, {
      headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });

    return response.data;
  } catch (error: any) {
    console.error('Get user orders error:', error);
    throw error;
  }
};

/**
 * Get a specific order by ID
 * @param orderId - The order ID to fetch
 */
export const getOrder = async (orderId: string) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await authApiClient.get(`/orderservice/orders/${orderId}`, {
      headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });

    return response.data;
  } catch (error: any) {
    console.error('Get order error:', error);
    throw error;
  }
};

/**
 * Get the authentication token from the auth store or localStorage
 */
const getAuthToken = (): string => {
  // Try to get token from the auth store first
  const authStore = useAuthStore.getState();
  let token = authStore.getToken();

  if (!token) {
    // Fallback to localStorage
    token = localStorage.getItem('authToken');
  }

  if (!token) {
    // Try to get token from cookies as final fallback
    token = getCookieValue('authToken') || getCookieValue('token');
  }

  if (!token) {
    console.warn('No authentication token found');
    return '';
  }

  return token;
};

/**
 * Helper function to get cookie value by name
 */
const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export default { createOrder, getUserOrders, getOrder };
