import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signup, { RestaurantSignupData } from '../api/signup';
import Layout from '../../customer-app/components/ui/Layout';

export const SignUpRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'restaurantOwner' as const,
    restaurantName: '',
    restaurantLat: 45.0,
    restaurantLong: 45.0,
    restaurantAddress: '',
    openingHours: '',
    closingHours: '',
    workingDays: [] as string[],
    phoneNumber: '',
    cuisineType: '',
    businessLicense: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWorkingDaysChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day) 
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    // Validate required fields
    const requiredFields = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      restaurantName: formData.restaurantName,
      restaurantAddress: formData.restaurantAddress
    };

    // Check for empty required fields
    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`Please provide: ${emptyFields.join(', ')}`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('You must agree to the terms');
      return;
    }

    try {
      setLoading(true);
      setError('');
        
      // Remove confirmPassword and create the API data object
      const { confirmPassword, ...signupData } = formData;

      await signup(signupData);
      navigate('/restaurantdashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Add this function to test the API with sample data
  const testAPI = async () => {
    try {
      setLoading(true);
      setError('');

      const testData: RestaurantSignupData = {
        email: "john.doe@exdsdsample.com",
        password: "SecurePass123!",
        firstName: "Jo",
        lastName: "Do",
        role: 'restaurantOwner',
        restaurantName: "Gourmet Delight",
        restaurantAddress: "123 Food Street, New York, NY",
        restaurantLat: 40.7128,
        restaurantLong: -74.0060,
        openingHours: "08:00",
        closingHours: "22:00",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        phoneNumber: "123-456-7890",
        cuisineType: "International",
        businessLicense: ""
      };

      console.log('Data being sent to API:', JSON.stringify(testData, null, 2));
      const response = await signup(testData);
      console.log('API Response:', response);
      navigate('/restaurantdashboard');
    } catch (err) {
      console.error('Full error object:', err);
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="restaurantAddress"
                  value={formData.restaurantAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input type="file" accept="image/*" className="w-full" />
              </div>
            </div>

            {/* Business Information */}
            <div>
  <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
  <input
    name="openingHours"
    type="time"
    value={formData.openingHours}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-md px-3 py-2"
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Closing Hours</label>
  <input
    name="closingHours"
    type="time"
    value={formData.closingHours}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-md px-3 py-2"
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Working Days</label>
  <div className="grid grid-cols-2 gap-2">
    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
      <label key={day} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.workingDays.includes(day)}
          onChange={() => handleWorkingDaysChange(day)}
          className="rounded border-gray-300"
        />
        <span className="text-sm">{day}</span>
      </label>
    ))}
  </div>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Business License</label>
  <input
    name="businessLicense"
    value={formData.businessLicense}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-md px-3 py-2"
    placeholder="Optional"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
  <input
    name="restaurantName"
    value={formData.restaurantName}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-md px-3 py-2"
    required
  />
</div>


            {/* Terms and Submit */}
            <div className="col-span-full space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-2"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <label className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
                </label>
              </div>
              <button 
  type="button" 
  onClick={testAPI}
  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition mb-4"
  disabled={loading}
>
  {loading ? 'Testing API...' : 'Test API with Sample Data'}
</button>

              <button 
                type="submit" 
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account? <a href="/restaurantsignin" className="text-green-600 font-medium">Sign in</a>
              </p>
            </div>
          </form>

          {/* Add this button somewhere in your form for testing */}
          <div className="col-span-full">
            <button 
              onClick={testAPI} 
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Testing API...' : 'Test API with Sample Data'}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SignUpRestaurant;
