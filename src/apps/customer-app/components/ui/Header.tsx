import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import { ColorFilterType } from '../../../../types/colorFilter';

interface HeaderProps {
  colorFilter: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  setColorFilter: Dispatch<SetStateAction<ColorFilterType>>;
}

export default function Header({ colorFilter, setColorFilter }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  const handleBecomePartnerClick = () => {
    navigate('/becomepartner');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-stone-50">
      <div className="w-full bg-[#FFFBE6] max-w-[1470px] rounded-[40px] rounded-t-[70px] px-4 md:px-6 pt-3 pb-4 shadow-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="Cram Eats Logo"
            className="h-12 md:h-16 w-auto cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate('/')}
          />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-neutral-800 hover:text-amber-500 transition-colors font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-neutral-800 hover:text-amber-500 transition-colors font-medium">
              Menu
            </Link>
            <Link to="/contact" className="text-neutral-800 hover:text-amber-500 transition-colors font-medium">
              Contact
            </Link>
            <Link to="/restaurants" className="text-neutral-800 hover:text-amber-500 transition-colors font-medium">
              Restaurants
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="bg-amber-400 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-500 transition-colors shadow-sm"
              onClick={handleBecomePartnerClick}
            >
              Become a Partner
            </button>
            <button
              className="border-2 border-amber-400 text-amber-500 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-50 transition-colors"
              onClick={handleOrderNowClick}
            >
              Order Now
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 hover:bg-amber-100 rounded-lg transition-colors z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex items-center gap-3">
            <label htmlFor="cb-mode" className="text-sm text-neutral-700">Colorblind Mode:</label>
            <select
              id="cb-mode"
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value as typeof colorFilter)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="none">Normal</option>
              <option value="deuteranopia">Deuteranopia</option>
              <option value="protanopia">Protanopia</option>
              <option value="tritanopia">Tritanopia</option>
            </select>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-4 space-y-2 bg-white rounded-xl mt-2 shadow-md">
            <Link
              to="/"
              className="p-3 text-neutral-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="p-3 text-neutral-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className="p-3 text-neutral-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/restaurants"
              className="p-3 text-neutral-800 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <div className="grid gap-3 pt-2">
              <button
                className="w-full bg-amber-400 text-white p-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors shadow-sm"
                onClick={handleBecomePartnerClick}
              >
                Become a Partner
              </button>
              <button
                className="w-full border-2 border-amber-400 text-amber-500 p-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                onClick={handleOrderNowClick}
              >
                Order Now
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
