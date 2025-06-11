import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import signUp from '../api/auth/signUp';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}
