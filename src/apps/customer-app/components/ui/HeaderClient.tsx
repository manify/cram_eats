import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Bell, MapPin } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useCart } from '../../contexts/CartContext';

const HeaderClient: React.FC = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const { getCartItemCount } = useCart();

  const unreadCount = notifications.filter(n => !n.read).length;
  const cartCount = getCartItemCount();
  const location = localStorage.getItem("userLocation") || "25 Avenue des Mazades";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-8 md:py-4 fixed top-0 left-0 right-0 z-40">
      <div className="relative flex items-center justify-between">
        
        {/* Centered Search + Location */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 w-full max-w-3xl justify-center px-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg whitespace-nowrap">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>

        {/* Right section - Icons */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
