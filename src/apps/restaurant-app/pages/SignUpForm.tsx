import * as React from 'react';
import { BusinessInfoForm } from '../components/SignUpComponents/BusinessInfoForm';
import { PersonalInfoForm } from '../components/SignUpComponents/PersonalInfoForm';
import { SignUpHeader } from '../components/SignUpHeader';
import SignUpButton from '../components/SignUpComponents/SignUpButton';
import SignInRestaurant from './SignInRestaurant';
import { useNavigate } from 'react-router-dom';



export const SignUpForm: React.FC = () => {
    
const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/restaurantdashboard');
  };

  const [formData, setFormData] = React.useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',

    // Business Information
    restaurantName: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',
    cuisineType: '',
    businessPhone: '',
    businessEmail: '',
    taxId: '',
    openingHours: '',
    closingHours: '',
    deliveryRadius: '',
    acceptsOnlinePayment: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
   
    <main className="flex justify-center items-center p-5 min-h-screen bg-orange-50 max-sm:p-2.5">
      <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg w-[896px] max-md:max-w-[600px] max-md:w-[90%] max-sm:w-full">
        <SignUpHeader />

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid md:grid-cols-2 gap-8 max-md:grid-cols-1">
            <PersonalInfoForm formData={formData} handleChange={handleChange} />
            <BusinessInfoForm formData={formData} handleChange={handleChange} />
          </div>

          <div className="mt-8 flex justify-center">
            <SignUpButton 
            onClick={handleSignUpClick} />

            </div>
        </form>
      </div>
    </main>
  );
};