// Restaurant API response types
export interface RestaurantMenuItem {
  id: number;
  itemId: string;
  name: string;
  restaurantId: number;
  price: number;
  status: 'available' | 'unavailable';
  imageUrl: string | null;
  description?: string;
  category?: string;
}

export interface MenuItemAssociation {
  menuId: number;
  itemId: number;
  item: RestaurantMenuItem;
}

export interface RestaurantMenu {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  items: MenuItemAssociation[];
}

export interface RestaurantUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RestaurantData {
  id: number;
  userId: number;
  name: string;
  user: RestaurantUser;
  menu: RestaurantMenu[];
  location: any; // null in your example
}

export interface RestaurantApiResponse {
  data: RestaurantData;
}
