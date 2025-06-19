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
  restaurantAddress: string;
  openingHours: string;
  closingHours: string;
  workingDays: string[];
  phoneNumber: string;
  cuisineType: string;
  businessLicense?: string;
}

export default async function signup(data: RestaurantSignupData) {
  try {
    // Transform data to match backend expectations
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      restaurantName: data.restaurantName,
      latitude: data.restaurantLat, // Change key if backend expects 'latitude'
      longitude: data.restaurantLong, // Change key if backend expects 'longitude'
      address: data.restaurantAddress, // Change key if backend expects 'address'
      openingHours: data.openingHours,
      closingHours: data.closingHours,
      workingDays: data.workingDays,
      phoneNumber: data.phoneNumber,
      cuisineType: data.cuisineType,
      businessLicense: data.businessLicense,
    };

    console.log('Making request with data:', JSON.stringify(payload, null, 2));
    
    const response = await axios.post(
      'http://localhost:3030/crameats/create-restaurant-account',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data || response.data.error) {
      console.error('Signup failed:', response.data);
      throw new Error(response.data?.message || 'Signup failed');
    }

    console.log('Signup successful:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Server error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create restaurant account');
    }
    throw error;
  }
}