import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAuth } from '../api/Auth/restaurantAuth';
import Layout from '../../customer-app/components/ui/Layout';

export const SignUpRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    cuisine: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('You must agree to the terms');
      return;
    }

    try {
      // Prepare the payload as a plain object matching SignupData type
      const payload = {
        ...formData,
        profileImage, // If SignupData expects a File or string for profileImage
      };

      await restaurantAuth.signup(payload);
      navigate('/restaurantdashboard');
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <Layout>
  <main className="flex justify-center items-center p-5 min-h-screen bg-[#FFF6E5]">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl pl-8 pr-8 pb-4 space-y-6">
      
      {/* Header */}
      <header className="flex justify-center items-center bg-green-400 rounded-t-lg h-[103px] max-sm:h-20 mr-[-2rem] ml-[-2rem]">
        <div className="flex flex-col gap-2 items-center max-sm:gap-1">
          <h1 className="text-2xl font-medium leading-8 text-center text-white max-md:text-2xl max-sm:text-xl max-sm:leading-7">
            Welcome
          </h1>
          <p className="text-base leading-6 text-center text-white max-md:text-base max-sm:text-sm max-sm:leading-5">
            Sign Up to your Restaurant account
          </p>
        </div>
      </header>

      {/* Error (conditionally rendered outside this snippet) */}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
            <input className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your full name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your email" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your phone number" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your address" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input type="file" accept="image/*" className="w-full" />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Business Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your business name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisine Type</label>
            <input className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g., Italian, Indian" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Create a password" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Confirm your password" required />
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="col-span-full space-y-4">
          <div className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2" />
            <label className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <a href="/restaurantsignin" className="text-green-600 font-medium">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  </main>
</Layout>
  );
};

export default SignUpRestaurant;
