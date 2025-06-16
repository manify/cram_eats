// File: apps/customer-app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
import LandingPage from './apps/customer-app/pages/LandingPage';
import BecomePartner from './apps/customer-app/pages/BecomePartner';
import Dashboard from './apps/customer-app/pages/Dashboard';
import RestaurantPage from './apps/customer-app/pages/RestaurantPage';
import Orders from './apps/customer-app/pages/Orders';


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

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/orders" element={<Orders />} />


      </Routes>
    </Router>
  );
}

export default App;
