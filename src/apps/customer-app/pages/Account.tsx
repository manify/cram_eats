import React, { useState } from "react";
import { useCart } from '../contexts/CartContext';

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
  
  // Initialize user data from memory (simulating logged-in user data)
 const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const [userData, setUserData] = useState({
  name: parsedUser?.name || "User",
  email: parsedUser?.email || "user@example.com",
  phone: "+33 6 12 34 56 78",
  addressLine1: "25 Avenue des Mazades",
  addressLine2: "31200 Toulouse, France",
});


  const userStats = {
    totalOrders: 47,
    totalSpent: 342.5,
    avgRating: 4.8,
    memberSince: "January 2023",
  };

  // Sample full order history
  const orders = [
    { id: "1", date: "2025-06-10", restaurant: "Pasta House", total: 25.5, status: "Delivered" },
    { id: "2", date: "2025-06-05", restaurant: "Sushi World", total: 40.0, status: "Delivered" },
    { id: "3", date: "2025-05-30", restaurant: "Burger Hub", total: 15.75, status: "Cancelled" },
    { id: "4", date: "2025-05-20", restaurant: "Taco Town", total: 22.3, status: "Delivered" },
    { id: "5", date: "2025-05-10", restaurant: "Pizza Palace", total: 30.0, status: "Delivered" },
  ];

  // Editable fields
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [addressLine1, setAddressLine1] = useState(userData.addressLine1);
  const [addressLine2, setAddressLine2] = useState(userData.addressLine2);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Extract display name from email or use full name
  const getDisplayName = () => {
    return userData.name || email.split("@")[0] || "User";
  };

  // Handler for saving profile changes
  const saveProfile = () => {
    if (password || passwordConfirm) {
      if (password !== passwordConfirm) {
        setPasswordError("Passwords do not match");
        return;
      }
      // Password change logic here
    }
    
    // Update user data
    setUserData(prev => ({
      ...prev,
      email: email,
      phone: phone
    }));
    
    setPasswordError("");
    setIsEditingProfile(false);
    setPassword("");
    setPasswordConfirm("");
    // API call to save profile info here
  };

  // Handler for saving address changes
  const saveAddress = () => {
    // Update user data
    setUserData(prev => ({
      ...prev,
      addressLine1: addressLine1,
      addressLine2: addressLine2
    }));
    
    setIsEditingAddress(false);
    // API call to save address info here
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
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            value={userStats.totalOrders}
            label="Total Orders"
            iconBg="bg-blue-100"
            Icon={Gift}
            iconColor="text-blue-600"
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
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order History</h3>
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
                            : "bg-red-100 text-red-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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