import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInRestaurant from './SignInRestaurant';
import { SignUpForm }  from '../../restaurant-app/pages/SignUpForm';
import Layout from '../../customer-app/components/ui/Layout';
import { AccountTypeSelector } from '../components/AccountTypeSelector';

export const SignUpRestaurant: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/restaurantdashboard');
  };

  return (
    <Layout>
    <div className="overflow-hidden bg-white">
      <div className="flex flex-col items-center pt-4 w-full bg-yellow-50 max-md:max-w-full">
        <main className="flex flex-col items-center">
          <section className="text-center mt-11 max-md:mt-10">
            <h1 className="text-4xl font-medium leading-none text-center text-neutral-900">
              Join CramEats
            </h1>
            <p className="mt-5 text-xl leading-snug text-center text-slate-500">
              Create your restaurant account to get started
            </p>
          </section>
          <AccountTypeSelector/>
        
          
        </main>
      </div>
    <SignUpForm/>
    </div>
    </Layout>
  );
}