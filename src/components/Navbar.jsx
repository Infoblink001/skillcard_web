// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>
      </div>
      
      <div className="flex space-x-4">
        {!currentUser ? (
          <>
            <Link 
              to="/login" 
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link 
              to="/dashboard" 
              className="px-3 py-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;