/**
 * PhotoDetailPage Component
 * 
 * Displays detailed view of a single photo with metadata and options to download.
 * Fetches photo details from the Picsum API based on the photo ID in the URL.
 */

// React and Routing
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import { PhotoViewer, PhotoMetadata } from "../components/photos";
import { Button, LoadingSpinner } from "../components/common";

/**
 * PhotoDetailPage Component
 * 
 * State:
 * - photo: The photo object containing all photo details
 * - loading: Boolean indicating if photo data is being loaded
 * - error: Error object if photo loading fails
 */
export default function PhotoDetailPage() {
  // Extract photo ID from URL parameters
  const { id } = useParams();
  
  // Component state
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Fetches photo details from the Picsum API
   * 
   * Handles loading state and error handling
   */
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://picsum.photos/id/${id}/info`);

        if (!response.ok) {
          throw new Error("Failed to fetch photo");
        }

        const data = await response.json();
        setPhoto(data);
      } catch (err) {
        setError(err.message || "Failed to load photo");
        console.error("Error fetching photo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPhoto();
    }
  }, [id]);

  /**
   * Handles the download of the current photo
   * Creates a temporary anchor element to trigger the download
   */
  const handleDownload = () => {
    if (!photo) return;

    // Create a temporary anchor element
    const link = document.createElement("a");
    
    // Set the download URL and filename
    link.href = `https://picsum.photos/id/${photo.id}/1200/800`;
    link.download = `picsum-${photo.id}.jpg`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Photo Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested photo could not be found."}
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Photo Details
          </h1>
          <p className="text-gray-500">
            Explore the details of this beautiful photograph
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8">
            <PhotoViewer photo={photo} className="w-full" />
          </div>

          <div className="space-y-6">
            <PhotoMetadata photo={photo} onDownload={handleDownload} />

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                About This Photo
              </h3>
              <p className="text-gray-600">
                {photo.author
                  ? `This beautiful photo was captured by ${photo.author}. It features a stunning image that showcases the photographer's unique perspective and artistic vision.`
                  : "A beautiful photo with unique perspective and artistic vision."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
