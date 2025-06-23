import React from 'react';
import { Package, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../stores';
import { getUserOrders } from '../api/orders';
import OrderCard from '../components/ui/OrderCard';

/**
 * Orders dashboard – shows quick stats + list of current / past orders
 * (fetches orders from the database via API)
 */
const Orders: React.FC = () => {
  const { orders, fetchUserOrders } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);  const [error, setError] = React.useState<string | null>(null);
  const fetchingRef = React.useRef(false); // Use ref instead of state to prevent infinite loops
  // Fetch orders from backend when component mounts
  React.useEffect(() => {
    const loadOrders = async () => {
      if (!user?.id || fetchingRef.current) {
        if (!user?.id) {
          setError('User not authenticated');
          setIsLoading(false);
        }
        return;
      }

      fetchingRef.current = true;
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔍 Orders Page: Fetching orders for user:', user.id);
        
        // Get the authentication token
        const authState = useAuthStore.getState();
        const token = authState.token || authState.getToken();
        
        if (!token) {
          setError('Authentication token not found. Please sign in again.');
          setIsLoading(false);
          fetchingRef.current = false;
          return;
        }

        console.log('🔍 Orders Page: Using token for orders fetch:', !!token);

        // Fetch orders directly from API with token
        const response = await getUserOrders(user.id.toString(), {}, token);
        
        console.log('🔍 Orders Page: API response received:', response);
        
        if (response) {
          if (response.orders && Array.isArray(response.orders)) {
            console.log('✅ Orders Page: Orders fetched successfully:', response.orders.length);
            // Update the store with the fetched orders
            await fetchUserOrders();
          } else {
            console.log('❌ Orders Page: No orders array found in response');
            console.log('🔍 Orders Page: Response structure:', Object.keys(response));
          }
        } else {
          console.log('❌ Orders Page: No response received');
        }
      } catch (error) {
        console.error('❌ Orders Page: Failed to fetch orders:', error);
        setError('Failed to load orders. Please try again.');
      } finally {
        setIsLoading(false);
        fetchingRef.current = false;
      }
    };
    
    loadOrders();
  }, [user?.id, fetchUserOrders]); // Keep dependencies minimal

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
    <div className="space-y-8 animate-fade-in">      {/* banner */}
      <header className="rounded-2xl p-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Your Orders</h1>
            <p className="opacity-90">Track your current and past orders</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
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

        {isLoading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <div className="text-red-600 mb-4">⚠️ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            You haven't placed any orders yet.
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
