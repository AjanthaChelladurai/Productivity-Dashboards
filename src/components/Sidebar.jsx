import React from "react";
import { FaHome, FaTasks, FaBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
    
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

    
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-white shadow-lg px-4 py-6 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:flex md:flex-col`}
      >
        <h1 className="text-xl font-bold text-blue-800 mb-10 text-center">
          Smart Dashboard
        </h1>

        <nav className="space-y-4">
          <NavLink to="/dashboard" className="sidebar-btn" onClick={toggleSidebar}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/tasks" className="sidebar-btn" onClick={toggleSidebar}>
            <FaTasks /> Tasks
          </NavLink>

          <NavLink to="/diary" className="sidebar-btn" onClick={toggleSidebar}>
            <FaBook /> Notes
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
