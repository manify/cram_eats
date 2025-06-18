import React from 'react';

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

export const RecentOrdersTable: React.FC = () => {
  return (
    <section className="w-full">
      <h2 className="px-6 py-4 text-2xl font-bold text-neutral-900 max-sm:text-xl">
        Recent Orders
      </h2>
      <div className="px-6 w-full">
        <div className="w-full overflow-x-auto bg-yellow-50 rounded-xl border border-amber-300 border-opacity-40">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-amber-300">
                <th className="w-[15%] px-6 py-4 text-sm font-medium text-left text-neutral-900">
                  Order ID
                </th>
                <th className="w-[25%] px-6 py-4 text-sm font-medium text-left text-neutral-900">
                  Customer
                </th>
                <th className="w-[20%] px-6 py-4 text-sm font-medium text-left text-neutral-900">
                  Date
                </th>
                <th className="w-[20%] px-6 py-4 text-sm font-medium text-left text-neutral-900">
                  Status
                </th>
                <th className="w-[20%] px-6 py-4 text-sm font-medium text-left text-neutral-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr 
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-yellow-100/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start">
                      <div className={getStatusBadgeClass(order.status)}>
                        <span className="text-sm font-medium">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Update the status badge styles
const getStatusBadgeClass = (status: Order['status']) => {
  const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case 'Delivered':
      return `${baseClass} bg-green-100 text-green-800`;
    case 'Preparing':
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    case 'Cancelled':
      return `${baseClass} bg-red-100 text-red-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
};
