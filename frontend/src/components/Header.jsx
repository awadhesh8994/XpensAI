import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  const { user, accessToken, logoutUser } = useAuthContext();
  const navigate = useNavigate();
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
          {!user && (
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition">
                <Link to={"/login"}> Login</Link>
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                <Link to={"/signup"}> Singup</Link>
              </button>
            </div>
          )}

          {user && (
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition">
                <Link to={"#"}> {user.username}</Link>
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                <Link
                  onClick={(e) => {
                    logoutUser();
                  }}
                  to={"#"}
                >
                  {" "}
                  Logout
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
