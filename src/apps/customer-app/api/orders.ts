import { authApiClient } from './client';
import { CreateOrderRequest, CreateOrderResponse } from '../types/api';
import { useAuthStore } from '../stores/authStore';

/**
 * Create a new order
 * @param orderData - The order data including userId, restaurantId, totalPrice, and items
 * @param token - Optional authentication token, if not provided will try to get from storage
 * @returns Promise containing the created order response
 */
export const createOrder = async (orderData: CreateOrderRequest, token?: string): Promise<CreateOrderResponse> => {
  try {
    const authToken = token || getAuthToken();
    console.log('Creating order with token:', !!authToken);
    console.log('Order data:', orderData);
    
    if (!authToken) {
      throw new Error('Authentication token is required. Please sign in again.');
    }

    const response = await authApiClient.post('/orderservice/orders', orderData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Order creation response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Create order error:', error);
      // Provide more detailed error messages
    if (error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Request config:', error.config);
      console.error('Request data sent:', error.config?.data);
      
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please sign in again.');
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Invalid order data provided.';
        console.error('Backend validation error details:', error.response.data);
        throw new Error(errorMessage);
      } else if (error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    
    throw error;
  }
};

/**
 * Get orders for a specific user
 * @param userId - The user ID to get orders for
 * @param options - Optional query parameters like page, limit, status
 * @param token - Optional authentication token, if not provided will try to get from storage
 */
export const getUserOrders = async (
  userId: string, 
  options: { page?: number; limit?: number; status?: string } = {},
  token?: string
) => {
  try {
    const authToken = token || getAuthToken();
    console.log('🔍 Getting user orders with token:', !!authToken);
    console.log('🔍 User ID:', userId);
    
    if (!authToken) {
      throw new Error('Authentication token is required');
    }    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page.toString());
    if (options.limit) queryParams.append('limit', options.limit.toString());
    if (options.status) queryParams.append('status', options.status);

    const queryString = queryParams.toString();
    const url = `/orderservice/users/${userId}/orders${queryString ? `?${queryString}` : ''}`;
    console.log('🔍 Making request to:', url);
    console.log('🔍 Full URL will be:', `${authApiClient.defaults.baseURL}${url}`);

    const response = await authApiClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('🔍 Raw response status:', response.status);
    console.log('🔍 Raw response headers:', response.headers);
    console.log('🔍 Raw response data:', response.data);
    console.log('🔍 Response data type:', typeof response.data);
    console.log('🔍 Response data keys:', Object.keys(response.data || {}));
    
    return response.data;
  } catch (error: any) {
    console.error('❌ Get user orders error:', error);
    
    // Provide more detailed error messages
    if (error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response status:', error.response.status);
      
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please sign in again.');
      } else if (error.response.status === 404) {
        throw new Error('No orders found for this user.');
      } else if (error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    
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
    }    const response = await authApiClient.get(`/orderservice/orders/${orderId}`, {
      headers: {
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
  let token = authStore.token || authStore.getToken();
  console.log('🔍 Token from authStore:', token);

  if (!token) {
    // Fallback to localStorage
    token = localStorage.getItem('authToken');
    console.log('🔍 Token from localStorage:', token);
  }

  if (!token) {
    // Try to get token from zustand persisted storage
    try {
      const authData = localStorage.getItem('auth-storage');
      console.log('🔍 Auth storage data exists:', !!authData);
      if (authData) {
        const parsed = JSON.parse(authData);
        token = parsed.state?.token;
        console.log('🔍 Token from auth storage:', token);
      }
    } catch (e) {
      console.warn('Failed to parse auth storage');
    }
  }

  if (!token) {
    // Try to get token from cookies as final fallback
    token = getCookieValue('authToken') || getCookieValue('token');
    console.log('🔍 Token from cookies:', token);
  }

  if (!token) {
    console.warn('❌ No authentication token found');
    console.log('🔍 Auth store state:', authStore);
    console.log('🔍 localStorage authToken:', localStorage.getItem('authToken'));
    return '';
  }

  console.log('✅ Found token:', !!token);
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
