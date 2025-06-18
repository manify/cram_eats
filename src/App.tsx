import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* ─── Customer-side pages ─────────────────────────────── */
import LandingPage    from './apps/customer-app/pages/LandingPage';
import SignIn         from './apps/customer-app/pages/SignIn';
import SignUp         from './apps/customer-app/pages/SignUp';
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

function App() {
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
  );
}

export default App;
