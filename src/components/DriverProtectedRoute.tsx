import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface DriverProtectedRouteProps {
  children: React.ReactNode;
}

const DriverProtectedRoute: React.FC<DriverProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  // Check if driver is authenticated
  const driverToken = localStorage.getItem('driverToken');
  
  const isDriverAuthenticated = !!driverToken;

  if (!isDriverAuthenticated) {
    // Redirect to driver signin page with return URL
    return <Navigate to="/driver-signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default DriverProtectedRoute;
