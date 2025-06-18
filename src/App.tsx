import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

/* ─── Customer-side pages ─────────────────────────────── */
import LandingPage from './apps/customer-app/pages/LandingPage';
import SignIn from './apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
import BecomePartner from './apps/customer-app/pages/BecomePartner';
import Dashboard from './apps/customer-app/pages/Dashboard';
import Home from './apps/customer-app/pages/Home';
import Orders from './apps/customer-app/pages/Orders';
import Notifications from './apps/customer-app/pages/Notifications';
import Account from './apps/customer-app/pages/Account';
import Cart from './apps/customer-app/pages/Cart';
import RestaurantPage from './apps/customer-app/pages/RestaurantPage';
import OrderTracking from './apps/customer-app/pages/OrderTracking';

/* ─── Restaurant-side pages ───────────────────────────── */
import SignInRestaurant from './apps/restaurant-app/pages/SignInRestaurant';
import { SignUpRestaurant } from './apps/restaurant-app/pages/SignUpRestaurant';
import { RestaurantDashboard } from './apps/restaurant-app/pages/RestaurantDashboard';

/* ─── Components ──────────────────────────────────────── */
import Header from './apps/customer-app/components/ui/Header';

/* ─── Global providers ────────────────────────────────── */
import { NotificationProvider } from './apps/customer-app/contexts/NotificationContext';
import { CartProvider } from './apps/customer-app/contexts/CartContext';

/* ─── Types and Data ──────────────────────────────────── */
import { Order } from './apps/restaurant-app/types/Order';
import { mockOrders } from './apps/restaurant-app/components/RestaurantDashboard/data/MockData';
import { restaurantAuth } from './apps/restaurant-app/api/Auth/restaurantAuth';
import { ColorFilterType } from './types/colorFilter';

/* ─── Styles ──────────────────────────────────────────── */
import './index.css';

// Component to handle header visibility logic
const AppContent: React.FC = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'menu' | 'items' | 'reviews' | 'stats' | 'account'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [colorFilter, setColorFilter] = useState<ColorFilterType>('none');

  // Routes where header should be shown
  const showHeaderRoutes = ['/', '/signin', '/signup', '/becomepartner'];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  const handleViewChange = (view: string) => {
    setCurrentView(view as typeof currentView);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <>
      {/* Conditional Header */}
      {shouldShowHeader && (
        <Header 
          colorFilter={colorFilter} 
          setColorFilter={setColorFilter} 
        />
      )}

      {/* Main Routes */}
      <Routes>
        {/* ─── Landing & Authentication ─── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ─── Static/Public Pages ─── */}
        <Route path="/becomepartner" element={<BecomePartner />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        <Route path="/cart" element={<Cart />} />

        {/* ─── Customer Dashboard (Nested Routes) ─── */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* ─── Restaurant Authentication ─── */}
        <Route path="/restaurantsignin" element={<SignInRestaurant />} />
        <Route path="/restaurant-signup" element={<SignUpRestaurant />} />

        {/* ─── Restaurant Dashboard (Protected Route) ─── */}
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
              <Navigate to="/restaurantsignin" replace />
            )
          }
        />

        {/* ─── Catch-all Redirect ─── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Main App Component
function App() {
  const [colorFilter, setColorFilter] = useState<ColorFilterType>('none');

  return (
    <div style={{ filter: colorFilter !== 'none' ? `url(#${colorFilter})` : 'none' }}>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;