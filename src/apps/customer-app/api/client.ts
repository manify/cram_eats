import axios from 'axios';

// Create a simple API client for general use
const apiClient = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 30000, // Increased to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Start with false to avoid CORS issues
});

// Create a separate client for authenticated requests
const authApiClient = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 30000, // Increased to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Disable credentials to avoid CORS issues
});

// Request interceptor for general API
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Request interceptor for auth API
authApiClient.interceptors.request.use(
  (config) => {
    console.log('Making authenticated API request to:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Auth request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for general API
apiClient.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      code: error.code
    });
    return Promise.reject(error);
  }
);

// Response interceptor for auth API
authApiClient.interceptors.response.use(
  (response) => {
    console.log('Auth API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Auth API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      code: error.code
    });
    return Promise.reject(error);
  }
);

export default apiClient;
export { authApiClient };
export const publicApiClient = apiClient; // Alias for backward compatibility
