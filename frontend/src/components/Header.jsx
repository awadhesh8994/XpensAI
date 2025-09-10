import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-white  shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="flex-shrink-0 text-xl font-semibold text-gray-800">
            <Link to={"/"}> ExpenseMate</Link>
          </div>

          {/* Menu Links */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#"
              to={"/dashboard"}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Dashboard
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Reports
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Settings
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition">
              <Link to={"/login"}> Login</Link>
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              <Link to={"/signup"}> Singup</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
