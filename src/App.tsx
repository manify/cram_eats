import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
import LandingPage from './apps/customer-app/pages/LandingPage';
import BecomePartner from './apps/customer-app/pages/BecomePartner';
import SignInRestaurant from './apps/restaurant-app/pages/SignInRestaurant';

import {RestaurantDashboard} from './apps/restaurant-app/pages/RestaurantDashboard';
import { SignUpRestaurant } from './apps/restaurant-app/pages/SignUpRestaurant';
import { Order } from './apps/restaurant-app/types/Order';
import { mockOrders } from './apps/restaurant-app/components/RestaurantDashboard/data/MockData';
import { restaurantAuth } from './apps/restaurant-app/api/Auth/restaurantAuth';



function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders); // Add setOrders

  const handleViewChange = (view: string) => {
    console.log('Changing view to:', view);
    setCurrentView(view as typeof currentView);
  };

  const handleViewOrder = (order: Order) => {
    console.log('Viewing order:', order);
  };

  // Add new handler for order status updates
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/becomepartner" element={<BecomePartner/>}/>

        <Route path="/dashboard2" element={<div className="p-4 text-xl">Welcome to the Dashboard</div>} />
        <Route path="/restaurantsignin"  element={<SignInRestaurant/>}/>      
        <Route path="/restaurant-signup" element={<SignUpRestaurant />} />
        
        {/* Restaurant Dashboard - Update with onUpdateStatus */}
        <Route
          path="/restaurantdashboard"
          element={
            restaurantAuth.isAuthenticated() ? (
              <RestaurantDashboard
                currentView={currentView}
                orders={orders}
                onViewOrder={handleViewOrder}
                onViewChange={handleViewChange}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            ) : (
              <Navigate to="/restaurantsignin" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
