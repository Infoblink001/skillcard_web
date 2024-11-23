// src/components/WelcomeScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleSignInButton from './GoolgeSignInButton';

const WelcomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-12 text-center">
          {/* Logo/Brand */}
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Welcome to MyApp
            </h1>
            <p className="text-lg text-white/80">
              Your all-in-one solution for managing tasks and staying organized
            </p>
          </div>

          {/* Auth Options */}
          <div className="space-y-6">
            {/* Google Sign In */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">
                Get Started Now
              </h2>
              <GoogleSignInButton />
            </div>

            {/* Traditional Auth Options */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/login"
                className="w-full py-3 px-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 border-2 border-white/20"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-6 text-sm text-white/60">
            <a href="#" className="hover:text-white mx-2">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white mx-2">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;