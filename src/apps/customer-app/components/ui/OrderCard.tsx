import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import clsx from 'clsx';

interface Item {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
export interface OrderCardProps {
  id: string;
  items: Item[];
  restaurant: string;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'READY'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';
  orderTime: string;
  estimatedDelivery?: string;
  total: number;
  onTrackOrder?: () => void;
}

/* colour helpers */
const badgeColour = (s: OrderCardProps['status']) =>
  ({
    PENDING:           'bg-gray-100 text-gray-600',
    CONFIRMED:         'bg-blue-100 text-blue-600',
    PREPARING:         'bg-orange-100 text-orange-600',
    READY:             'bg-purple-100 text-purple-600',
    OUT_FOR_DELIVERY:  'bg-indigo-100 text-indigo-600',
    DELIVERED:         'bg-green-100 text-green-600',
    CANCELLED:         'bg-red-100 text-red-600',
  }[s]);

const badgeText = (s: OrderCardProps['status']) =>
  ({
    PENDING:          'Pending',
    CONFIRMED:        'Confirmed',
    PREPARING:        'Being Prepared',
    READY:            'Ready for Pickup',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED:        'Delivered',
    CANCELLED:        'Cancelled',
  }[s]);

/* ――― CARD ――― */
const OrderCard: React.FC<OrderCardProps> = ({
  id,
  items,
  restaurant,
  status,
  orderTime,
  estimatedDelivery,
  total,
  onTrackOrder,
}) => (
  <article className="bg-white rounded-xl shadow p-6">
    {/* header row */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{restaurant}</h3>
        <p className="text-sm text-gray-500">Order #{id}</p>
      </div>

      <span
        className={clsx(
          'px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap',
          badgeColour(status)
        )}
      >
        {badgeText(status)}
      </span>
    </div>

    {/* items */}
    <div className="divide-y mt-4">
      {items.map((it, i) => (
        <div key={i} className="py-3 flex justify-between items-center">
          <div>
            <p className="font-medium">{it.name}</p>
            <p className="text-xs text-gray-500">{it.description}</p>
            {it.quantity > 1 && (
              <p className="text-xs text-gray-400">Qty {it.quantity}</p>
            )}
          </div>
          <span className="font-medium text-green-600">
            €{(it.price * it.quantity).toFixed(2)}
          </span>
        </div>
      ))}
    </div>

    {/* footer */}
    <div className="border-t pt-4 mt-4 space-y-3">
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-green-600">€{total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Ordered at {orderTime}</span>
        </div>        {estimatedDelivery && status !== 'DELIVERED' && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Est. {estimatedDelivery}</span>
          </div>
        )}
      </div>      {status !== 'DELIVERED' && status !== 'CANCELLED' && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={onTrackOrder}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Track Order
          </button>
          <button className="flex items-center justify-center gap-1 border border-gray-300 text-gray-700 rounded-lg px-4 py-2">
            <Phone className="w-4 h-4" />
            Call Restaurant
          </button>
        </div>
      )}
    </div>
  </article>
);

export default OrderCard;
