export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  driverId?: string;
  driverName?: string;
  deliveryAddress: string;
  orderStatus: OrderStatus;
  orderTime: string;
  items: OrderItem[];
  totalAmount: number;
}

export type OrderStatus = 
  | 'PLACED'           // Customer placed the order
  | 'CONFIRMED'        // Restaurant confirmed the order
  | 'PREPARING'        // Restaurant is preparing
  | 'READY'           // Ready for driver pickup
  | 'DRIVER_ASSIGNED'  // Driver accepted the order
  | 'PICKED_UP'       // Driver picked up from restaurant
  | 'DELIVERING'       // Driver is delivering
  | 'DELIVERED'        // Order delivered
  | 'CANCELLED'        // Order cancelled
  | 'REJECTED';        // Order rejected by restaurant/driver

export class OrderManagement {
  private static orders: Order[] = [];

  // Customer methods
  static async placeOrder(order: Omit<Order, 'id' | 'orderStatus' | 'orderTime'>): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      orderStatus: 'PLACED',
      orderTime: new Date().toISOString(),
      driverId: undefined,
      driverName: undefined
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  // Restaurant methods
  static async getRestaurantOrders(restaurantId: string): Promise<Order[]> {
    return this.orders.filter(order => 
      order.restaurantId === restaurantId && 
      ['PLACED', 'CONFIRMED', 'PREPARING', 'READY'].includes(order.orderStatus)
    );
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.orderStatus = status;
    return order;
  }

  // Driver methods
  static async getAvailableOrders(): Promise<Order[]> {
    return this.orders.filter(order => 
      order.orderStatus === 'READY' && !order.driverId
    );
  }

  static async assignDriver(orderId: string, driverId: string, driverName: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.driverId = driverId;
    order.driverName = driverName;
    order.orderStatus = 'DRIVER_ASSIGNED';
    return order;
  }

  // Customer methods to track order
  static async getCustomerOrders(customerId: string): Promise<Order[]> {
    return this.orders.filter(order => order.customerId === customerId);
  }

  // Get specific order
  static async getOrder(orderId: string): Promise<Order | undefined> {
    return this.orders.find(o => o.id === orderId);
  }
}