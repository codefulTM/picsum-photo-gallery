/**
 * PhotoGrid Component
 * 
 * A responsive grid layout for displaying photo cards with loading states.
 * Handles empty states, loading states, and infinite scrolling.
 */

// React
import React from 'react';

// Prop Types
import PropTypes from 'prop-types';

// Components
import PhotoCard from './PhotoCard';
import { LoadingSpinner } from '../common';

/**
 * PhotoGrid Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.photos - Array of photo objects to display
 * @param {boolean} props.loading - Whether the initial photos are loading
 * @param {boolean} props.loadingMore - Whether more photos are being loaded
 * @param {boolean} props.hasMore - Whether there are more photos to load
 * @param {Function} props.onRetry - Callback for retrying failed photo loads
 * @param {Function} props.onPhotoClick - Callback when a photo is clicked
 * @returns {JSX.Element} Rendered PhotoGrid component
 */
const PhotoGrid = ({
  photos,
  loading,
  loadingMore,
  hasMore,
  onRetry,
  onPhotoClick,
}) => {
  // Show loading spinner when loading initial photos
  // Show error state when there's an error loading photos
  if (loading && photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // Show empty state when there are no photos
  if (photos.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No photos found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={onPhotoClick || (() => {})}
          />
        ))}
      </div>

      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {!loading && !loadingMore && hasMore && (
        <div className="text-center">
          <button
            onClick={onRetry}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Load more photos
          </button>
        </div>
      )}

      {!loading && !loadingMore && !hasMore && (
        <div>
          <p className="text-center text-gray-500">No more photos</p>
        </div>
      )}
    </div>
  );
};

PhotoGrid.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      author: PropTypes.string.isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool,
  hasMore: PropTypes.bool,
  onRetry: PropTypes.func,
  onPhotoClick: PropTypes.func,
};

PhotoGrid.defaultProps = {
  loadingMore: false,
  hasMore: false,
  onRetry: () => {},
  onPhotoClick: null,
};

export default PhotoGrid;
