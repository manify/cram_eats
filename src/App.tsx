import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ContactPage from './apps/customer-app/pages/ContactPage';
import RestoPage from './apps/customer-app/pages/RestoPage';

/* ─── Protected Route Components ─────────────────────── */
import ProtectedRoute from './components/ProtectedRoute';
import RestaurantProtectedRoute from './components/RestaurantProtectedRoute';
import DriverProtectedRoute from './components/DriverProtectedRoute';

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

/* ─── Driver-side pages ───────────────────────────────── */
import SignInDriver from './apps/driver-app/pages/driverSignIn';
import DriverSignUp from './apps/driver-app/pages/driverSignUp';
import DriverDashboard from './apps/driver-app/pages/driverDashboard';

/* ─── Components ──────────────────────────────────────── */
import Header from './apps/customer-app/components/ui/Header';

/* ─── Types and Data ──────────────────────────────────── */
import { ColorFilterType } from './types/colorFilter';

/* ─── Styles ──────────────────────────────────────────── */
import './index.css';

// Component to handle header visibility logic
const AppContent: React.FC = () => {
  const location = useLocation();
  const [colorFilter, setColorFilter] = useState<ColorFilterType>('none');
  // Routes where header should be shown
  const showHeaderRoutes = ['/', '/signin', '/signup', '/becomepartner'];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
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
        <Route path="/" element={<LandingPage  />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ─── Static/Public Pages ─── */}
        <Route path="/becomepartner" element={<BecomePartner />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        <Route path="/cart" element={<Cart />} />

        {/* your other routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/restaurants" element={<RestoPage />} />        {/* ─── Customer Dashboard (Protected Routes) ─── */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
        </Route>        {/* ─── Restaurant Authentication ─── */}
        <Route path="/restaurantsignin" element={<SignInRestaurant />} />
        <Route path="/restaurant-signup" element={<SignUpRestaurant />} />

        {/* ─── Restaurant Dashboard (Protected Route) ─── */}
        <Route path="/restaurantdashboard" element={
          <RestaurantProtectedRoute>
            <RestaurantDashboard />
          </RestaurantProtectedRoute>
        } />

        {/* ─── Driver Auth ─── */}
        <Route path="/driver-signin" element={<SignInDriver />} />
        <Route path="/driver-signup" element={<DriverSignUp />} />
        
        {/* ─── Driver Dashboard (Protected Route) ─── */}
        <Route path="/driver/dashboard" element={
          <DriverProtectedRoute>
            <DriverDashboard />
          </DriverProtectedRoute>
        } />

        {/* ─── Catch-all Redirect ─── */}
        <Route path="*" element={<Navigate to="/" replace />} /></Routes>
    </>
  );
};

// Main App Component
function App() {
  const [colorFilter, setColorFilter] = useState<ColorFilterType>('none');

  return (
    <div style={{ filter: colorFilter !== 'none' ? `url(#${colorFilter})` : 'none' }}>
      <Router>
        <AppContent />
      </Router>
    </div>
    
  );
}

export default App;