// File: apps/customer-app/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img
          src="https://placehold.co/177x64/FED049/FED049"
          alt="Cram Eats Logo"
          className="h-16 w-auto"
        />

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-10 items-center">
          <Link to="/" className="text-sm text-black hover:underline">Home</Link>
          <Link to="/menu" className="text-sm text-black hover:underline">Menu</Link>
          <Link to="/contact" className="text-sm text-black hover:underline">Contact</Link>
          <Link to="/restaurants" className="text-sm text-black hover:underline">Restaurants</Link>
        </nav>

        {/* Buttons */}
        <div className="hidden sm:flex gap-3">
          <button className="bg-amber-300 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-amber-400">
            Become a Partner
          </button>
          <button className="border border-amber-300 text-amber-300 px-5 py-2 rounded-full font-bold text-sm hover:bg-amber-100">
            Order Now
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-2xl text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <HiMenu />
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-md px-6 pb-4">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-black" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="text-black" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
            <Link to="/contact" className="text-black" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/restaurants" className="text-black" onClick={() => setIsMobileMenuOpen(false)}>Restaurants</Link>
            <button className="bg-amber-300 text-white px-4 py-2 rounded-full font-bold mt-2">
              Become a Partner
            </button>
            <button className="border border-amber-300 text-amber-300 px-4 py-2 rounded-full font-bold">
              Order Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
