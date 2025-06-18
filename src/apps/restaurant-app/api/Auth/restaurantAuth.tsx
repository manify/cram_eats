import { mockRestaurants, RestaurantUser } from '../../components/RestaurantDashboard/data/resCredentials';

interface LoginCredentials {
  email: string;
  password: string;
}
interface SignupData {
  restaurantName: string;
  ownerName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  cuisine: string;
}


class RestaurantAuthService {
  login = async (credentials: LoginCredentials): Promise<RestaurantUser> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const restaurant = mockRestaurants.find(
      r => r.email === credentials.email && r.password === credentials.password
    );

    if (!restaurant) {
      throw new Error('Invalid credentials');
    }

    localStorage.setItem('restaurantUser', JSON.stringify(restaurant));
    localStorage.setItem('restaurantToken', 'mock-jwt-token');
    return restaurant;
  };

  logout = () => {
    localStorage.removeItem('restaurantUser');
    localStorage.removeItem('restaurantToken');
  };

  getCurrentUser = (): RestaurantUser | null => {
    const userData = localStorage.getItem('restaurantUser');
    return userData ? JSON.parse(userData) : null;
  };

  isAuthenticated = (): boolean => {
    return !!(localStorage.getItem('restaurantUser') && localStorage.getItem('restaurantToken'));
  };
  
   signup = async (data: SignupData): Promise<RestaurantUser> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    if (mockRestaurants.some(r => r.email === data.email)) {
      throw new Error('Email already registered');
    }

    const newRestaurant: RestaurantUser = {
      ...data,
      id: `rest${mockRestaurants.length + 1}`
    };

    // In a real app, you would save this to a database
    mockRestaurants.push(newRestaurant);

    // Store user data in localStorage
    localStorage.setItem('restaurantUser', JSON.stringify(newRestaurant));
    localStorage.setItem('restaurantToken', 'mock-jwt-token');
    
    return newRestaurant;
  };
}

export const restaurantAuth = new RestaurantAuthService();