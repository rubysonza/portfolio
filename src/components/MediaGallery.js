"use client";

import { useState, useEffect, useRef } from 'react';
import MediaZoomModal from './MediaZoomModal';
import { FaPlay } from 'react-icons/fa';

export default function MediaGallery({ media }) {
  const [activeMedia, setActiveMedia] = useState(media[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [focusedThumbnailIndex, setFocusedThumbnailIndex] = useState(0);
  const thumbnailRefs = useRef([]);
  
  if (!media || media.length === 0) {
    return null;
  }

  const handleThumbnailClick = (item) => {
    setActiveMedia(item);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % media.length;
      setFocusedThumbnailIndex(nextIndex);
      thumbnailRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = (index - 1 + media.length) % media.length;
      setFocusedThumbnailIndex(nextIndex);
      thumbnailRefs.current[nextIndex]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setActiveMedia(media[index]);
    }
  };

  useEffect(() => {
    setActiveMedia(media[0]);
  }, [media]);

  // Single item layout
  if (media.length === 1) {
    const item = media[0];
    return (
      <div className="my-8">
        {item.type === 'video' ? (
          <video src={item.src} alt={item.alt} controls className="rounded-lg border-2 w-full cursor-pointer" />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="rounded-lg border-2 shadow-lg w-full cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          />
        )}
        {isZoomed && item.type === 'image' && (
          <MediaZoomModal item={item} onClose={() => setIsZoomed(false)} />
        )}
      </div>
    );
  }

  // Gallery layout
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="w-full md:w-3/4">
          {activeMedia.type === 'video' ? (
            <video src={activeMedia.src} alt={activeMedia.alt} controls className="rounded-lg w-full" />
          ) : (
            <img
              src={activeMedia.src}
              alt={activeMedia.alt}
              className="rounded-lg border-2 shadow-lg object-cover w-full cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            />
          )}
        </div>
        <div className="w-full md:w-1/4 flex md:flex-col gap-2">
          {media.map((item, index) => (
            <button
              key={item.src}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              onClick={() => handleThumbnailClick(item)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative w-full aspect-video rounded-md overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                activeMedia.src === item.src ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <img
                src={item.type === 'video' ? (item.thumbnail || item.src) : item.src}
                alt={item.alt}
                className="object-cover border-2 shadow-lg w-full h-full"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <FaPlay className="text-white text-2xl" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {isZoomed && activeMedia.type === 'image' && (
        <MediaZoomModal item={activeMedia} onClose={() => setIsZoomed(false)} />
      )}
    </>
  );
}