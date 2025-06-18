
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* ─── Customer-side pages ─────────────────────────────── */
import LandingPage    from './apps/customer-app/pages/LandingPage';
import SignIn         from './apps/customer-app/pages/SignIn';
import SignUp         from './apps/customer-app/pages/SignUp';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';

import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
import BecomePartner  from './apps/customer-app/pages/BecomePartner';

import Dashboard      from './apps/customer-app/pages/Dashboard';
import Home           from './apps/customer-app/pages/Home';
import Orders         from './apps/customer-app/pages/Orders';
import Notifications  from './apps/customer-app/pages/Notifications';
import Account        from './apps/customer-app/pages/Account';
import Cart           from './apps/customer-app/pages/Cart';               // ✅ Imported Cart
import RestaurantPage from './apps/customer-app/pages/RestaurantPage';

import OrderTracking  from './apps/customer-app/pages/OrderTracking';

/* ─── Restaurant-side pages ───────────────────────────── */
import SignInRestaurant     from './apps/restaurant-app/pages/SignInRestaurant';
import { SignUpRestaurant } from './apps/restaurant-app/pages/SignUpRestaurant';
import { RestaurantDashboard } from './apps/restaurant-app/pages/RestaurantDashboard';

/* ─── Global providers ────────────────────────────────── */
import { NotificationProvider } from './apps/customer-app/contexts/NotificationContext';
import { CartProvider }         from './apps/customer-app/contexts/CartContext';

/* ─── Styles ──────────────────────────────────────────── */
import './index.css';

import Orders from './apps/customer-app/pages/Orders';
import SignInRestaurant from './apps/restaurant-app/pages/SignInRestaurant';

import Header from './apps/customer-app/components/ui/Header';


import { RestaurantDashboard } from './apps/restaurant-app/pages/RestaurantDashboard';
import { SignUpRestaurant } from './apps/restaurant-app/pages/SignUpRestaurant';
import { Order } from './apps/restaurant-app/types/Order';
import { mockOrders } from './apps/restaurant-app/components/RestaurantDashboard/data/MockData';
import { restaurantAuth } from './apps/restaurant-app/api/Auth/restaurantAuth';
import { ColorFilterType } from './types/colorFilter';

interface AppContentProps {
  currentView: 'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account';
  orders: Order[];
  colorFilter: ColorFilterType;
  setColorFilter: Dispatch<SetStateAction<ColorFilterType>>;
  handleViewChange: (view: string) => void;
  handleUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

const AppContent: React.FC<AppContentProps> = ({
  currentView,
  orders,
  colorFilter,
  setColorFilter,
  handleViewChange,
  handleUpdateOrderStatus
}) => {
  const location = useLocation();
  const showHeaderRoutes = ['/', '/signin', '/signup', '/becomepartner'];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
  
  return (

    <NotificationProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ─ Landing & auth ─ */}
            <Route path="/"                element={<LandingPage />}     />
            <Route path="/signin"          element={<SignIn />}          />
            <Route path="/signup"          element={<SignUp />}          />
            <Route path="/forgot-password" element={<ForgotPassword />}  />

            {/* ─ Static / public pages ─ */}
            <Route path="/becomepartner"           element={<BecomePartner />}  />
            <Route path="/restaurant/:id"          element={<RestaurantPage />} />
            <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
            <Route path="/cart"                    element={<Cart />} />         {/* ✅ Cart route added */}

            {/* ─ Customer dashboard ─ */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index               element={<Navigate to="home" replace />} />
              <Route path="home"         element={<Home />}          />
              <Route path="orders"       element={<Orders />}        />
              <Route path="notifications"element={<Notifications />} />
              <Route path="account"      element={<Account />}       />
            </Route>

            {/* ─ Restaurant-side ─ */}
            <Route path="/restaurantsignin"     element={<SignInRestaurant />}     />
            <Route path="/restaurant-signup"    element={<SignUpRestaurant />}     />
            <Route path="/restaurantdashboard"  element={<RestaurantDashboard />}  />

            {/* ─ Catch-all → Landing ─ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </NotificationProvider>

    <>
      {shouldShowHeader && (
        <Header colorFilter={colorFilter} setColorFilter={setColorFilter} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/becomepartner" element={<BecomePartner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard2" element={<div className="p-4 text-xl">Welcome to the Dashboard</div>} />
        <Route path="/restaurantsignin" element={<SignInRestaurant />} />
        <Route path="/restaurant-signup" element={<SignUpRestaurant />} />
        <Route
          path="/restaurantdashboard"
          element={
            restaurantAuth.isAuthenticated() ? (
              <RestaurantDashboard
                currentView={currentView}
                orders={orders}
                onViewOrder={() => {}}
                onViewChange={handleViewChange}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            ) : (
              <Navigate to="/restaurantsignin" />
            )
          }
        />
      </Routes>
    </>
  );
};

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [colorFilter, setColorFilter] = useState<ColorFilterType>('none');

  const handleViewChange = (view: string) => setCurrentView(view as typeof currentView);

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <div style={{ filter: colorFilter ? `url(#${colorFilter})` : 'none' }}>
      <Router>
        <AppContent
          currentView={currentView}
          orders={orders}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          handleViewChange={handleViewChange}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
        />
      </Router>
    </div>

  );
}

export default App;
