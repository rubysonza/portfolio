"use client";

import { useState, useEffect, useRef } from 'react';
import MediaZoomModal from './MediaZoomModal';
import { FaPlay } from 'react-icons/fa';
import Image from 'next/image'; // Make sure Image is imported

export default function MediaGallery({ media }) {
  // --- FIX: All hooks are now at the top level, before any returns ---
  const [activeMedia, setActiveMedia] = useState(media && media.length > 0 ? media[0] : null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [focusedThumbnailIndex, setFocusedThumbnailIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    // This effect now runs correctly on every render
    if (media && media.length > 0 && !activeMedia) {
      setActiveMedia(media[0]);
    }
  }, [media, activeMedia]);

  // --- Early return is now AFTER all hooks ---
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

  if (media.length === 1) {
    const item = media[0];
    return (
      <div className="my-8">
        {item.type === 'video' ? (
          <video src={item.src} alt={item.alt} controls className="rounded-lg border-2 w-full cursor-pointer" />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={800}
            className="rounded-lg border-2 shadow-lg w-full h-auto cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          />
        )}
        {isZoomed && item.type === 'image' && (
          <MediaZoomModal item={item} onClose={() => setIsZoomed(false)} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="w-full md:w-3/4">
          {activeMedia.type === 'video' ? (
            <video src={activeMedia.src} alt={activeMedia.alt} controls className="rounded-lg w-full" />
          ) : (
            <Image
              src={activeMedia.src}
              alt={activeMedia.alt}
              width={1200}
              height={800}
              className="rounded-lg border-2 shadow-lg object-cover w-full h-auto cursor-zoom-in"
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
              <Image
                src={item.type === 'video' ? (item.thumbnail || item.src) : item.src}
                alt={item.alt}
                fill
                sizes="25vw"
                className="object-cover border-2 shadow-lg"
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