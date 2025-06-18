import React, { useState } from 'react';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Heart,
  Star,
  Gift,
  Settings,
  LogOut,
  Edit3,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

/*****************
 * HELPER TYPES  *
 *****************/
interface StatCardProps {
  value: string | number;
  label: string;
  iconBg: string; // bg-* utility (e.g. "bg-blue-100")
  Icon: typeof User;
  iconColor: string; // text-* utility (e.g. "text-blue-600")
}

/*****************
 * SMALL WIDGETS *
 *****************/
const StatCard: React.FC<StatCardProps> = ({ value, label, iconBg, Icon, iconColor }) => (
  <div className="card flex flex-col items-center py-6 text-center border border-gray-100">
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-3`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

interface TabButtonProps {
  id: string;
  label: string;
  Icon: typeof User;
  isActive: boolean;
  onClick: (id: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 capitalize ${
        isActive ? 'bg-green-500 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

/*********************
 * MAIN ACCOUNT PAGE *
 *********************/
const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings'>('profile');

  const userStats = {
    totalOrders: 47,
    favoriteRestaurants: 12,
    totalSpent: 342.5,
    avgRating: 4.8,
    memberSince: 'January 2023',
  };

  /* Mock data */
  const recentOrders = [
    { restaurant: 'The Italian Place', date: '2 days ago', amount: 21.5 },
    { restaurant: 'Sushi Express', date: '1 week ago', amount: 18.3 },
    { restaurant: 'Burger Haven', date: '1 week ago', amount: 15.2 },
  ];

  const favoriteRestaurants = [
    { name: 'The Italian Place', orders: 8, rating: 4.5 },
    { name: 'Sushi Express', orders: 6, rating: 4.2 },
    { name: 'Burger Haven', orders: 5, rating: 4.6 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-6 flex items-center space-x-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">chaimaabaoub09</h1>
          <p className="text-indigo-100 text-sm">Premium member • since {userStats.memberSince}</p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value={userStats.totalOrders}
          label="Total Orders"
          iconBg="bg-blue-100"
          Icon={Gift}
          iconColor="text-blue-600"
        />
        <StatCard
          value={userStats.favoriteRestaurants}
          label="Favorites"
          iconBg="bg-red-100"
          Icon={Heart}
          iconColor="text-red-600"
        />
        <StatCard
          value={`€${userStats.totalSpent}`}
          label="Total Spent"
          iconBg="bg-green-100"
          Icon={CreditCard}
          iconColor="text-green-600"
        />
        <StatCard
          value={userStats.avgRating}
          label="Avg Rating"
          iconBg="bg-yellow-100"
          Icon={Star}
          iconColor="text-yellow-600"
        />
      </section>

      {/* Tabs */}
      <nav className="flex flex-wrap gap-2 border-b pb-4">
        <TabButton id="profile" label="Profile" Icon={User} isActive={activeTab === 'profile'} onClick={id => setActiveTab(id as 'profile' | 'orders' | 'favorites' | 'settings')} />
        <TabButton id="orders" label="Order History" Icon={Gift} isActive={activeTab === 'orders'} onClick={id => setActiveTab(id as 'profile' | 'orders' | 'favorites' | 'settings')} />
        <TabButton id="favorites" label="Favorites" Icon={Heart} isActive={activeTab === 'favorites'} onClick={id => setActiveTab(id as 'profile' | 'orders' | 'favorites' | 'settings')} />
        <TabButton id="settings" label="Settings" Icon={Settings} isActive={activeTab === 'settings'} onClick={id => setActiveTab(id as 'profile' | 'orders' | 'favorites' | 'settings')} />
      </nav>

      {/* Tab Panels */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal info */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Personal Information</h3>
              <Edit3 className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">chaima.abaoub@email.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">+33 6 12 34 56 78</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-medium">{userStats.memberSince}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Delivery Address</h3>
              <Edit3 className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">25 Avenue des Mazades</p>
                <p className="text-gray-600">31200 Toulouse, France</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Default</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Orders</h3>
          {recentOrders.map((o, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <Gift className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{o.restaurant}</p>
                  <p className="text-xs text-gray-500">{o.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">€{o.amount}</p>
                <button className="text-xs text-gray-500 hover:text-green-600">Reorder</button>
              </div>
            </div>
          ))}
          <button className="btn-secondary w-full mt-2">View all orders</button>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Favorite Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRestaurants.map((rest, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rest.name}</h4>
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{rest.orders} orders</span>
                  <span className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> <span>{rest.rating}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* notifications */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Order Updates', description: 'Get notified about your order status', Icon: Bell },
                { label: 'Promotions', description: 'Receive special offers and deals', Icon: Gift },
              ].map(({ label, description, Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="toggle-bg peer" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* account actions */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md text-left transition">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>Privacy & Security</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md text-left transition">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span>Payment Methods</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 text-red-600 rounded-md text-left transition">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
