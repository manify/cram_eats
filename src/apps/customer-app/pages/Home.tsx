import React from 'react';
import RestaurantCard from '../components/ui/RestaurantCard';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal } = useCart();
  const userName = localStorage.getItem("userName") || "chaimaabaoub09";

  const cartTotal = getCartTotal();
  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  const featuredRestaurants = [
    {
      id: 'italian-place',
      name: 'The Italian Place',
      rating: 4.5,
      reviewCount: 1200,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
    },
    {
      id: 'burger-haven',
      name: 'Burger Haven',
      rating: 4.6,
      reviewCount: 1500,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
    },
  ];

  const popularRestaurants = [
    ...featuredRestaurants,
    {
      id: 'taco-fiesta',
      name: 'Taco Fiesta',
      rating: 4.3,
      reviewCount: 900,
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: 'noodle-nirvana',
      name: 'Noodle Nirvana',
      rating: 4.4,
      reviewCount: 1100,
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: 'dessert-delight',
      name: 'Dessert Delight',
      rating: 4.7,
      reviewCount: 1300,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

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

      {/* Featured Restaurants */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
        </div>
      </section>

      {/* Popular Near You */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Near You</h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
        </div>
      </section>

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
