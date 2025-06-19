import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../apps/customer-app/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredAuth = true 
}) => {
  const { isAuthenticated, user, token } = useAuthStore();
  const location = useLocation();

  // Check multiple auth sources for backward compatibility
  const hasValidAuth = isAuthenticated && user && token;
  const hasLegacyAuth = localStorage.getItem('userName') || localStorage.getItem('authToken');
  
  const isUserAuthenticated = hasValidAuth || hasLegacyAuth;

  if (requiredAuth && !isUserAuthenticated) {
    // Redirect to signin page with return URL
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
