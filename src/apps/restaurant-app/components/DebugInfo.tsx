import React from 'react';

interface DebugInfoProps {
  restaurantId: string | number | null;
  loading: boolean;
  loadingMenu: boolean;
  menuItems: any[];
  orders: any[];
  restaurantData: any;
}

const DebugInfo: React.FC<DebugInfoProps> = ({
  restaurantId,
  loading,
  loadingMenu,
  menuItems,
  orders,
  restaurantData
}) => {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg max-w-md z-50 text-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Restaurant ID:</strong> {restaurantId || 'Not found'}</div>
        <div><strong>Loading Orders:</strong> {loading ? 'Yes' : 'No'}</div>
        <div><strong>Loading Menu:</strong> {loadingMenu ? 'Yes' : 'No'}</div>
        <div><strong>Menu Items Count:</strong> {menuItems.length}</div>
        <div><strong>Orders Count:</strong> {orders.length}</div>
        <div><strong>Restaurant Data:</strong> {restaurantData ? 'Loaded' : 'Not loaded'}</div>
        <div><strong>Token:</strong> {localStorage.getItem('restaurantToken') ? 'Present' : 'Missing'}</div>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer">Raw Data</summary>
        <pre className="text-xs mt-2 max-h-32 overflow-y-auto">
          {JSON.stringify({ restaurantId, menuItems, orders, restaurantData }, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default DebugInfo;
