/**
 * Button Component
 * 
 * A reusable button component with multiple variants and sizes.
 * Supports loading state and full-width option.
 */

// React
import React from 'react';

// Prop Types
import PropTypes from 'prop-types';

/**
 * Button component props
 * 
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content
 * @property {function} onClick - Click event handler
 * @property {string} variant - Button variant (primary, secondary, danger)
 * @property {string} size - Button size (sm, md, lg)
 * @property {string} className - Additional CSS classes
 * @property {boolean} disabled - Disabled state
 * @property {string} type - Button type (button, submit, reset)
 */

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

  // Variant classes for different button styles
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Size classes for different button sizes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // State classes for different button states
  const stateClasses = {
    'opacity-70 cursor-not-allowed': disabled,  // Disabled state
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
