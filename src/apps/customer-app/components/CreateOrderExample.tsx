import React, { useState } from 'react';
import { useCreateOrder } from '../hooks/useCreateOrder';

interface OrderItem {
  itemId: number;
  quantity: number;
  name: string;
  price: number;
}

interface CreateOrderExampleProps {
  restaurantId: number;
  items: OrderItem[];
}

const CreateOrderExample: React.FC<CreateOrderExampleProps> = ({ restaurantId, items }) => {
  const { submitOrder, isLoading, error, clearError } = useCreateOrder();
  const [orderResult, setOrderResult] = useState<any>(null);

  const handleCreateOrder = async () => {
    clearError();
    
    // Calculate total price
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare items for API (only itemId and quantity)
    const orderItems = items.map(item => ({
      itemId: item.itemId,
      quantity: item.quantity
    }));

    const result = await submitOrder(restaurantId, totalPrice, orderItems);
    if (result) {
      setOrderResult(result);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      
      {/* Order Summary */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Order Items:</h3>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 font-bold">
          Total: ${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Display */}
      {orderResult && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Order created successfully! Order ID: {orderResult.order.id}
          <br />
          Status: {orderResult.order.status}
          <br />
          Total: ${orderResult.order.totalPrice}
        </div>
      )}

      {/* Create Order Button */}
      <button
        onClick={handleCreateOrder}
        disabled={isLoading || items.length === 0}
        className={`w-full py-2 px-4 rounded font-semibold ${
          isLoading || items.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Creating Order...' : 'Create Order'}
      </button>
    </div>
  );
};

export default CreateOrderExample;
