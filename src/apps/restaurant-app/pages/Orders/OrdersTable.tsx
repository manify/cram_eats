import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Order } from '../../../restaurant-app/types/Order';
import OrderDetailsModal from '../../models/OrderDetailsModal';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus?: (orderId: string, status: Order['status']) => void; // Add this line
}

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusConfig = {
    delivered: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Delivered'
    },
    preparing: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      label: 'Preparing'
    },
    ready: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Ready for Pickup'
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Cancelled'
    },
    pending: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Pending'
    }
  } as const;

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const OrdersTable: React.FC<OrdersTableProps> = ({ 
  orders, 
  onViewOrder,
  onUpdateStatus 
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-yellow-50 border-b border-gray-200">
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Order ID</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Total</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr 
              key={order.id} 
              className={`hover:bg-gray-50 transition-colors duration-150 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
              }`}
            >
              <td className="py-4 px-6">
                <span className="font-mono text-sm font-medium text-gray-900">
                  {order.id}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium text-gray-900">{order.customerName}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-gray-600">
                  {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
                </span>
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={order.status} />
              </td>
              <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">
                  ${order.total.toFixed(2)}
                </span>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => onViewOrder(order)}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-150"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onUpdateStatus={onUpdateStatus || (() => {})}
        />
      )}
    </div>
  );
};

export default OrdersTable;