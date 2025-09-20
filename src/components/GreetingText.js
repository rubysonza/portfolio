"use client";

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: "100%" 
  },
  visible: { 
    opacity: 1, 
    y: "0%", 
    transition: { 
      duration: 0.4, 
      ease: "easeOut" } 
    },
};

export default function AnimatedText({ text, className }) {
  return (
    <motion.div
      className={className}
      style={{ display: 'flex' }}
      variants={containerVariants}
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}