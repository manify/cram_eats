import axios from 'axios';

// Simple test function to check server connectivity
export const testServerConnection = async () => {
  try {
    console.log('Testing server connection...');
    
    // Test 1: Simple GET request without credentials
    const response1 = await axios.get('http://localhost:3030/crameats/get/restaurants/', {
      timeout: 5000,
      withCredentials: false
    });
    console.log('✓ Public API working:', response1.status);
    
    // Test 2: Auth endpoint without credentials (should work for login)
    const response2 = await axios.post('http://localhost:3030/auth/login-account', 
      { email: 'test@test.com', password: 'test' }, 
      { 
        timeout: 5000,
        withCredentials: false,
        validateStatus: () => true // Accept any status code
      }
    );
    console.log('✓ Auth endpoint reachable:', response2.status);
    
    return true;
  } catch (error: any) {
    console.error('✗ Server connection failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('  → Backend server appears to be down');
    } else if (error.code === 'ECONNABORTED') {
      console.error('  → Request timed out');
    }
    return false;
  }
};

// Call this function to test
// testServerConnection();
