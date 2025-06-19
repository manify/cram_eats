"use client";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField } from '../components/ui/input';
import { SignUpButton } from '../components/ui/SignUpButton';
import { SignInLink } from '../components/ui/SignInLink';
import signUp from '../api/auth/signUp';
import Layout from '../components/ui/Layout';

function LoginHeader() {
  return (
    <div className="bg-green-400 text-white text-center py-8 rounded-none">
      <h1 className="text-2xl font-semibold">Create Your Account</h1>
      <p className="text-lg">Sign up to get started</p>
    </div>
  );
}

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await signUp(firstName, lastName, email, password, "client");
      const name = email.split('@')[0];
      localStorage.setItem("userName", name);
      navigate('/dashboard/home');
    } catch (error) {
      alert('Error creating account');
    }
  };

  return (
    <Layout>
      <main className="flex justify-center items-center min-h-screen bg-stone-50 px-4 sm:px-6 py-6">
        <div className="w-full max-w-[1470px] bg-[#FFFBE6] rounded-[40px] rounded-t-[70px] px-4 md:px-6 py-16 shadow-sm flex justify-center items-center">
          <div className="overflow-hidden bg-white rounded-2xl shadow-lg h-[695px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[600px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:max-w-[400px] max-sm:min-h-[500px]">
            <LoginHeader />
            <section className="px-56 pt-9 pb-0 max-md:px-10 max-md:pt-9 max-md:pb-10 max-sm:px-8 max-sm:pt-6 max-sm:pb-8">
             <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <InputField
      label="First Name"
      type="text"
      placeholder="First Name"
      value={firstName}
      onChange={setFirstName}
    />
    <InputField
      label="Last Name"
      type="text"
      placeholder="Last Name"
      value={lastName}
      onChange={setLastName}
    />
  </div>

                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  label="Email Address"
                />
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  showPasswordToggle={false}
                />
                <SignUpButton
                  onClick={handleSubmit}
                  disabled={!firstName || !lastName || !email || !password || !confirmPassword}
                />
              </form>
              <SignInLink onSignInClick={handleSignInClick} />
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
