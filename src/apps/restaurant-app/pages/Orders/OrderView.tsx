import React, { useState } from 'react';
import { Order } from '../../types/Order';
import OrderDetailsModal from '../../../restaurant-app/models/OrderDetailsModal';

interface OrdersViewProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({ 
  orders, 
  onViewOrder,
  onUpdateOrderStatus 
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div
          key={order.id}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
              <div className="text-xs text-gray-500">
                {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setSelectedOrder(order)}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      ))}

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onUpdateStatus={onUpdateOrderStatus}
        />
      )}
    </div>
  );
};

export default OrdersView;