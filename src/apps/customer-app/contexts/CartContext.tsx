import React, { createContext, useContext, useState, useEffect } from 'react';

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
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
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

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  placeOrder: (deliveryAddress: string) => string;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');

    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }

    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        orderTime: new Date(order.orderTime),
        estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
        trackingSteps: order.trackingSteps.map((step: any) => ({
          ...step,
          time: new Date(step.time),
        })),
      }));
      setOrders(parsedOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.restaurantId === item.restaurantId);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.restaurantId === item.restaurantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getCartTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCartItemCount = () =>
    items.reduce((count, item) => count + item.quantity, 0);

  const placeOrder = (deliveryAddress: string): string => {
    if (items.length === 0) return '';

    const orderId = `ORD-${Date.now()}`;
    const orderTime = new Date();
    const estimatedDelivery = new Date(orderTime.getTime() + 45 * 60 * 1000); // 45 mins
    const subtotal = getCartTotal();
    const deliveryFee = 2.50;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: orderId,
      items: [...items],
      restaurant: items[0].restaurantName,
      restaurantId: items[0].restaurantId,
      status: 'pending',
      orderTime,
      estimatedDelivery,
      total,
      deliveryFee,
      subtotal,
      deliveryAddress,
      trackingSteps: [
        { status: 'pending', time: orderTime, description: 'Order placed successfully', completed: true },
        { status: 'confirmed', time: new Date(), description: 'Restaurant confirmed your order', completed: false },
        { status: 'preparing', time: new Date(), description: 'Your order is being prepared', completed: false },
        { status: 'out_for_delivery', time: new Date(), description: 'Order is out for delivery', completed: false },
        { status: 'delivered', time: new Date(), description: 'Order delivered successfully', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Simulate progression
    setTimeout(() => updateOrderStatus(orderId, 'confirmed'), 2000);
    setTimeout(() => updateOrderStatus(orderId, 'preparing'), 5000);
    setTimeout(() => updateOrderStatus(orderId, 'out_for_delivery'), 15000);

    return orderId;
  };

  const getOrderById = (orderId: string): Order | undefined =>
    orders.find(order => order.id === orderId);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        const updatedSteps = order.trackingSteps.map(step =>
          step.status === status
            ? { ...step, completed: true, time: new Date() }
            : step
        );

        return { ...order, status, trackingSteps: updatedSteps };
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        placeOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
