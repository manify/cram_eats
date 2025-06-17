import React, { useState } from 'react';
import { Eye, Plus, TrendingUp, ShoppingBag } from 'lucide-react';
import OrdersTable from './Orders/OrdersTable';
import { Order } from '../types/Order';
import Sidebar from '../components/RestaurantDashboard/Sidebar';
import OrdersView from '../../restaurant-app/pages/Orders/OrderView';
import MenuView from './Menu/MenuView';
import ProfileSettings from '../components/ProfileSettings';
import { Deal } from '../types/Deal';

import { mockMenuItems } from '../../restaurant-app/components/RestaurantDashboard/data/MenuData';
import { MenuItem } from '../types/Menu';
import { Navigate, useNavigate } from 'react-router-dom';


// Remove this local type and import the shared View type instead


interface RestaurantDashboardProps {
  currentView: string;
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onViewChange: (view: string) => void;
  onUpdateStatus?: (orderId: string, status: Order['status']) => void; // Add this line
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

export const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ 
  currentView, 
  orders, 
  onViewOrder,
  onViewChange,
  onUpdateStatus 
}) => {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
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
  const [localOrders, setLocalOrders] = useState(orders);

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  const handleEditMenuItem = (editedItem: MenuItem) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === editedItem.id ? editedItem : item
      )
    );
  };

  const handleToggleAvailability = (id: string) => {
    setMenuItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
  };

  const handleCreateDeal = (deal: Deal) => {
  setDeals(prevDeals => [...prevDeals, deal]);
};

  const handleRemoveDeal = (dealId: string) => {
    setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: redirect to login page
    navigate('/restaurantsignin');
  };
  const handleDeleteMenuItem = (itemId: string) => {
  setMenuItems(prevItems => prevItems.filter(item => item.id !== itemId));
  // Also remove any deals that include this item
  setDeals(prevDeals => prevDeals.filter(deal => 
    !deal.bundleItems.some(bundleItem => bundleItem.menuItem.id === itemId)
  ));
};

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setLocalOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
    // Also call the parent's update function if provided
    onUpdateStatus?.(orderId, newStatus);
  };

  if (currentView === 'orders') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentView={currentView} 
          onViewChange={onViewChange} 
          onLogout={handleLogout}
        />
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                  <button
                    onClick={() => onViewChange('dashboard')}
                    className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-200"
                  >
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              </div>
              <OrdersView 
                orders={orders} // Use orders prop instead of localOrders
                onViewOrder={onViewOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'menu') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentView={currentView} 
          onViewChange={onViewChange} 
          onLogout={handleLogout}
        />
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              </div>
              <MenuView 
                items={menuItems}
                deals={deals}
                onAddItem={handleAddMenuItem}
                onEditItem={handleEditMenuItem}
                onToggleAvailability={handleToggleAvailability}
                onCreateDeal={handleCreateDeal}
                onRemoveDeal={handleRemoveDeal}
                onDeleteItem={handleDeleteMenuItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'account') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentView={currentView} 
          onViewChange={onViewChange} 
          onLogout={handleLogout}
        />
        <div className="flex-1 ml-64">
          <div className="p-8 h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                  <button
                    onClick={() => onViewChange('dashboard')}
                    className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-200"
                  >
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              </div>
              <ProfileSettings 
                profile={profile}
                onUpdateProfile={setProfile}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Update the dashboard view to use the same orders
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={onViewChange} 
        onLogout={handleLogout}
      />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Sophia!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your restaurant today.
              </p>
            </div>

            {/* Quick Actions */}

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    console.log('Changing view to orders');
                    onViewChange('orders');
                  }}
                  className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg shadow-yellow-400/25"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Orders</span>
                </button>
                <button
                  onClick={() => onViewChange('menu')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-yellow-400 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Manage Menu</span>
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-sm text-yellow-600 font-medium">Last 30 Days</p>
                
                {/* Simple Revenue Chart */}
                <div className="mt-6 h-20 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-2">
                    {[65, 45, 78, 85, 92, 67, 88].map((height, index) => (
                      <div
                        key={index}
                        className="bg-yellow-400 rounded-t w-3 transition-all duration-1000"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan 1</span>
                  <span>Jan 8</span>
                  <span>Jan 15</span>
                  <span>Jan 22</span>
                  <span>Jan 29</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+10%</span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">{orders.length}</span>
                </div>
                <p className="text-sm text-yellow-600 font-medium">Last 30 Days</p>
                
                {/* Simple Orders Chart */}
                <div className="mt-6 space-y-3">
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                    <div key={week} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 w-16">{week}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${[75, 60, 85, 70][index]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <OrdersTable 
                orders={recentOrders} 
                onViewOrder={onViewOrder}
                onUpdateStatus={handleUpdateOrderStatus} // Add this line
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
   
    

};

export default RestaurantDashboard;