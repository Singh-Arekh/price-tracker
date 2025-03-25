import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">MyShop</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex space-x-8 items-center">
          <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/shop" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Shop
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
