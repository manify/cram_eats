import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';
import Input, { InputField } from '../components/ui/input';
import signUp from '../api/auth/signUp';
import { SignUpButton } from '../components/ui/SignUpButton';

// LoginHeader component with square corners
function LoginHeader() {
  return (
    <div className="bg-green-400 text-white text-center py-8 rounded-none">
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <p className="text-lg">Sign in to your account</p>
    </div>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Error creating account');
    }
  };

  return (
    <main className="flex justify-center items-center p-5 min-h-screen bg-neutral-100 max-sm:p-2.5">
      <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg h-[695px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[600px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:max-w-[400px] max-sm:min-h-[500px]">
        <LoginHeader />

        <section className="px-56 pt-9 pb-0 max-md:px-10 max-md:pt-9 max-md:pb-10 max-sm:px-8 max-sm:pt-6 max-sm:pb-8">
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail} 
              label={'Email Address'}
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
              onClick={() => handleSubmit}
              disabled={!email || !password} 
            />
          </form>
        </section>
      </div>
    </main>
  );
}