import React from 'react';

interface RestaurantStatusProps {
  isOpen: boolean;
}

const RestaurantStatus: React.FC<RestaurantStatusProps> = ({ isOpen }) => {
  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium">
      <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className={isOpen ? 'text-green-700' : 'text-red-700'}>
        {isOpen ? 'Open Now' : 'Closed'}
      </span>
    </div>
  );
};

export default RestaurantStatus;