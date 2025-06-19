import React, { useEffect } from 'react';
import RestaurantCard from '../components/ui/RestaurantCard';
import { ShoppingCart } from 'lucide-react';
import { useCartStore, useRestaurantStore, useAuthStore } from '../stores';
import { useNavigate } from 'react-router-dom';
import { testBackendConnection, testRestaurantsEndpoint } from '../utils/connectionTest';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, getCartItemCount } = useCartStore();
  const { restaurants, isLoading, error, fetchRestaurants } = useRestaurantStore();
  const { user } = useAuthStore();

  const cartTotal = getCartTotal();
  const cartItemCount = getCartItemCount();
  const userName = user ? `${user.firstName} ${user.lastName}` : localStorage.getItem("userName") || "Guest";

  // Debug function to test backend connection
  const debugConnection = async () => {
    console.log('=== DEBUG: Testing Backend Connection ===');
    
    const healthTest = await testBackendConnection();
    console.log('Health check:', healthTest);
    
    const restaurantsTest = await testRestaurantsEndpoint();
    console.log('Restaurants test:', restaurantsTest);
    
    // Show results to user
    alert(`Backend Health: ${healthTest.message}\nRestaurants API: ${restaurantsTest.message}`);
  };

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        console.log('Home component loading restaurants...');
        await fetchRestaurants(1, 20); // Fetch more restaurants at once
      } catch (error) {
        console.error('Failed to load restaurants in Home:', error);
        // The error is already handled in the store, so we don't need to do anything here
      }
    };

    // Only load if we don't have restaurants or if there's an error and we should retry
    if (restaurants.length === 0 && !isLoading) {
      loadRestaurants();
    }
  }, []); // Remove fetchRestaurants from dependencies to prevent re-fetching

  // Transform API data to match UI expectations
  const transformRestaurantData = (restaurant: any) => ({
    id: restaurant.id.toString(),
    name: restaurant.name,
    rating: 4.5, // Default rating as API doesn't provide this
    reviewCount: restaurant._count?.orders || 0,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400', // Default image
    featured: restaurant._count?.menu > 1, // Consider restaurants with more menu items as featured
  });

  const featuredRestaurants = restaurants
    .filter(restaurant => restaurant._count?.menu > 1)
    .slice(0, 6)
    .map(transformRestaurantData);

  const popularRestaurants = restaurants
    .slice(0, 8)
    .map(transformRestaurantData);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Green Welcome Box */}
      <div className="bg-green-500 text-white rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-lg">Discover amazing food from local restaurants</p>
        </div>
        <div className="text-4xl hidden sm:block">🍽️</div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <div className="space-x-2">
              <button 
                onClick={() => fetchRestaurants(1, 20, true)} // Force refresh
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Retry'}
              </button>
              <button 
                onClick={debugConnection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                disabled={isLoading}
              >
                Debug
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Featured Restaurants */}
      {!isLoading && featuredRestaurants.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Near You */}
      {!isLoading && popularRestaurants.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Near You</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularRestaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </section>
      )}

      {/* No Restaurants Found */}
      {!isLoading && !error && restaurants.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-600">No restaurants found</h3>
          <p className="text-gray-500 mt-2">Try refreshing the page or check back later.</p>
        </div>
      )}

      {/* Current Basket */}
      {items.length > 0 && (
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Current Basket</h3>
                <p className="text-sm text-gray-600">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} from {items[0]?.restaurantName || 'selected restaurants'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-primary-600">€{cartTotal.toFixed(2)}</p>
              <button onClick={() => navigate('/cart')} className="btn-primary mt-2">
                View Basket
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">x{item.quantity}</span>
                </div>
                <span className="text-primary-600 font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-sm text-gray-500 text-center">
                +{items.length - 3} more items
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
