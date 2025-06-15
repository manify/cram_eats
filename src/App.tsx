// File: apps/customer-app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
<<<<<<< HEAD
import ForgotPassword from './apps/customer-app/pages/ForgotPassword';
=======
import LandingPage from './apps/customer-app/pages/LandingPage';
import BecomePartner from './apps/customer-app/pages/BecomePartner';
>>>>>>> 83e7f53206f9f963f5e6c14038a91b16d5c535a6



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/LandingPage" />} /> */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
<<<<<<< HEAD
        <Route path="/forgot-password" element={<ForgotPassword />} />

=======
        <Route path="/becomepartner" element={<BecomePartner/>}/>
>>>>>>> 83e7f53206f9f963f5e6c14038a91b16d5c535a6

        <Route path="/dashboard" element={<div className="p-4 text-xl">Welcome to the Dashboard</div>} />
      </Routes>
    </Router>
  );
}

export default App;
