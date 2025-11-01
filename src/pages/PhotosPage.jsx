/**
 * PhotosPage Component
 * 
 * Displays a paginated grid of photos from the Picsum API.
 * Handles loading states, error handling, and infinite scrolling.
 * Users can click on photos to view them in detail.
 */

// React and Routing
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { PhotoGrid } from "../components/photos";

export default function PhotosPage() {
  // State variables to manage the photo grid
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Navigation hook to handle photo clicks
  const navigate = useNavigate();

  // Reference to track if a fetch is in progress
  const isFetchingRef = useRef(false);

  // Number of photos to load per page for pagination
  const PHOTOS_PER_PAGE = 12;

  /**
   * Fetches photos from the Picsum API
   * @param {number} page - The page number to fetch
   * @param {boolean} append - Whether to append to existing photos or replace them
   */
  const fetchPhotos = useCallback(
    async (page = 1, append = false) => {
      try {
        // Reset error state
        setError(null);

        // Set loading state based on append mode
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setPhotos([]);
        }

        // Fetch photos from the Picsum API
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${PHOTOS_PER_PAGE}`
        );

        // Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse response data
        const data = await response.json();

        // Validate response data
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }

        // Update state based on response data
        if (data.length === 0) {
          setHasMore(false);
        } else {
          if (append) {
            setPhotos((prev) => [...prev, ...data]);
          } else {
            setPhotos(data);
          }
          setCurrentPage(page);
        }
      } catch (err) {
        // Handle errors and update state
        console.error("Error fetching photos:", err);
        setError({
          message:
            err.message ||
            "Failed to load photos. Please check your connection and try again.",
          retry: () => fetchPhotos(page, append),
        });
        setHasMore(false);
      } finally {
        // Reset loading state
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [PHOTOS_PER_PAGE]
  );

  /**
   * Loads the next page of photos
   * Increments the page number and triggers a fetch for the next set of photos
   */
  const loadMorePhotos = useCallback(() => {
    // Check if a fetch is already in progress or if there are no more photos
    if (isFetchingRef.current || loadingMore || !hasMore) return;

    // Set flag to indicate a fetch is in progress
    isFetchingRef.current = true;

    // Fetch the next page of photos
    fetchPhotos(currentPage + 1, true).finally(() => {
      // Reset flag after fetch completes
      isFetchingRef.current = false;
    });
  }, [currentPage, loadingMore, hasMore, fetchPhotos]);

  // Handle photo click
  /**
   * Handles photo click events
   * @param {Object} photo - The photo object that was clicked
   * Navigates to the photo detail page for the selected photo
   */
  const handlePhotoClick = (photoId) => {
    navigate(`/photos/${photoId}`);
  };

  // Initial load
  useEffect(() => {
    fetchPhotos(1, false);
  }, [fetchPhotos]);

  // Scroll detection with throttling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollThreshold = 200; // pixels from bottom

      // Only trigger if we're near the bottom and not already fetching
      if (scrollTop + windowHeight >= documentHeight - scrollThreshold) {
        loadMorePhotos();
      }
    };

    // Add passive: true for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, [loadMorePhotos]);

  if (loading && photos.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100">
            <div className="animate-ping rounded-full h-12 w-12 bg-indigo-500 opacity-75"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={error.retry}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Picsum Photos</h1>
          <p className="text-sm text-gray-500">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'} loaded
          </p>
        </div>
        <PhotoGrid
          photos={photos}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onRetry={loadMorePhotos}
          onPhotoClick={handlePhotoClick}
        />
      </main>
    </div>
  );
}
