/**
 * Footer Component
 * 
 * The main footer component that displays copyright information and navigation links.
 * Stays fixed at the bottom of the page.
 */

// React
import React from 'react';

// Routing
import { Link } from 'react-router-dom';

// Prop Types
import PropTypes from 'prop-types';

/**
 * Footer Component
 * 
 * @param {string} className - Additional CSS class names for the footer component
 * @returns {JSX.Element} Rendered Footer component
 */
const Footer = ({ className = '' }) => {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://picsum.photos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Picsum Photos</span>
              <span>Powered by Picsum Photos</span>
            </a>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-base text-gray-500">
              &copy; {currentYear} Picsum Photo Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
