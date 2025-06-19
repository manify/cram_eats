"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputField } from "../components/ui/input";
import { RememberMeSection } from "../components/ui/RememberMeSection";
import { SignInButton } from "../components/ui/SignInButton";
import { SignUpLink } from "../components/ui/SignUpLink";

import { useAuthStore } from "../stores";
import Layout from "../components/ui/Layout";
import { testServerConnection } from "../api/testConnection";

// Header of the sign-in page
function LoginHeader() {
  return (
    <div className="bg-green-400 text-white text-center py-8 rounded-none">
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <p className="text-lg">Sign in to your account</p>
    </div>
  );
}

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    console.log('Attempting to sign in with:', { email, password: '***' });
    
    try {
      await login(email, password);

      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Navigate to dashboard
      navigate('/dashboard/home');
    } catch (error) {
      // Error is handled by the store
      console.error('Login failed:', error);
    }
  };
  useEffect(() => {
    // Clear any previous errors
    clearError();
    
    // Test server connection when component mounts
    testServerConnection().then(isConnected => {
      if (!isConnected) {
        console.error('Server connection test failed - backend may be down');
      }
    });
    
    const savedEmail = localStorage.getItem("rememberedEmail");
    const tempEmail = localStorage.getItem("tempEmail");
    const tempPassword = localStorage.getItem("tempPassword");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    } else if (tempEmail && tempPassword) {
      setEmail(tempEmail);
      setPassword(tempPassword);
      localStorage.removeItem("tempEmail");
      localStorage.removeItem("tempPassword");
    }
  }, [clearError]);

  return (
    <Layout>
      <main className="flex justify-center items-center min-h-screen bg-stone-50 px-4 sm:px-6 py-6">
        <div className="w-full max-w-[1470px] bg-[#FFFBE6] rounded-[40px] rounded-t-[70px] px-4 md:px-6 py-16 shadow-sm flex justify-center items-center">
          <div className="overflow-hidden bg-white rounded-2xl shadow-lg h-[516px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[500px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:min-h-[480px]">
            <LoginHeader />
            <form onSubmit={handleSubmit} className="px-56 pt-9 max-md:px-10 max-sm:px-5">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
              />
              <RememberMeSection
                rememberMe={rememberMe}
                onRememberMeChange={() => setRememberMe(prev => !prev)}
                onForgotPasswordClick={() => alert('Forgot password clicked')}
              />
              <SignInButton
                onClick={handleSubmit}
                disabled={!email || !password || isLoading}
              />
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                </div>
              )}
            </form>
            <SignUpLink onSignUpClick={handleSignUpClick} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
