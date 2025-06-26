import React, { useEffect, useState } from 'react';
import { Eye, Plus, TrendingUp, ShoppingBag } from 'lucide-react';
import OrdersTable from './Orders/OrdersTable';
import { Order } from '../types/Order';
import Sidebar from '../components/RestaurantDashboard/Sidebar';
import OrdersView from '../../restaurant-app/pages/Orders/OrderView';
import MenuView from './Menu/MenuViewWithProps';
import ProfileSettings from '../components/ProfileSettings';
import { Deal } from '../types/Deal';
import { MenuItem } from '../types/Menu';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RestaurantDashboardProps {
  // Component will manage its own state
}

interface RestaurantProfile {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string;
  openingHours: string;
  image: string;
  isOpen: boolean;
}

export const RestaurantDashboard: React.FC<RestaurantDashboardProps> = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [profile, setProfile] = useState<RestaurantProfile>({
    name: 'Your Restaurant Name',
    description: 'A brief description of your restaurant',
    address: '123 Restaurant Street',
    phone: '(555) 123-4567',
    email: 'contact@yourrestaurant.com',
    cuisine: 'Contemporary',
    openingHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    image: '',
    isOpen: true
  });
  const [loadingMenu, setLoadingMenu] = useState(false);

  const navigate = useNavigate();
  const restaurantId = localStorage.getItem('restaurantId');

  // Check if restaurant is authenticated
  useEffect(() => {
    const restaurantUser = localStorage.getItem('restaurantUser');
    const restaurantToken = localStorage.getItem('restaurantToken');
    
    if (!restaurantUser || !restaurantToken) {
      navigate('/restaurantsignin');
      return;
    }
  }, [navigate]);

  // Fetch restaurant orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!restaurantId) {
        setError('Restaurant ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3030/crameats/orders/restaurant/${restaurantId}`);
        setOrders(response.data.orders || []);
        setError(null);
      } catch (error: any) {
        console.error('Failed to fetch restaurant orders:', error);
        setError('Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!restaurantId) return;
      
      try {
        setLoadingMenu(true);
        const response = await axios.get(`http://localhost:3030/crameats/restaurants/${restaurantId}/menu`);
        setMenuItems(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
        setMenuItems([]);
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  // Handlers for dashboard operations
  const handleViewChange = (view: string) => {
    setCurrentView(view as typeof currentView);
  };

  const handleViewOrder = (order: Order) => {
    console.log('View order:', order);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await axios.patch(`http://localhost:3030/crameats/orders/${orderId}/status`, {
        status: newStatus
      });
      
      // Update local state
      setOrders(prev =>
        prev.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Add menu item
  const handleAddMenuItem = async (newItem: MenuItem) => {
    if (!restaurantId) return;

    try {
      const response = await axios.post(`http://localhost:3030/crameats/items`, {
        ...newItem,
        restaurantId: parseInt(restaurantId)
      });
      setMenuItems(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  // Edit menu item
  const handleEditMenuItem = async (editedItem: MenuItem) => {
    try {
      await axios.put(`http://localhost:3030/crameats/items/${editedItem.id}`, editedItem);
      setMenuItems(prev =>
        prev.map(item => (item.id === editedItem.id ? editedItem : item))
      );
    } catch (error) {
      console.error('Failed to edit menu item:', error);
    }
  };

  // Delete menu item
  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3030/crameats/items/${itemId}`);
      setMenuItems(prev => prev.filter(item => item.id !== itemId));      setDeals(prevDeals =>
        prevDeals.filter(deal => !deal.bundleItems.some(bundleItem => bundleItem.menuItem.id === itemId))
      );
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  // Toggle menu item availability
  const handleToggleItemAvailability = async (itemId: string) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    try {
      const newStatus: 'available' | 'unavailable' = item.status === 'available' ? 'unavailable' : 'available';
      const updatedItem: MenuItem = { ...item, status: newStatus };
      await axios.patch(`http://localhost:3000/api/restaurants/${restaurantId}/items/${itemId}`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setMenuItems(prev =>
        prev.map(i =>
          i.id === itemId ? updatedItem : i
        )
      );
    } catch (error) {
      console.error('Failed to toggle item availability:', error);
    }
  };
  // Add deal
  const handleAddDeal = async (newDeal: Deal) => {
    setDeals(prev => [...prev, newDeal]);
  };

  // Delete deal
  const handleDeleteDeal = async (dealId: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== dealId));
  };

  // Update profile
  const handleUpdateProfile = (updatedProfile: RestaurantProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(order => !['DELIVERED', 'CANCELLED'].includes(order.status)).length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Menu Items</p>
                  <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
                </div>
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        );
      case 'orders':        return (
          <OrdersView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onViewOrder={handleViewOrder}
          />
        );
      case 'menu':
        return (
          <MenuView
            menuItems={menuItems}
            deals={deals}
            onAddItem={handleAddMenuItem}
            onEditItem={handleEditMenuItem}
            onDeleteItem={handleDeleteMenuItem}
            onToggleAvailability={handleToggleItemAvailability}
            onAddDeal={handleAddDeal}
            onDeleteDeal={handleDeleteDeal}
            loading={loadingMenu}
          />
        );
      case 'account':
        return (
          <ProfileSettings
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return <div className="text-center py-8">Coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        restaurantName={profile.name}
        isOpen={profile.isOpen}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Restaurant Dashboard
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
