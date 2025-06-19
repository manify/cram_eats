import { useState } from 'react';
import { createOrder } from '../api/orders';
import { CreateOrderRequest, CreateOrderResponse } from '../types/api';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook to create an order with error handling and loading states
 */
export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const submitOrder = async (
    restaurantId: number,
    totalPrice: number,
    items: Array<{ itemId: number; quantity: number }>
  ): Promise<CreateOrderResponse | null> => {
    if (!user) {
      setError('User must be authenticated to create an order');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderData: CreateOrderRequest = {
        userId: user.id,
        restaurantId,
        totalPrice,
        items
      };

      const response = await createOrder(orderData);
      console.log('Order created successfully:', response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create order';
      setError(errorMessage);
      console.error('Failed to create order:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitOrder,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};

/**
 * Direct function to create an order (without hooks)
 * Use this in non-component contexts
 */
export const createOrderDirect = async (
  restaurantId: number,
  totalPrice: number,
  items: Array<{ itemId: number; quantity: number }>
): Promise<CreateOrderResponse> => {
  const { user } = useAuthStore.getState();
  
  if (!user) {
    throw new Error('User must be authenticated to create an order');
  }

  const orderData: CreateOrderRequest = {
    userId: user.id,
    restaurantId,
    totalPrice,
    items
  };

  return createOrder(orderData);
};

export default { useCreateOrder, createOrderDirect };
