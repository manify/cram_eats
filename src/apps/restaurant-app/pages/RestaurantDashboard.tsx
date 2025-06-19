import React, { useEffect, useState } from 'react';
import { Eye, Plus, TrendingUp, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrdersTable from './Orders/OrdersTable';
import { Order } from '../types/Order';
import Sidebar from '../components/RestaurantDashboard/Sidebar';
import OrdersView from '../../restaurant-app/pages/Orders/OrderView';
import MenuView from './Menu/MenuViewWithProps';
import ProfileSettings from '../components/ProfileSettings';
import { Deal } from '../types/Deal';
import { MenuItem } from '../types/Menu';

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

export const RestaurantDashboard: React.FC = () => {  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);
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
    isOpen: true,
  });

  const restaurantId = localStorage.getItem('restaurantId');

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!restaurantId) return;
      
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3030/crameats/orders/restaurant/${restaurantId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
            },
          }
        );
        
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
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
        const response = await axios.get(
          `http://localhost:3030/crameats/menus/restaurant/${restaurantId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
            },
          }
        );
        
        if (response.data && response.data.menus) {
          const allItems = response.data.menus.flatMap((menu: any) => menu.items || []);
          setMenuItems(allItems);
        }
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
      await axios.patch(
        `http://localhost:3030/crameats/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          },
        }
      );
      
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
      const response = await axios.post(
        `http://localhost:3030/crameats/items`,
        {
          ...newItem,
          restaurantId: parseInt(restaurantId)
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          },
        }
      );
      
      if (response.data) {
        setMenuItems(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  // Edit menu item
  const handleEditMenuItem = async (editedItem: MenuItem) => {
    try {
      await axios.put(
        `http://localhost:3030/crameats/items/${editedItem.id}`,
        editedItem,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          },
        }
      );
      
      setMenuItems(prev =>
        prev.map(item => (item.id === editedItem.id ? editedItem : item))
      );
    } catch (error) {
      console.error('Failed to update menu item:', error);
    }
  };

  // Toggle availability
  const handleToggleAvailability = async (id: string) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    
    try {
      await axios.put(
        `http://localhost:3030/crameats/items/${id}`,
        {
          ...item,
          isAvailable: !item.isAvailable
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          },
        }
      );
      
      setMenuItems(prev =>
        prev.map(i =>
          i.id === id ? { ...i, isAvailable: !i.isAvailable } : i
        )
      );
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  // Delete menu item
  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      await axios.delete(
        `http://localhost:3030/crameats/items/${itemId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('restaurantToken')}`,
          },
        }
      );
      
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
      setDeals(prevDeals =>
        prevDeals.filter(
          deal => !deal.bundleItems.some(bi => bi.menuItem.id === itemId)
        )
      );
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };
  // Deals logic (local only for now)
  const handleCreateDeal = async (deal: Deal) => setDeals(prev => [...prev, deal]);
  const handleRemoveDeal = async (dealId: string) =>
    setDeals(prev => prev.filter(deal => deal.id !== dealId));

  const handleLogout = () => {
    localStorage.removeItem('restaurantToken');
    localStorage.removeItem('restaurantUser');
    localStorage.removeItem('restaurantId');
    navigate('/restaurantsignin');
  };

  // Render different views based on currentView
  if (currentView === 'orders') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto">          <OrdersView
            orders={orders}
            onViewOrder={handleViewOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'menu') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto">          <MenuView
            menuItems={menuItems}
            deals={deals}
            onAddItem={handleAddMenuItem}
            onEditItem={handleEditMenuItem}
            onToggleAvailability={handleToggleAvailability}
            onDeleteItem={handleDeleteMenuItem}
            onAddDeal={handleCreateDeal}
            onDeleteDeal={handleRemoveDeal}
            loading={loadingMenu}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'account') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto">
          <ProfileSettings 
            profile={profile}
            onUpdateProfile={setProfile}
          />
        </div>
      </div>
    );
  }
  // Dashboard view (default)
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const totalRevenue = deliveredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your restaurant.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => !['DELIVERED', 'CANCELLED'].includes(o.status)).length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Menu Items</p>
                  <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
                </div>
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading orders...</p>
                </div>
              ) : recentOrders.length > 0 ? (
                <OrdersTable
                  orders={recentOrders}
                  onUpdateStatus={handleUpdateOrderStatus}
                  onViewOrder={handleViewOrder}
                />
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    When customers place orders, they'll appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;