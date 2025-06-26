import React from 'react';
import { useRestaurantAuth } from '../hooks/useRestaurantAuth';

const RestaurantDebugPanel: React.FC = () => {
  const { restaurantId, token, user, signOut, initializeAuth } = useRestaurantAuth();

  const handleTestRestaurantId1 = () => {
    // This should be handled through Redux, but for quick testing:
    localStorage.setItem('restaurantId', '1');
    localStorage.setItem('restaurantToken', token || '');
    initializeAuth();
    window.location.reload();
  };

  const handleTestRestaurantId27 = () => {
    // This should be handled through Redux, but for quick testing:
    localStorage.setItem('restaurantId', '27');
    localStorage.setItem('restaurantToken', token || '');
    initializeAuth();
    window.location.reload();
  };

  const handleClearStorage = () => {
    signOut();
    window.location.reload();
  };

  const testEndpoint = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`${url}: ${response.status} ${response.statusText}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
      }
    } catch (error) {
      console.error(`${url}: Error`, error);
    }
  };

  const handleTestEndpoints = () => {
    console.log('Testing endpoints...');
    testEndpoint('http://localhost:3030/crameats/restaurants/1');
    testEndpoint('http://localhost:3030/crameats/restaurants/27');
    testEndpoint(`http://localhost:3030/crameats/orders/restaurant/${restaurantId}`);
    testEndpoint('http://localhost:3030/crameats/items');
  };

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-sm">
      <h3 className="font-bold mb-2">⚠️ Debug Panel</h3>
      <div className="text-sm space-y-2">
        <div>
          <strong>Restaurant ID:</strong> {restaurantId || 'Not set'}
        </div>
        <div>
          <strong>Token:</strong> {token ? '✅ Present' : '❌ Missing'}
        </div>
        
        <div className="space-y-1 mt-3">
          <button
            onClick={handleTestRestaurantId1}
            className="w-full bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
          >
            Test with Restaurant ID 1
          </button>
          <button
            onClick={handleTestRestaurantId27}
            className="w-full bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
          >
            Test with Restaurant ID 27
          </button>
          <button
            onClick={handleTestEndpoints}
            className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
          >
            Test All Endpoints
          </button>
          <button
            onClick={handleClearStorage}
            className="w-full bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
          >
            Clear Storage & Reload
          </button>
        </div>
        
        <div className="text-xs mt-2 p-2 bg-gray-100 rounded">
          <strong>Status:</strong><br/>
          - Restaurant ID 27: ❌ Not found<br/>
          - Restaurant ID 1: ✅ Working<br/>
          - Items API: ❌ Missing
        </div>
      </div>
    </div>
  );
};

export default RestaurantDebugPanel;
