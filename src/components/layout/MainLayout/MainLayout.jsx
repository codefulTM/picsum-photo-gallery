/**
 * MainLayout Component
 * 
 * The main layout wrapper that provides consistent structure across all pages.
 * Includes the header, main content area, and footer.
 */

// React
import React from 'react';

// React Router
import { useLocation } from 'react-router-dom';

// Prop Types
import PropTypes from 'prop-types';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * MainLayout Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render
 * @param {string} [props.title='Picsum Photo Gallery'] - The title to display in the header
 * @param {boolean} [props.showBackButton=false] - Whether to show the back button in the header
 * @param {boolean} [props.showFooter=true] - Whether to show the footer
 * @param {string} [props.className=''] - Additional CSS class names for the main content area
 * @returns {JSX.Element} Rendered MainLayout component
 */
const MainLayout = ({ 
  children, 
  title = 'Picsum Photo Gallery', 
  showBackButton = false, 
  showFooter = true,
  className = '' 
}) => {
  const location = useLocation();
  const isPhotoDetailPage = location.pathname.startsWith('/photos/');
  const displayBackButton = showBackButton || isPhotoDetailPage;
  return (
    // Main container with flex column layout
    <div className="min-h-screen flex flex-col">
      {/* Header with dynamic title and back button */}
      <Header 
        title={title} 
        showBackButton={displayBackButton} 
      />
      
      {/* Main content area that grows to fill available space */}
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      
      {/* Footer at the bottom of the page */}
      {showFooter && <Footer />}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  showFooter: PropTypes.bool,
  className: PropTypes.string,
};

export default MainLayout;
