/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner with customizable size and color.
 * Can be used as a full-page overlay or inline component.
 */

// React
import React from 'react';

// Prop Types
import PropTypes from 'prop-types';

/**
 * LoadingSpinner Component
 * 
 * @param {Object} props - Component props
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size of the spinner
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.fullScreen=false] - Whether to show as full-screen overlay
 * @returns {JSX.Element} Rendered LoadingSpinner component
 */
const LoadingSpinner = ({ size = 'md', className = '', fullScreen = false, label = 'Loading...' }) => {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-t-2 border-indigo-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {label && (
        <span className="mt-2 text-sm text-gray-600">
          {label}
        </span>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  label: PropTypes.string,
};

export default LoadingSpinner;
