import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Clock, Truck, Package,
  MapPin, Phone
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate   = useNavigate();
  const { getOrderById } = useCart();

  const order = orderId ? getOrderById(orderId) : undefined;

  /* ─── Guard ─────────────────────────────────────────── */
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="btn-primary"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  /* ─── Helpers ───────────────────────────────────────── */
  const icon = (Icon: any, completed: boolean) => (
    <Icon className={`w-6 h-6 ${completed ? 'text-green-600' : 'text-gray-400'}`} />
  );

  const getStatusIcon = (status: string, completed: boolean) => {
    switch (status) {
      case 'pending'          : return icon(Clock,      completed);
      case 'confirmed'        : return icon(CheckCircle,completed);
      case 'preparing'        : return icon(Package,    completed);
      case 'out_for_delivery' : return icon(Truck,      completed);
      case 'delivered'        : return icon(CheckCircle,completed);
      default                 : return icon(Clock,      completed);
    }
  };

  const timeFmt = (d: Date) => d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false,
  });

  /* ─── JSX ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <button
          onClick={() => navigate('/dashboard/orders')}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold ml-10 inline-block">Track Order</h1>
        <span className="ml-2 text-gray-500">#{order.id}</span>
      </div>

      <div className="max-w-4xl mx-auto p-6 grid lg:grid-cols-2 gap-6">
        {/* status timeline */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Order Status</h3>
            <div className="space-y-4">
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-full ${step.completed ? 'bg-green-100' : 'bg-gray-100'}`}
                  >
                    {getStatusIcon(step.status, step.completed)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.description}
                      </h4>
                      {step.completed && (
                        <span className="text-sm text-gray-500">{timeFmt(step.time)}</span>
                      )}
                    </div>
                    {idx < order.trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-3 mt-2 ${step.completed ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.status !== 'delivered' && order.estimatedDelivery && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">Estimated Delivery</h3>
              <div className="flex items-center space-x-2 text-green-600">
                <Clock className="w-5 h-5" />
                <span>{timeFmt(order.estimatedDelivery)}</span>
              </div>
            </div>
          )}
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* order details */}
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Order Details</h3>
            <div className="space-y-3 mb-4">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{it.name}</h4>
                    <p className="text-sm text-gray-600">{it.description}</p>
                    {it.quantity > 1 && (
                      <p className="text-sm text-gray-500">Qty: {it.quantity}</p>
                    )}
                  </div>
                  <span className="font-medium text-green-600">
                    €{(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span><span>€{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span><span>€{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span><span className="text-green-600">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* restaurant & delivery */}
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Restaurant & Delivery</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">{order.restaurant}</h4>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Phone className="w-4 h-4" /><span>Call Restaurant</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Delivery Address</h4>
                <div className="flex items-start space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5" /><span>{order.deliveryAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="space-y-3">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">Contact Support</button>
            {order.status !== 'delivered' && (
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">Call Restaurant</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
