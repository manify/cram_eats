import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Bell, User, MapPin, LogOut } from 'lucide-react';
import HeaderClient from './HeaderClient';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const userName = localStorage.getItem("userName") || "chaimaabaoub09";
  const location = localStorage.getItem("userLocation") || "25 Avenue des Mazades";
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard/home', icon: Home, label: 'Home' },
    { to: '/dashboard/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { to: '/dashboard/account', icon: User, label: 'Account' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-[#FFFBE6] z-40">
          <HeaderClient />
        </div>

        {/* Sidebar */}
       <aside className="w-64 bg-[#FFFBE6] border-r p-6 hidden md:block fixed top-0 left-0 bottom-0 z-[60] shadow-lg">
  <div className="flex flex-col justify-between h-full">
    <div>
      {/* Logo at the top */}
      <div className="mb-6 flex justify-center">
        <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
      </div>

      

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-green-500 text-white shadow font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>


            {/* Logout at bottom */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 mt-[64px] md:ml-64">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
