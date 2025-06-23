import React, { useState, useEffect } from "react";
import { useCartStore, useAuthStore } from '../stores';
import { getUserOrders } from '../api/orders';

import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Star,
  Gift,
  Settings,
  LogOut,
  Edit3,
  Phone,
  Mail,
  Calendar,
  Loader2,
} from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  iconBg: string;
  Icon: typeof User;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  iconBg,
  Icon,
  iconColor,
}) => (
  <div className="flex flex-col items-center py-6 text-center border border-gray-100 bg-white rounded-lg shadow-sm">
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

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  Icon,
  isActive,
  onClick,
}) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 capitalize ${
      isActive ? "bg-green-500 text-white shadow" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile");
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    avgRating: 4.8,
    memberSince: "January 2023",
  });
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  
  // Get user data from auth store or fallback to localStorage
  const userData = {
    name: user ? `${user.firstName} ${user.lastName}` : localStorage.getItem("userName") || "User",
    email: user?.email || localStorage.getItem("userEmail") || "user@example.com",
    phone: "+33 6 12 34 56 78", // This could be added to User interface later
    addressLine1: "25 Avenue des Mazades", // This could be added to User interface later
    addressLine2: "31200 Toulouse, France", // This could be added to User interface later
  };

  // Fetch user orders when component mounts
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user?.id) return;

      setIsLoadingOrders(true);
      setOrdersError(null);

      try {
        const response = await getUserOrders(user.id.toString());
        
        if (response && response.orders) {
          // Transform backend orders to match the expected format
          const transformedOrders = response.orders.map((order: any) => ({
            id: order.id.toString(),
            date: new Date(order.timestamp).toLocaleDateString(),
            restaurant: order.restaurant?.name || 'Unknown Restaurant',
            total: order.totalPrice,
            status: order.status === 'DELIVERED' ? 'Delivered' : 
                   order.status === 'CANCELLED' ? 'Cancelled' : 'In Progress'
          }));

          setOrders(transformedOrders);

          // Calculate user stats from real orders
          const totalOrders = transformedOrders.length;
          const totalSpent = transformedOrders.reduce((sum: number, order: any) => sum + order.total, 0);
          const deliveredOrders = transformedOrders.filter((order: any) => order.status === 'Delivered');
          
          setUserStats(prev => ({
            ...prev,
            totalOrders,
            totalSpent,
            // Could calculate actual average rating from order feedback in the future
          }));
        }
      } catch (error) {
        console.error('Failed to fetch user orders:', error);
        setOrdersError('Failed to load order history');
        // Use sample data as fallback
        setOrders([
          { id: "1", date: "2025-06-10", restaurant: "Pasta House", total: 25.5, status: "Delivered" },
          { id: "2", date: "2025-06-05", restaurant: "Sushi World", total: 40.0, status: "Delivered" },
        ]);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, [user?.id]);  // Editable fields - initialize with current user data
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [addressLine1, setAddressLine1] = useState(userData.addressLine1);
  const [addressLine2, setAddressLine2] = useState(userData.addressLine2);

  // Update editable fields when user data changes
  useEffect(() => {
    setEmail(userData.email);
    setPhone(userData.phone);
    setAddressLine1(userData.addressLine1);
    setAddressLine2(userData.addressLine2);
  }, [userData.email, userData.phone, userData.addressLine1, userData.addressLine2]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Extract display name from user data
  const getDisplayName = () => {
    return userData.name || "User";
  };

  // Handler for saving profile changes
  const saveProfile = () => {
    if (password || passwordConfirm) {
      if (password !== passwordConfirm) {
        setPasswordError("Passwords do not match");
        return;
      }
      // TODO: Password change logic here - integrate with auth API
    }
    
    // TODO: Update user profile via API
    // For now, just update local state
    setPasswordError("");
    setIsEditingProfile(false);
    setPassword("");
    setPasswordConfirm("");
    console.log('Profile update - Email:', email, 'Phone:', phone);
    // API call to save profile info would go here
  };

  // Handler for saving address changes
  const saveAddress = () => {
    // TODO: Update user address via API
    // For now, just update local state
    setIsEditingAddress(false);
    console.log('Address update - Line1:', addressLine1, 'Line2:', addressLine2);
    // API call to save address info would go here
  };

  // Handler for delete account action
  const deleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      // TODO: Add your delete account logic here (API call, logout, redirect, etc.)
      alert("Account deleted (this is a placeholder).");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        {/* Header with logged-in user info */}
        <header className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{getDisplayName()}</h1>
            <p className="text-indigo-100 text-sm">
              {userData.email}
            </p>
            <p className="text-indigo-200 text-xs">
              Premium member • since {userStats.memberSince}
            </p>
          </div>
        </header>        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            value={userStats.totalOrders}
            label="Total Orders"
            iconBg="bg-blue-100"
            Icon={Gift}
            iconColor="text-blue-600"
          />
          <StatCard
            value={`€${userStats.totalSpent.toFixed(2)}`}
            label="Total Spent"
            iconBg="bg-green-100"
            Icon={CreditCard}
            iconColor="text-green-600"
          />
          <StatCard
            value={userStats.avgRating}
            label="Avg Rating"
            iconBg="bg-yellow-100"
            Icon={Star}            iconColor="text-yellow-600"
          />
        </section>

        {/* Tabs */}
        <nav className="flex flex-wrap gap-2 border-b pb-4">
          <TabButton
            id="profile"
            label="Profile"
            Icon={User}
            isActive={activeTab === "profile"}
            onClick={(id) => setActiveTab(id as any)}
          />
          <TabButton
            id="orders"
            label="Order History"
            Icon={Gift}
            isActive={activeTab === "orders"}
            onClick={(id) => setActiveTab(id as any)}
          />
          <TabButton
            id="settings"
            label="Settings"
            Icon={Settings}
            isActive={activeTab === "settings"}
            onClick={(id) => setActiveTab(id as any)}
          />
        </nav>

        {/* Tab Panels */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Personal Information</h3>
                {!isEditingProfile ? (
                  <Edit3
                    className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-700"
                    onClick={() => setIsEditingProfile(true)}
                  />
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-600 font-medium text-sm"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setEmail(userData.email);
                        setPhone(userData.phone);
                        setPassword("");
                        setPasswordConfirm("");
                        setPasswordError("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-green-600 font-semibold text-sm"
                      onClick={saveProfile}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex flex-col flex-1">
                    <p className="text-gray-500">Email</p>
                    {!isEditingProfile ? (
                      <p className="font-medium">{userData.email}</p>
                    ) : (
                      <input
                        type="email"
                        className="border border-gray-300 rounded px-3 py-2 font-medium mt-1 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex flex-col flex-1">
                    <p className="text-gray-500">Phone</p>
                    {!isEditingProfile ? (
                      <p className="font-medium">{userData.phone}</p>
                    ) : (
                      <input
                        type="tel"
                        className="border border-gray-300 rounded px-3 py-2 font-medium mt-1 w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    )}
                  </div>
                </li>
                {/* Password edit */}
                {isEditingProfile && (
                  <>
                    <li className="flex items-start space-x-3">
                      <div className="w-5" />
                      <div className="flex flex-col w-full">
                        <label className="text-gray-500 mb-1">New Password (optional)</label>
                        <input
                          type="password"
                          className="border border-gray-300 rounded px-3 py-2 font-medium"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Leave blank to keep current password"
                        />
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5" />
                      <div className="flex flex-col w-full">
                        <label className="text-gray-500 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          className="border border-gray-300 rounded px-3 py-2 font-medium"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          placeholder="Confirm new password"
                        />
                        {passwordError && (
                          <span className="text-red-500 text-xs mt-1">{passwordError}</span>
                        )}
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* Address info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Address</h3>
                {!isEditingAddress ? (
                  <Edit3
                    className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-700"
                    onClick={() => setIsEditingAddress(true)}
                  />
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-600 font-medium text-sm"
                      onClick={() => {
                        setIsEditingAddress(false);
                        setAddressLine1(userData.addressLine1);
                        setAddressLine2(userData.addressLine2);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-green-600 font-semibold text-sm"
                      onClick={saveAddress}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex flex-col flex-1">
                    <p className="text-gray-500">Address Line 1</p>
                    {!isEditingAddress ? (
                      <p className="font-medium">{userData.addressLine1}</p>
                    ) : (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 font-medium mt-1 w-full"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                      />
                    )}
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex flex-col flex-1">
                    <p className="text-gray-500">Address Line 2</p>
                    {!isEditingAddress ? (
                      <p className="font-medium">{userData.addressLine2}</p>
                    ) : (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 font-medium mt-1 w-full"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order History</h3>
            
            {isLoadingOrders ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Loading orders...</span>
              </div>
            ) : ordersError ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{ordersError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
                <p className="text-sm text-gray-400 mt-1">Your order history will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Restaurant</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Total</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="px-4 py-2">{order.date}</td>
                        <td className="px-4 py-2">{order.restaurant}</td>
                        <td className="px-4 py-2">€{order.total.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
            <ul className="space-y-4 text-sm text-gray-700">
            
              <li className="flex items-center justify-between">
                <span>Privacy & Security</span>
                <button className="text-green-600 font-medium text-sm flex items-center space-x-1">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Manage</span>
                </button>
              </li>
              
              <li className="flex items-center justify-between">
                <span>Delete Account</span>
                <button
                  className="text-red-600 font-medium text-sm flex items-center space-x-1"
                  onClick={deleteAccount}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;