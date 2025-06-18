"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../customer-app/components/ui/Layout";

interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  deliveryAddress: string;
  orderStatus: string;
  orderTime: string;
  items: {
    name: string;
    quantity: number;
  }[];
  totalAmount: number;
}

const DriverDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/driver/orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/driver/orders/${orderId}/accept`, {
        method: 'POST',
      });
      fetchOrders(); // Refresh orders list
    } catch (err) {
      setError("Failed to accept order");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-400 text-white p-6">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <p className="text-lg">Available Orders</p>
        </header>

        <main className="container mx-auto px-4 py-8">
          {isLoading && (
            <div className="text-center">
              <p>Loading orders...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
                    <p className="text-gray-600">Order #{order.id}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Customer Details:</h4>
                  <p className="text-gray-700">{order.customerName}</p>
                  <p className="text-gray-700">{order.deliveryAddress}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Order Items:</h4>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <p className="font-semibold">Total: ${order.totalAmount}</p>
                    <p className="text-sm text-gray-600">{order.orderTime}</p>
                  </div>
                  {order.orderStatus === 'PENDING' && (
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Accept Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && !isLoading && (
            <div className="text-center text-gray-600">
              <p>No orders available at the moment</p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default DriverDashboard;