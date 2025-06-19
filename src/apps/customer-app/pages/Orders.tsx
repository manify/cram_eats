import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores';
import OrderCard from '../components/ui/OrderCard';

/**
 * Orders dashboard – shows quick stats + list of current / past orders
 * (uses CartStore → orders[])
 */
const Orders: React.FC = () => {
  const { orders, fetchUserOrders } = useCartStore();
  const navigate = useNavigate();

  // Fetch orders from backend when component mounts
  React.useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  /* ─ helpers ─────────────────────────────────────────── */
  const stats = React.useMemo(() => {
    const total     = orders.length;
    const delivered = orders.filter(o => o.status === 'DELIVERED').length;
    const active    = total - delivered;                         // every non-delivered order
    return { total, active, delivered };
  }, [orders]);
  const fmtTime = (d?: Date | string) => {
    if (!d) return undefined;
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  /* ─ render ───────────────────────────────────────────── */
  return (
    <div className="space-y-8 animate-fade-in">
      {/* banner */}
      <header className="rounded-2xl p-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow">
        <h1 className="text-3xl font-extrabold mb-1">Your Orders</h1>
        <p className="opacity-90">Track your current and past orders</p>
      </header>

      {/* stat tiles */}
      <section className="grid gap-6 sm:grid-cols-3">
        <StatTile
          icon={<Package className="w-6 h-6 text-blue-600" />}
          label="Total Orders"
          value={stats.total}
          bg="bg-blue-100"
        />
        <StatTile
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          label="Active Orders"
          value={stats.active}
          bg="bg-orange-100"
        />
        <StatTile
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Delivered"
          value={stats.delivered}
          bg="bg-green-100"
        />
      </section>

      {/* list */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(o => (
              <OrderCard
                key={o.id}
                id={o.id}
                items={o.items}
                restaurant={o.restaurant}
                status={o.status}
                orderTime={fmtTime(o.orderTime)!}
                estimatedDelivery={fmtTime(o.estimatedDelivery)}
                total={o.total}
                onTrackOrder={() => navigate(`/order-tracking/${o.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

/* ――― small tile component ――― */
interface TileProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string; // tailwind colour (e.g. bg-blue-100)
}
const StatTile: React.FC<TileProps> = ({ icon, label, value, bg }) => (
  <div className="flex items-center gap-3 p-6 bg-white rounded-xl shadow">
    <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Orders;
