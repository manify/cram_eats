import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  originalItemId: string; // Store the original item ID separately
  name: string;
  description: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  image?: string;
  category?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  restaurant: string;
  restaurantId: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  orderTime: Date;
  estimatedDelivery?: Date;
  total: number;
  deliveryFee: number;
  subtotal: number;
  deliveryAddress: string;
  trackingSteps: {
    status: string;
    time: Date;
    description: string;
    completed: boolean;
  }[];
}

interface CartState {
  items: CartItem[];
  orders: Order[];
  
  // Actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderStatusFromAPI: (orderId: string, newStatus: Order['status'], timestamp?: Date) => void;
  fetchUserOrders: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      addToCart: (item: Omit<CartItem, 'quantity'>) => {
        set((state) => {
          const existing = state.items.find(i => i.id === item.id && i.restaurantId === item.restaurantId);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id && i.restaurantId === item.restaurantId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }]
          };
        });
      },

      removeFromCart: (id: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },      getOrderById: (orderId: string): Order | undefined => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map(order => {
            if (order.id !== orderId) return order;

            const updatedSteps = order.trackingSteps.map(step =>
              step.status === status
                ? { ...step, completed: true, time: new Date() }
                : step
            );

            return { ...order, status, trackingSteps: updatedSteps };
          })
        }));
      },

      // Helper method to update order status from API responses
      updateOrderStatusFromAPI: (orderId: string, newStatus: Order['status'], timestamp?: Date) => {
        set((state) => ({
          orders: state.orders.map(order => {
            if (order.id !== orderId) return order;

            const updateTime = timestamp || new Date();
            const updatedSteps = order.trackingSteps.map(step =>
              step.status === newStatus
                ? { ...step, completed: true, time: updateTime }
                : step
            );

            return { ...order, status: newStatus, trackingSteps: updatedSteps };
          })
        }));      },

      // Fetch user orders from backend
      fetchUserOrders: async () => {
        try {
          console.log('🔍 CartStore: Starting fetchUserOrders');
          const { useAuthStore } = await import('./authStore');
          const { user, token } = useAuthStore.getState();
          
          if (!user?.id) {
            console.warn('❌ CartStore: No user ID available for fetching orders');
            return;
          }

          if (!token) {
            console.warn('❌ CartStore: No authentication token available for fetching orders');
            return;
          }

          console.log('🔍 CartStore: Fetching orders for user:', user.id);
          const { getUserOrders } = await import('../api/orders');
          const response = await getUserOrders(user.id.toString(), {}, token);
          
          console.log('🔍 CartStore: Orders response:', response);
          
          if (response && response.orders) {            console.log('🔍 CartStore: Transforming', response.orders.length, 'orders');
            // Transform backend orders to match our Order interface
            const transformedOrders = response.orders.map((backendOrder: any) => {
              console.log('🔍 CartStore: Processing backend order:', backendOrder);
              
              // Create tracking steps based on status
              const createTrackingSteps = (status: string, timestamp: string) => {
                const orderTime = new Date(timestamp);
                const allSteps = [
                  { status: 'PENDING', description: 'Order placed successfully' },
                  { status: 'CONFIRMED', description: 'Restaurant confirmed your order' },
                  { status: 'PREPARING', description: 'Your order is being prepared' },
                  { status: 'READY', description: 'Order is ready for pickup' },
                  { status: 'OUT_FOR_DELIVERY', description: 'Order is out for delivery' },
                  { status: 'DELIVERED', description: 'Order delivered successfully' }
                ];

                return allSteps.map(step => ({
                  status: step.status,
                  time: step.status === status ? orderTime : new Date(),
                  description: step.description,
                  completed: step.status === status || (
                    step.status === 'PENDING' || 
                    (step.status === 'CONFIRMED' && ['PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(status)) ||
                    (step.status === 'PREPARING' && ['READY', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(status)) ||
                    (step.status === 'READY' && ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(status)) ||
                    (step.status === 'OUT_FOR_DELIVERY' && status === 'DELIVERED')
                  )
                }));
              };              const transformedOrder = {
                id: backendOrder.id.toString(),
                items: backendOrder.orderItems?.map((orderItem: any) => {
                  console.log('🔍 CartStore: Processing order item:', orderItem);
                  return {
                    id: orderItem.item?.id?.toString() || orderItem.itemId?.toString() || '',
                    name: orderItem.item?.name || 'Unknown Item',
                    description: orderItem.item?.description || '',
                    price: orderItem.item?.price || 0,
                    quantity: orderItem.quantity || 1,
                    restaurantId: backendOrder.restaurantId?.toString() || '',
                    restaurantName: backendOrder.restaurant?.name || 'Unknown Restaurant',
                    image: orderItem.item?.imageUrl || '',
                    category: orderItem.item?.category || ''
                  };
                }) || [],
                restaurant: backendOrder.restaurant?.name || 'Unknown Restaurant',
                restaurantId: backendOrder.restaurantId?.toString() || '',
                status: backendOrder.status?.toUpperCase() || 'PENDING',
                orderTime: new Date(backendOrder.timestamp),
                estimatedDelivery: new Date(new Date(backendOrder.timestamp).getTime() + 45 * 60 * 1000), // Add 45 mins
                total: backendOrder.totalPrice || 0,
                deliveryFee: 2.50, // Default delivery fee
                subtotal: (backendOrder.totalPrice || 0) - 2.50,deliveryAddress: backendOrder.deliveryAddress || 'No address provided',
                trackingSteps: createTrackingSteps(backendOrder.status?.toUpperCase() || 'PENDING', backendOrder.timestamp)
              };
              
              console.log('🔍 CartStore: Transformed order:', transformedOrder);
              return transformedOrder;
            });

            console.log('✅ CartStore: Setting', transformedOrders.length, 'transformed orders');
            set({ orders: transformedOrders });
          } else {
            console.log('❌ CartStore: No orders found in response');
          }
        } catch (error) {
          console.error('❌ CartStore: Failed to fetch user orders:', error);
          // Don't clear existing orders on error, just log it
        }
      },
    }),    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        // Don't persist orders since we fetch them from the database
        // orders: state.orders
      }),
      onRehydrateStorage: () => (state) => {
        // Initialize orders as empty array since we'll fetch from DB
        if (state) {
          state.orders = [];
        }
      }
    }
  )
);
