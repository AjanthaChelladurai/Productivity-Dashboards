import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 md:left-60 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">
  
      <button
        className="md:hidden text-xl text-black"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <h1 className="font-bold text-xl text-blue-800">Progress Pulse</h1>

      <button
        className="px-4 py-2 rounded-lg bg-gradient-to-b from-cyan-400 via-blue-600 to-indigo-900 text-white text-sm font-medium hover:opacity-90"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
