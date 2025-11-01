import React from 'react';
/**
 * PhotoCard Component
 * 
 * A reusable card component that displays a photo with a loading skeleton.
 * Uses lazy loading for better performance.
 */

// React and Routing
import { Link } from 'react-router-dom';

// Third-party Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// Prop Types
import PropTypes from 'prop-types';

/**
 * PhotoCard Component
 * 
 * @param {Object} props 
 * @param {Object} props.photo - The photo object containing id, author, width, and height
 * @param {Function} props.onClick - The callback function when the card is clicked
 * @returns {JSX.Element} The PhotoCard component
 */
const PhotoCard = ({ photo, onClick }) => {
  return (
    <div 
      /**
       * The container element with styles for the card
       */
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
      /**
       * Handle the click event on the card
       */
      onClick={() => onClick(photo.id)}
    >
      {/* 
        Generate the image URL with optimized dimensions for the grid
        Uses the Picsum API to get a properly sized image 
      */}
      <div 
        className="aspect-w-16 aspect-h-9 w-full overflow-hidden"
      >
        {(() => {
          const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;
          return (
            <LazyLoadImage
          /**
           * The image source URL
           */
          src={imageUrl}
          /**
           * The alt text for the image
           */
          alt={`Photo by ${photo.author}`}
          /**
           * The effect to use for lazy loading
           */
          effect="opacity"
          /**
           * The styles for the image
           */
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          /**
           * The width and height of the image
           */
          width="100%"
          height="100%"
          /**
           * The placeholder image source URL
           */
              placeholderSrc={`https://picsum.photos/id/${photo.id}/30/20`}
            />
          );
        })()}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          Photo by {photo.author}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {photo.width} × {photo.height}
        </p>
      </div>
    </div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoCard;
