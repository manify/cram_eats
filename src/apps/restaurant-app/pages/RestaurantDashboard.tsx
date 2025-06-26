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
import { RestaurantData, RestaurantMenuItem } from '../types/RestaurantApi';
import DebugInfo from '../components/DebugInfo';
import RestaurantDebugPanel from '../components/RestaurantDebugPanel';
import { useRestaurantAuth } from '../hooks/useRestaurantAuth';

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

export const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { restaurantId, token, isAuthenticated, user, initializeAuth, signOut } = useRestaurantAuth();
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
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

  // Initialize auth on component mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/restaurantsignin');
    }
  }, [isAuthenticated, token, navigate]);

  // Fetch restaurant data, orders, and menu items from backend
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!restaurantId) {
        console.error('No restaurant ID found');
        return;
      }
      
      try {
        setLoadingMenu(true);
        console.log('Fetching restaurant data for ID:', restaurantId);
        
        const response = await axios.get(
          `http://localhost:3030/crameats/restaurants/${restaurantId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log('Restaurant data response:', response.data);
        
        if (response.data) {
          setRestaurantData(response.data);
          
          // Extract menu items from the complex structure
          const allItems: MenuItem[] = [];
          if (response.data.menu && Array.isArray(response.data.menu)) {
            response.data.menu.forEach((menu: any) => {
              if (menu.items && Array.isArray(menu.items)) {
                menu.items.forEach((menuItem: any) => {
                  const item = menuItem.item;
                  if (item) {
                    allItems.push({
                      id: item.id.toString(),
                      name: item.name,
                      description: item.description || '',
                      price: item.price,
                      category: item.category || 'uncategorized',
                      status: item.status,
                      imageUrl: item.imageUrl,
                      restaurantId: item.restaurantId
                    });
                  }
                });
              }
            });
          }
          
          console.log('Extracted menu items:', allItems);
          setMenuItems(allItems);
          
          // Update profile with restaurant data
          setProfile(prev => ({
            ...prev,
            name: response.data.name,
            email: response.data.user?.email || prev.email,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
        if (axios.isAxiosError(error)) {
          console.error('Status:', error.response?.status);
          console.error('Data:', error.response?.data);
          
          if (error.response?.status === 404) {
            console.error(`Restaurant with ID ${restaurantId} not found`);
          }
        }
        setMenuItems([]);
      } finally {
        setLoadingMenu(false);
      }
    };

    const fetchOrders = async () => {
      if (!restaurantId) {
        console.error('No restaurant ID found for orders');
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching orders for restaurant ID:', restaurantId);
        
        const response = await axios.get(
          `http://localhost:3030/crameats/orders/restaurant/${restaurantId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log('Orders response:', response.data);
        
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else if (response.data) {
          // Handle different response structures
          setOrders(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        if (axios.isAxiosError(error)) {
          console.error('Orders API Status:', error.response?.status);
          console.error('Orders API Data:', error.response?.data);
          
          if (error.response?.status === 404) {
            console.error(`No orders found for restaurant ID ${restaurantId} or endpoint doesn't exist`);
          }
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurantData();
      fetchOrders();
    } else {
      console.error('Restaurant ID not found in localStorage');
    }
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
        `http://localhost:3000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
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
    if (!restaurantId) {
      console.error('No restaurant ID found for adding item');
      return;
    }

    try {
      console.log('Adding new item:', newItem);
      
      // First create the item
      const itemResponse = await axios.post(
        `http://localhost:3030/crameats/items`,
        {
          itemId: `item-${Date.now()}`, // Generate unique itemId
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          category: newItem.category,
          status: newItem.status || 'available',
          imageUrl: newItem.imageUrl || '',
          restaurantId: restaurantId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Item creation response:', itemResponse.data);
      
      if (itemResponse.data) {
        // Add to local state
        const formattedItem: MenuItem = {
          id: itemResponse.data.id.toString(),
          name: itemResponse.data.name,
          description: itemResponse.data.description || '',
          price: itemResponse.data.price,
          category: itemResponse.data.category,
          status: itemResponse.data.status,
          imageUrl: itemResponse.data.imageUrl,
          restaurantId: itemResponse.data.restaurantId
        };
        setMenuItems(prev => [...prev, formattedItem]);
      }
    } catch (error) {
      console.error('Failed to add menu item:', error);
      if (axios.isAxiosError(error)) {
        console.error('Add item API Status:', error.response?.status);
        console.error('Add item API Data:', error.response?.data);
        
        if (error.response?.status === 404) {
          console.error('Items endpoint not found. Check if the API route exists.');
        }
      }
    }
  };

  // Edit menu item
  const handleEditMenuItem = async (editedItem: MenuItem) => {
    try {
      await axios.put(
        `http://localhost:3030/crameats/items/${editedItem.id}`,
        {
          name: editedItem.name,
          description: editedItem.description,
          price: editedItem.price,
          category: editedItem.category,
          status: editedItem.status,
          imageUrl: editedItem.imageUrl
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
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
    
    const newStatus = item.status === 'available' ? 'unavailable' : 'available';
    
    try {
      await axios.put(
        `http://localhost:3030/crameats/items/${id}`,
        {
          ...item,
          status: newStatus
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setMenuItems(prev =>
        prev.map(i =>
          i.id === id ? { ...i, status: newStatus } : i
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
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
    signOut();
    navigate('/restaurantsignin');
  };

  // Render different views based on currentView
  if (currentView === 'orders') {
    return (
      <div className="flex min-h-screen bg-gray-50 mt-16">
        <Sidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto ml-64">
          <OrdersView
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
      <div className="flex min-h-screen bg-gray-50 mt-16">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto ml-64">
          <MenuView
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
      <div className="flex min-h-screen bg-gray-50 mt-16">
        <Sidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <div className="flex-1 overflow-auto ml-64">
          <ProfileSettings 
            profile={profile}
            onUpdateProfile={setProfile}
          />
        </div>
      </div>
    );
  }  // Dashboard view (default)
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const totalRevenue = deliveredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const recentOrders = orders.slice(0, 5);
  
  return (
    <div className="flex min-h-screen bg-gray-50 mt-16">
      <Sidebar 
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      <div className="flex-1 overflow-auto ml-64">
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
              )}            </div>
          </div>
        </div>
      </div>
      <DebugInfo
        restaurantId={restaurantId}
        loading={loading}
        loadingMenu={loadingMenu}
        menuItems={menuItems}
        orders={orders}
        restaurantData={restaurantData}
      />
      <RestaurantDebugPanel />
    </div>
  );
};

export default RestaurantDashboard;