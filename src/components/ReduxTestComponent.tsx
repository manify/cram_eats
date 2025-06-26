import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const ReduxTestComponent: React.FC = () => {
  const restaurantAuth = useSelector((state: RootState) => state.restaurantAuth);
  
  return (
    <div className="p-4 bg-blue-100 border border-blue-400 rounded">
      <h3 className="font-bold">Redux Test Component</h3>
      <p>Auth State: {restaurantAuth.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
      <p>Restaurant ID: {restaurantAuth.restaurantId || 'None'}</p>
      <p>Token: {restaurantAuth.token ? 'Present' : 'None'}</p>
    </div>
  );
};

export default ReduxTestComponent;
