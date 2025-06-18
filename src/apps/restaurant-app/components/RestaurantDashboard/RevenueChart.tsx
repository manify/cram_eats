import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 8500 },
  { month: 'Feb', revenue: 9200 },
  { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 10500 },
  { month: 'May', revenue: 11200 },
  { month: 'Jun', revenue: 12500 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-amber-200">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-sm font-bold text-amber-500">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FCD34D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#F59E0B"
          strokeWidth={2}
          fill="url(#revenueGradient)"
          dot={{ fill: '#F59E0B', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#F59E0B', stroke: '#FFF', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Delivered' | 'Preparing' | 'Cancelled';
  total: string;
}

const orders: Order[] = [
  { id: '#12345', customer: 'Ethan Carter', date: '2024-01-15', status: 'Delivered', total: '$25.50' },
  { id: '#12346', customer: 'Olivia Bennett', date: '2024-01-16', status: 'Preparing', total: '$32.75' },
  { id: '#12347', customer: 'Noah Thompson', date: '2024-01-17', status: 'Cancelled', total: '$18.99' },
  { id: '#12348', customer: 'Ava Martinez', date: '2024-01-18', status: 'Delivered', total: '$45.20' },
  { id: '#12349', customer: 'Liam Harris', date: '2024-01-19', status: 'Preparing', total: '$22.00' }
];

const getStatusBadgeClass = (status: Order['status']) => {
  const baseClass = "flex shrink-0 justify-center items-center self-stretch px-4 py-0 h-8 rounded-2xl max-w-[480px] min-w-[84px]";
  switch (status) {
    case 'Delivered':
      return `${baseClass} bg-green-100`;
    case 'Preparing':
      return `${baseClass} bg-yellow-100`;
    case 'Cancelled':
      return `${baseClass} bg-red-100`;
    default:
      return `${baseClass} bg-gray-100`;
  }
};

export const RecentOrdersTable: React.FC = () => {
  return (
    <section>
      <h2 className="self-stretch px-4 pt-5 pb-3 text-2xl font-bold leading-7 h-[60px] text-neutral-900 max-sm:text-xl max-sm:leading-7">
        Recent Orders
      </h2>
      <div className="flex flex-col items-start self-stretch px-4 py-3">
        <div className="flex items-start self-stretch bg-yellow-50 rounded-xl border border-solid border-amber-300 border-opacity-40 max-md:overflow-x-auto">
          <div className="flex flex-col items-start flex-[1_0_0]">
            <div className="flex flex-col items-start self-stretch">
              <header className="flex items-start self-stretch bg-amber-300 flex-[1_0_0] max-md:min-w-[800px]">
                <div className="self-stretch px-4 py-3 text-sm font-medium leading-5 text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                  Order ID
                </div>
                <div className="self-stretch px-4 py-3 text-sm font-medium leading-5 text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                  Customer
                </div>
                <div className="self-stretch px-4 py-3 text-sm font-medium leading-5 text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                  Date
                </div>
                <div className="self-stretch px-4 py-3 text-sm font-medium leading-5 text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                  Status
                </div>
                <div className="self-stretch px-4 py-3 text-sm font-medium leading-5 text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                  Total
                </div>
              </header>
            </div>
            <div className="flex flex-col items-start self-stretch">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="flex items-start self-stretch border-t border-solid border-t-gray-200 h-[72px] max-md:min-w-[800px]"
                >
                  <div className="self-stretch px-4 py-2 text-sm leading-5 h-[72px] text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                    {order.id}
                  </div>
                  <div className="self-stretch px-4 py-2 text-sm leading-5 h-[72px] text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                    {order.customer}
                  </div>
                  <div className="self-stretch px-4 py-2 text-sm leading-5 h-[72px] text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                    {order.date}
                  </div>
                  <div className="flex flex-col justify-center items-center px-4 py-2 h-[72px] max-sm:px-2 max-sm:py-1.5">
                    <div className={getStatusBadgeClass(order.status)}>
                      <span className="overflow-hidden self-stretch text-sm font-medium leading-5 text-center text-ellipsis text-neutral-900 max-sm:text-xs">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="self-stretch px-4 py-2 text-sm leading-5 h-[72px] text-neutral-900 max-sm:px-2 max-sm:py-1.5 max-sm:text-xs">
                    {order.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RecentOrdersTable;
