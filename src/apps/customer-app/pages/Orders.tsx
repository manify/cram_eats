import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userBasket");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const storedName = localStorage.getItem("userName") || localStorage.getItem("userEmail")?.split("@")[0] || "Guest";
  const userInitial = storedName.charAt(0).toUpperCase();
  const location = localStorage.getItem("userLocation") || "25 Avenue des Mazades";

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-50 p-6 space-y-6 hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-lg">
              {userInitial}
            </div>
            <div>
              <h2 className="font-medium text-base">{storedName}</h2>
              <p className="text-sm text-green-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Back to Home</p>
            </div>
          </div>

          <nav className="mt-6 space-y-4 text-sm font-medium">
            <a onClick={() => navigate('/dashboard')} className="flex items-center text-neutral-900 px-3 py-2 cursor-pointer">Home</a>
            <a className="flex items-center text-white bg-green-400 px-3 py-2 rounded-3xl cursor-pointer">Orders</a>
            <a className="flex items-center text-neutral-900 px-3 py-2">Notifications</a>
            <a className="flex items-center text-neutral-900 px-3 py-2">Account</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex w-full md:w-1/2 items-center bg-yellow-50 px-4 py-2 rounded-xl border border-gray-200">
              <span className="text-green-400">Orders for {location}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 border"></div>
          </header>

          <section>
            <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No items in your basket.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden p-4 border border-gray-100">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-green-600 font-bold mt-1">{item.price.toFixed(2)} €</p>
                    <p className="text-sm text-emerald-700 mt-1">Status: <span className="font-medium">Pending</span></p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
