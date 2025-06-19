import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Menu, 
  Star, 
  TrendingUp, 
  User,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout?: () => void;
  restaurantName?: string;
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  onLogout, 
  restaurantName, 
  isOpen 
}) => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <img src="/assets/logo.png" alt="logo" />
      </div>

      <nav className="px-4 space-y-1 pt-8">
        <button
          onClick={() => onViewChange('dashboard')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'dashboard'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onViewChange('orders')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'orders'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => onViewChange('menu')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'menu'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => onViewChange('reviews')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'reviews'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Star className="w-5 h-5" />
          <span>Reviews</span>
        </button>

        <button
          onClick={() => onViewChange('stats')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'stats'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Statistics</span>
        </button>

        <button
          onClick={() => onViewChange('account')}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === 'account'
              ? 'bg-yellow-100 text-yellow-900'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </button>
      </nav>

      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;