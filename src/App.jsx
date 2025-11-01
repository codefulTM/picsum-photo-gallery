/**
 * Main Application Component
 * 
 * This is the root component of the Picsum Photo Gallery application.
 * It sets up the routing configuration using React Router.
 */

// React and Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { MainLayout } from "./components/layout";

// Pages
import HomePage from "./pages/HomePage";
import PhotosPage from "./pages/PhotosPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

// Global Styles
import "./index.css";

/**
 * App Component
 * 
 * Sets up the main routing structure of the application.
 * Wraps all routes with MainLayout for consistent UI.
 * 
 * Routes:
 * - / : Home page with welcome message and sample photos
 * - /photos : Grid view of all photos
 * - /photos/:id : Detailed view of a single photo
 * - * : 404 Not Found page for any undefined routes
 */
function App() {
  return (
    <BrowserRouter>
      <MainLayout title="Picsum Photo Gallery">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/photos/:id" element={<PhotoDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
