import apiClient from '../api/client';

export const testBackendConnection = async (): Promise<{ 
  success: boolean; 
  message: string; 
  responseTime?: number;
}> => {
  const startTime = Date.now();
  
  try {
    console.log('Testing backend connection...');
    
    // Try a simple health check or basic endpoint
    const response = await apiClient.get('/health', { timeout: 10000 });
    const responseTime = Date.now() - startTime;
    
    console.log('Backend connection successful:', {
      status: response.status,
      responseTime: `${responseTime}ms`
    });
    
    return {
      success: true,
      message: `Backend connected successfully (${responseTime}ms)`,
      responseTime
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    console.error('Backend connection failed:', {
      error: error.message,
      code: error.code,
      status: error.response?.status,
      responseTime: `${responseTime}ms`
    });
    
    let message = 'Backend connection failed';
    
    if (error.code === 'ECONNREFUSED') {
      message = 'Backend server is not running (connection refused)';
    } else if (error.code === 'ECONNABORTED') {
      message = 'Backend connection timeout';
    } else if (error.code === 'NETWORK_ERROR') {
      message = 'Network error - check your internet connection';
    } else if (error.response?.status === 404) {
      message = 'Backend health endpoint not found - trying restaurants endpoint';
        // Try restaurants endpoint as fallback
      try {
        const fallbackResponse = await apiClient.get('/crameats/get/restaurants/', { 
          timeout: 10000,
          params: { page: 1, limit: 5 }
        });
        return {
          success: true,
          message: `Backend connected via restaurants endpoint (${Date.now() - startTime}ms)`,
          responseTime: Date.now() - startTime
        };
      } catch (fallbackError: any) {
        message = `Backend connection failed: ${fallbackError.message}`;
      }
    }
    
    return {
      success: false,
      message,
      responseTime
    };
  }
};

export const testRestaurantsEndpoint = async (): Promise<{
  success: boolean;
  message: string;
  count?: number;
}> => {
  try {
    console.log('Testing restaurants endpoint...');
    const response = await apiClient.get('/crameats/get/restaurants/', {
      params: { page: 1, limit: 5 }
    });
    
    const restaurants = response.data?.restaurants || response.data;
    const count = Array.isArray(restaurants) ? restaurants.length : 0;
    
    console.log('Restaurants endpoint successful:', {
      status: response.status,
      count
    });
    
    return {
      success: true,
      message: `Restaurants endpoint working (${count} restaurants found)`,
      count
    };
  } catch (error: any) {
    console.error('Restaurants endpoint failed:', error.message);
    return {
      success: false,
      message: `Restaurants endpoint failed: ${error.message}`
    };
  }
};
