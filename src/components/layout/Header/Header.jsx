/**
 * Header Component
 * 
 * The main header component that displays the application title and navigation.
 * Includes a back button when not on the home page.
 */

// React
import React from "react";

// Routing
import { Link, useLocation } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

/**
 * Header Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title="Picsum Photo Gallery"] - The title to display in the header
 * @param {boolean} [props.showBackButton=false] - Whether to show the back button
 * @returns {JSX.Element} Rendered Header component
 */
const Header = ({ title = "Picsum Photo Gallery", showBackButton = false }) => {
  // Get current location to determine if we're on the home page
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/photos";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center">
          {showBackButton && !isHomePage && (
            <Link
              to="/photos"
              className="flex items-center text-indigo-600 hover:text-indigo-800 mr-6"
              aria-label="Back to gallery"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Gallery
            </Link>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        {!isHomePage && (
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <span className="mr-1">📷</span> Photo Details
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
};

export default Header;
