"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RiCloseLine } from 'react-icons/ri';

export default function MediaZoomModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl z-50"
          aria-label="Close media view"
        >
          <RiCloseLine />
        </button>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-full max-h-full"
        >
          {item.type === 'video' ? (
            <video
              src={item.src}
              alt={item.alt}
              controls
              autoPlay
              className="max-w-full max-h-full"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}