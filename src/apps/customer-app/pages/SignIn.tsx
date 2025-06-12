"use client";
import * as React from "react";
import { LoginHeader } from "../components/ui/LoginHeader";
import { InputField } from "../components/ui/input";
import { RememberMeSection } from "../components/ui/RememberMeSection";
import { SignInButton } from "../components/ui/SignInButton";
import { SignUpLink } from "../components/ui/SignUpLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signIn from "../api/auth/signIn";
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  function handleSignUp(): void {
    throw new Error("Function not implemented.");
  }

  // const handleEmailChange = (email: string) => {
  //   setFormData(prev => ({ ...prev, email }));
  // };

  // const handlePasswordChange = (password: string) => {
  //   setFormData(prev => ({ ...prev, password }));
  // };

  // const handleRememberMeChange = (rememberMe: boolean) => {
  //   setFormData(prev => ({ ...prev, rememberMe }));
  // };

  

  // const handleForgotPassword = () => {
  //   onForgotPassword?.();
  // };

  // const handleSignUp = () => {
  //   onSignUp?.();
  // };

  return (
    <main className="flex justify-center items-center p-5 min-h-screen bg-neutral-100 max-sm:p-2.5">
    <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg h-[516px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[500px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:min-h-[480px]">
      <LoginHeader />

      <form onSubmit={handleSubmit} className="px-56 pt-9 pb-0 max-md:px-10 max-md:pt-9 max-md:pb-0 max-sm:px-5 max-sm:pt-6 max-sm:pb-0">
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
          rememberMe={false}
          onRememberMeChange={() => {}}
          onForgotPasswordClick={() => alert('Forgot password clicked')}
        />

        <SignInButton
          onClick={() => handleSubmit}
          disabled={!email || !password}
        />
      </form>

      <SignUpLink onSignUpClick={handleSignUpClick} />
    </div>
    </main>
  );
}