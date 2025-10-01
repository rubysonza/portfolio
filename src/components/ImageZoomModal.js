"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';

export default function ImageZoomModal({ src, alt, onClose }) {
  if (!src) {
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
          className="absolute top-4 right-4 text-white text-4xl z-50 cursor-pointer"
          aria-label="Close image view"
        >
          <RiCloseLine />
        </button>
        <motion.img
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking the image
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </AnimatePresence>
  );
}