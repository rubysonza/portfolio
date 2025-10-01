// src/components/ImageGallery.js
"use client";

import { useState, useEffect, useRef } from 'react';
import ImageZoomModal from './ImageZoomModal'; // Import the new modal component

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return null;
  }

  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false); // State for the zoom modal
  const [focusedThumbnailIndex, setFocusedThumbnailIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % images.length;
      setFocusedThumbnailIndex(nextIndex);
      thumbnailRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = (index - 1 + images.length) % images.length;
      setFocusedThumbnailIndex(nextIndex);
      thumbnailRefs.current[nextIndex]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setActiveImage(images[index]);
    }
  };

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="w-full md:w-3/4">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="rounded-lg object-cover w-full cursor-zoom-in"
            onClick={() => setIsZoomed(true)} // Open the modal on click
          />
        </div>
        {images.length > 1 && (
          <div className="w-full md:w-1/5 flex md:flex-col gap-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                onClick={() => handleThumbnailClick(image)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full aspect-video rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  activeImage.src === image.src ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isZoomed && (
        <ImageZoomModal
          src={activeImage.src}
          alt={activeImage.alt}
          onClose={() => setIsZoomed(false)}
          
        />
      )}
    </>
  );
}