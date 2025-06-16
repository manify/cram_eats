
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
import LandingPage from './apps/customer-app/pages/LandingPage';
import BecomePartner from './apps/customer-app/pages/BecomePartner';
import SignInRestaurant from './apps/restaurant-app/pages/SignInRestaurant';

import { RestaurantDashboard } from './apps/restaurant-app/pages/RestaurantDashboard';
import { SignUpRestaurant } from './apps/restaurant-app/pages/SignUpRestaurant';



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/LandingPage" />} /> */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/becomepartner" element={<BecomePartner/>}/>

        <Route path="/dashboard" element={<div className="p-4 text-xl">Welcome to the Dashboard</div>} />
        <Route path="/restaurantsignin"  element={<SignInRestaurant/>}/>      
        <Route path="/restaurant-signup" element={<SignUpRestaurant />} />
        
        {/* Restaurant Dashboard */}
        <Route path="/restaurantdashboard"  element={<RestaurantDashboard/>}/>      
      </Routes>
    </Router>
  );
}

export default App;
