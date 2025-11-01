import React from 'react';
import PropTypes from 'prop-types';
import { FiDownload, FiExternalLink, FiUser, FiImage, FiLink } from 'react-icons/fi';

const PhotoMetadata = ({ photo, onDownload }) => {
  if (!photo) return null;

  const handleDownload = () => {
    if (onDownload) {
      onDownload(photo);
    } else {
      const link = document.createElement('a');
      link.href = `https://picsum.photos/id/${photo.id}/${photo.width || 1200}/${photo.height || 800}`;
      link.download = `picsum-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const openInNewTab = () => {
    window.open(`https://picsum.photos/id/${photo.id}`, '_blank');
  };

  const metadata = [
    { icon: <FiUser className="mr-2" />, label: 'Author', value: photo.author },
    { 
      icon: <FiImage className="mr-2" />, 
      label: 'Dimensions', 
      value: photo.width && photo.height ? `${photo.width} × ${photo.height} px` : 'N/A' 
    },
    { 
      icon: <FiLink className="mr-2" />, 
      label: 'Source', 
      value: 'Picsum Photos',
      link: 'https://picsum.photos/'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Information</h3>
      
      <div className="space-y-4">
        {metadata.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 ml-6">
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex space-x-3">
        <button
          onClick={handleDownload}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiDownload className="mr-2" />
          Download
        </button>
        <button
          onClick={openInNewTab}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiExternalLink className="mr-2" />
          View Original
        </button>
      </div>
    </div>
  );
};

PhotoMetadata.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    download_url: PropTypes.string,
  }),
  onDownload: PropTypes.func,
};

export default PhotoMetadata;
