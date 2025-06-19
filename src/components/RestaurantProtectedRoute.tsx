import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RestaurantProtectedRouteProps {
  children: React.ReactNode;
}

const RestaurantProtectedRoute: React.FC<RestaurantProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  // Check if restaurant is authenticated
  const restaurantUser = localStorage.getItem('restaurantUser');
  const restaurantToken = localStorage.getItem('restaurantToken');
  
  const isRestaurantAuthenticated = restaurantUser && restaurantToken;

  if (!isRestaurantAuthenticated) {
    // Redirect to restaurant signin page with return URL
    return <Navigate to="/restaurantsignin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RestaurantProtectedRoute;
