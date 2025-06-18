import React from 'react';
import { X } from 'lucide-react';
import { Order } from '../../restaurant-app/types/Order';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}) => {
  if (!isOpen) return null;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusOptions: Order['status'][] = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-medium">${order.total.toFixed(2)}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <div className="flex space-x-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(order.id, status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors
                    ${order.status === status 
                      ? statusColors[status]
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Instructions</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.specialInstructions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;