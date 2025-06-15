// File: apps/customer-app/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/ui/Layout';

export default function LandingPage() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Catering Platform</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Order delicious meals, manage your restaurant, or deliver food — all in one place.
        </p>
        <div className="space-x-4">
          <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">Sign In</Link>
          <Link to="/signup" className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400">Sign Up</Link>
        </div>
      </div>
    </Layout>
  );
}
