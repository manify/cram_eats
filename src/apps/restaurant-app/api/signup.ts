import axios from 'axios';

export interface RestaurantSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'restaurantOwner';
  restaurantName: string;
  restaurantLat: number;
  restaurantLong: number;
  restaurantAddress: string; // Make sure this matches what the backend expects
  openingHours: string;
  closingHours: string;
  workingDays: string[];
  phoneNumber: string;
  cuisineType: string;
  businessLicense?: string;
}

export default async function signup(data: RestaurantSignupData) {
  try {
    console.log('Making request with data:', JSON.stringify(data, null, 2));
    
    const response = await axios.post(
      'http://localhost:3001/auth/create-restaurant-account',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Server error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create restaurant account');
    }
    throw error;
  }
}