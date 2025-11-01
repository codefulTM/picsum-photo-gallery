/**
 * NotFoundPage Component
 * 
 * Displays a 404 error page when a user navigates to a non-existent route.
 * Provides navigation options to help users get back to the main content.
 */

// React and Routing
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '../components/common';

/**
 * NotFoundPage Component
 * 
 * Renders a user-friendly 404 error page with navigation options.
 */
export default function NotFoundPage() {
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handles navigation back to the previous page
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /**
   * Handles navigation to the home page
   */
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={handleGoBack}
            className="w-full sm:w-auto"
          >
            ← Go Back
          </Button>
          <Button 
            variant="secondary"
            onClick={handleGoHome}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Need help?{' '}
          <a 
            href="mailto:support@picsum.com" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
