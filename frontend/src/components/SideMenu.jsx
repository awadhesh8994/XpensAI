import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaListUl,
  FaRobot,
  FaUser,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const menuItems = [
  { name: "Home", icon: <FaHome />, path: "/dashboard" },
  {
    name: "Add Expense",
    icon: <FaPlusCircle />,
    path: "/dashboard/add-expense",
  },
  { name: "View Expense", icon: <FaListUl />, path: "/dashboard/expenses" },
  { name: "Assistant", icon: <FaRobot />, path: "/dashboard/assistant" },
  { name: "Rohit", icon: <FaUser />, path: "/user" },
  { name: "Logout", icon: <FaLongArrowAltUp />, path: "/user" },
];

function SideMenu() {
  const location = useLocation();

  return (
    <div className="fixed top-16 h-screen w-64 bg-gray-900 text-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold text-white border-b border-gray-700">
        Dashboard
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-4 px-4 py-3 rounded-md transition duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SideMenu;
