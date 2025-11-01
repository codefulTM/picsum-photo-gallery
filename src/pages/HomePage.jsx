/**
 * HomePage Component
 *
 * The landing page of the Picsum Photo Gallery application.
 * Displays a welcome message, call-to-action buttons, and a sample photo grid.
 * Serves as the entry point for users to explore the photo gallery.
 */

// React and Routing
import { useNavigate } from "react-router-dom";

// Components
import { Button } from "../components/common";

/**
 * HomePage Function Component
 *
 * Returns the JSX for the HomePage component
 */
export default function HomePage() {
  // Navigation hook to redirect to other routes
  const navigate = useNavigate();

  return (
    <>
      {/**
       * Container element for the HomePage component
       *
       * Applies a gradient background, flexbox layout, and padding
       */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-6">
        {/**
         * Inner container element for the welcome message and buttons
         *
         * Applies a maximum width, horizontal margin, and text alignment
         */}
        <div className="max-w-4xl mx-auto text-center">
          {/**
           * Welcome message heading
           *
           * Displays the title of the application
           */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Picsum Gallery
          </h1>
          {/**
           * Welcome message paragraph
           *
           * Displays a brief description of the application
           */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Picsum Gallery
          </h1>
          {/**
           * Welcome message paragraph
           *
           * Displays a brief description of the application
           */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore a beautiful collection of free-to-use photos from Picsum
            Photos. Perfect for your next project or just for inspiration.
          </p>
          {/**
           * Container element for the call-to-action buttons
           *
           * Applies a flexbox layout and horizontal margin
           */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Browse Photos button * Redirects to the photos route when clicked */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/photos")}
              className="w-full sm:w-auto"
            >
              Browse Photos
            </Button>
            {/* Visit Picsum button * Opens the Picsum Photos website in a new tab when clicked */}
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.open("https://picsum.photos", "_blank")}
              className="w-full sm:w-auto"
            >
              Visit Picsum
            </Button>
          </div>
        </div>
        {/**
         * Sample photo grid
         *
         * Displays a grid of sample photos from Picsum Photos
         */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105"
            >
              <img
                src={`https://picsum.photos/seed/${item * 100}/400/400`}
                alt="Sample"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
