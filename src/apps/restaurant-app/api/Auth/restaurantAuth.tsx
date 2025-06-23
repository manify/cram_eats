import axios from 'axios';

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

interface RestaurantUser {
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  address: string;
  phone: string;
  cuisine: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: RestaurantUser;
    token: string;
  };
}

class RestaurantAuthService {
  private baseURL = 'http://localhost:3030';

  login = async (credentials: LoginCredentials): Promise<RestaurantUser> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseURL}/auth/login-restaurant-account`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data) {
        const { user, token } = response.data.data;
        
        // Store user data and token in localStorage
        localStorage.setItem('restaurantUser', JSON.stringify(user));
        localStorage.setItem('restaurantToken', token);
        localStorage.setItem('restaurantId', user.id);
        
        return user;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with an error status
        throw new Error(error.response.data?.message || 'Invalid credentials');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to connect to server. Please try again.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Login failed');
      }
    }
  };
  logout = () => {
    localStorage.removeItem('restaurantUser');
    localStorage.removeItem('restaurantToken');
    localStorage.removeItem('restaurantId');
  };

  getCurrentUser = (): RestaurantUser | null => {
    const userData = localStorage.getItem('restaurantUser');
    return userData ? JSON.parse(userData) : null;
  };

  isAuthenticated = (): boolean => {
    return !!(localStorage.getItem('restaurantUser') && localStorage.getItem('restaurantToken'));
  };
  
  signup = async (data: SignupData): Promise<RestaurantUser> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseURL}/auth/create-restaurant-account`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data) {
        const { user, token } = response.data.data;
        
        // Store user data and token in localStorage
        localStorage.setItem('restaurantUser', JSON.stringify(user));
        localStorage.setItem('restaurantToken', token);
        localStorage.setItem('restaurantId', user.id);
        
        return user;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with an error status
        throw new Error(error.response.data?.message || 'Registration failed');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to connect to server. Please try again.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Registration failed');
      }
    }
  };
}

export const restaurantAuth = new RestaurantAuthService();