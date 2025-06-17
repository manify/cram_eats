export interface RestaurantUser {
  id: string;
  email: string;
  password: string;
  restaurantName: string;
  ownerName: string;
  address: string;
  phone: string;
  cuisine: string;
}

export const mockRestaurants: RestaurantUser[] = [
  {
    id: 'rest1',
    email: 'pizza@example.com',
    password: 'pizza123',
    restaurantName: 'Pizza Palace',
    ownerName: 'John Smith',
    address: '123 Pizza Street',
    phone: '(555) 123-4567',
    cuisine: 'Italian'
  },
  {
    id: 'rest2',
    email: 'sushi@example.com',
    password: 'sushi123',
    restaurantName: 'Sushi Zone',
    ownerName: 'Amy Wong',
    address: '456 Sushi Ave',
    phone: '(555) 987-6543',
    cuisine: 'Japanese'
  }
];