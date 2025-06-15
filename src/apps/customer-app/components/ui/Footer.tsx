import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  children?: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`bg-[#6BB786] text-black py-8 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-4">Cram Eats</h3>
            <p className="text-sm">Your favorite food delivery service</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
              <li><Link to="/menu" className="text-sm hover:underline">Menu</Link></li>
              <li><Link to="/restaurants" className="text-sm hover:underline">Restaurants</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@crameats.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Food Street</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add your social media icons/links here */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-black/10">
          <p className="text-sm">&copy; {new Date().getFullYear()} Cram Eats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;