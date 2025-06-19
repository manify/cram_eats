export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MenuItem {
  id: number;
  itemId: string;
  name: string;
  restaurantId: number;
  price: number;
  status: string;
  imageUrl: string;
}

export interface MenuCategory {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  items: {
    menuId: number;
    itemId: number;
    item: MenuItem;
  }[];
}

export interface RestaurantDetail {
  id: number;
  userId: number;
  name: string;
  user: User;
  menu: MenuCategory[];
  location: string | null;
}

export interface Restaurant {
  id: number;
  userId: number;
  name: string;
  user: User;
  _count: {
    menu: number;
    orders: number;
  };
  location: string | null;
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data: {
    user: User;
    expiresIn: string;
  };
}

// Order types
export interface OrderItem {
  itemId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: number;
  restaurantId: number;
  totalPrice: number;
  items: OrderItem[];
}

export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  status: string;
  timestamp: string;
  totalPrice: number;
}

export interface CreateOrderResponse {
  success: boolean;
  order: Order;
}
