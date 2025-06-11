// File: apps/customer-app/pages/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import signIn from '../api/auth/signIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
          required
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  );
}
