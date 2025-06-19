import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
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
  placeOrder: (deliveryAddress: string) => string;
  getOrderById: (orderId: string) => Order | undefined;  updateOrderStatus: (orderId: string, status: Order['status']) => void;
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
      },      placeOrder: (deliveryAddress: string): string => {
        const { items, orders } = get();
        if (items.length === 0) return '';

        const orderId = `ORD-${Date.now()}`;
        const orderTime = new Date();
        const estimatedDelivery = new Date(orderTime.getTime() + 45 * 60 * 1000); // 45 mins
        const subtotal = get().getCartTotal();
        const deliveryFee = 2.50;
        const total = subtotal + deliveryFee;

        // Create new order with PENDING status (default for all new orders)
        const newOrder: Order = {id: orderId,
          items: [...items],
          restaurant: items[0].restaurantName,
          restaurantId: items[0].restaurantId,
          status: 'PENDING',
          orderTime,
          estimatedDelivery,
          total,
          deliveryFee,
          subtotal,
          deliveryAddress,
          trackingSteps: [
            { status: 'PENDING', time: orderTime, description: 'Order placed successfully', completed: true },
            { status: 'CONFIRMED', time: new Date(), description: 'Restaurant confirmed your order', completed: false },
            { status: 'PREPARING', time: new Date(), description: 'Your order is being prepared', completed: false },
            { status: 'READY', time: new Date(), description: 'Order is ready for pickup', completed: false },
            { status: 'OUT_FOR_DELIVERY', time: new Date(), description: 'Order is out for delivery', completed: false },
            { status: 'DELIVERED', time: new Date(), description: 'Order delivered successfully', completed: false }
          ]
        };        set({
          orders: [newOrder, ...orders],
          items: []
        });

        // TODO: In production, status updates will come from your backend API
        // For demo purposes, you can uncomment these lines to simulate status progression:
        
        // setTimeout(() => get().updateOrderStatus(orderId, 'CONFIRMED'), 2000);
        // setTimeout(() => get().updateOrderStatus(orderId, 'PREPARING'), 5000);
        // setTimeout(() => get().updateOrderStatus(orderId, 'READY'), 10000);
        // setTimeout(() => get().updateOrderStatus(orderId, 'OUT_FOR_DELIVERY'), 15000);

        return orderId;
      },

      getOrderById: (orderId: string): Order | undefined => {
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
        }));
      },

      // Fetch user orders from backend
      fetchUserOrders: async () => {
        try {
          const { useAuthStore } = await import('./authStore');
          const { user } = useAuthStore.getState();
          
          if (!user?.id) {
            console.warn('No user ID available for fetching orders');
            return;
          }

          const { getUserOrders } = await import('../api/orders');
          const response = await getUserOrders(user.id.toString());
          
          if (response && response.orders) {
            // Transform backend orders to match our Order interface
            const transformedOrders = response.orders.map((backendOrder: any) => ({
              id: backendOrder.id.toString(),
              userId: backendOrder.userId,
              restaurantId: backendOrder.restaurantId,
              items: backendOrder.orderItems?.map((item: any) => ({
                id: item.item.id,
                name: item.item.name,
                price: item.item.price,
                quantity: item.quantity,
                imageUrl: item.item.imageUrl
              })) || [],
              totalPrice: backendOrder.totalPrice,
              status: backendOrder.status,
              timestamp: new Date(backendOrder.timestamp),
              restaurant: backendOrder.restaurant ? {
                name: backendOrder.restaurant.name,
                id: backendOrder.restaurant.id
              } : undefined
            }));

            set({ orders: transformedOrders });
          }
        } catch (error) {
          console.error('Failed to fetch user orders:', error);
        }
      },
    }),
    {
      name: 'cart-storage',      partialize: (state) => ({
        items: state.items,
        orders: state.orders
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.orders) {
          state.orders = state.orders.map((order: any) => ({
            ...order,
            orderTime: new Date(order.orderTime),
            estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
            trackingSteps: order.trackingSteps?.map((step: any) => ({
              ...step,
              time: new Date(step.time)
            })) || []
          }));
        }
      }
    }
  )
);
