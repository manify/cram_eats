// File: apps/customer-app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../src/apps/customer-app/pages/SignIn';
import SignUp from './apps/customer-app/pages/SignUp';
import LandingPage from './apps/customer-app/pages/LandingPage';



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/LandingPage" />} /> */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />

        <Route path="/dashboard" element={<div className="p-4 text-xl">Welcome to the Dashboard</div>} />
      </Routes>
    </Router>
  );
}

export default App;
