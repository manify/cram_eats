"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  User,
  Settings,
  LogOut,
  Truck
} from "lucide-react";
import Layout from "../../customer-app/components/ui/Layout";
import { useNavigate } from "react-router-dom";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Mocked orders data
      const mockOrders: Order[] = [
        {
          id: "101",
          customerName: "Alice Smith",
          restaurantName: "Pizza Palace",
          deliveryAddress: "123 Main St",
          orderStatus: "PENDING",
          orderTime: "2025-06-19 12:30",
          items: [
            { name: "Pepperoni Pizza", quantity: 1 },
            { name: "Garlic Bread", quantity: 2 },
          ],
          totalAmount: 24.99,
        },
        {
          id: "102",
          customerName: "Bob Lee",
          restaurantName: "Sushi World",
          deliveryAddress: "456 Oak Ave",
          orderStatus: "PENDING",
          orderTime: "2025-06-19 12:45",
          items: [
            { name: "Salmon Roll", quantity: 3 },
          ],
          totalAmount: 18.5,
        },
      ];
      setOrders(mockOrders);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status in state (no backend)
  const handleAcceptOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: "ACCEPTED" }
          : order
      )
    );
  };

  // Add this function to delete (reject) an order
  const handleRejectOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out bg-[#FFFBE6] w-64 border-r border-gray-200 flex flex-col`}>
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
          <img src="/assets/logo.png" alt="" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            className={`flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 transition ${!showSettings ? "bg-green-100 font-semibold text-green" : ""}`}
            onClick={() => setShowSettings(false)}
          >
            <Menu className="mr-2" size={20} /> Orders
          </button>
          <button
            className={`flex items-center w-full px-3 py-2 rounded-lg text-green hover:bg-green-50 transition ${showSettings ? "bg-green-100 font-semibold text-green" : ""}`}
            onClick={() => setShowSettings(true)}
          >
            <Settings className="mr-2" size={20} /> Settings
          </button>
        </nav>
        <div className="pt-6 border-t border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-green-500 text-white px-4 py-4 shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden mr-2"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <Menu className="text-2xl" />
            </button>
            <h1 className="text-xl font-bold">Driver Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <User className="text-2xl" />
            <span className="font-medium">John Doe</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-8 bg-white">
          {!showSettings ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-green-700">Available Orders</h2>
              {isLoading && (
                <div className="flex justify-center items-center h-40">
                  <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></span>
                  <span className="ml-4 text-blue-500 font-semibold">Loading orders...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col p-4 sm:p-6 lg:p-8 h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{order.restaurantName}</h3>
                        <p className="text-gray-500 text-sm">Order #{order.id}</p>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1
                        ${order.orderStatus === "PENDING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"}
                      `}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-1 text-gray-700">Customer</h4>
                      <p className="text-gray-800 font-medium">{order.customerName}</p>
                      <p className="text-gray-600 text-sm">{order.deliveryAddress}</p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.deliveryAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-blue-600 hover:text-blue-800 underline text-xs font-medium"
                      >
                        View Directions
                      </a>
                      <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0, minHeight: 120 }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://www.google.com/maps?q=${encodeURIComponent(order.deliveryAddress)}&output=embed`}
                          title={`Map for ${order.deliveryAddress}`}
                        ></iframe>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-1 text-gray-700">Order Items</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            <span className="font-semibold">{item.quantity}x</span> {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 mt-auto gap-2">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-bold text-lg text-gray-800">Total: <span className="text-green-600">${order.totalAmount}</span></p>
                        <p className="text-xs text-gray-500">{order.orderTime}</p>
                      </div>
                      {order.orderStatus === 'PENDING' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptOrder(order.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectOrder(order.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {order.orderStatus === 'ACCEPTED' && (
                        <span className="text-green-600 font-semibold text-base">Accepted</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {orders.length === 0 && !isLoading && (
                <div className="text-center text-gray-400 text-lg mt-12">
                  <p>No orders available at the moment</p>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                <Settings size={22} /> Driver Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value="John Doe"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value="driver@email.com"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value="+1 555-123-4567"
                    readOnly
                  />
                </div>
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition w-full">
                  Edit Profile (Coming Soon)
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;