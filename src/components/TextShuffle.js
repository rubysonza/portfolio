"use client";

import { motion } from 'framer-motion';
import { useTheme } from "next-themes";

const letterShuffleVariants = {
  initial: {
    y: 0,
  },
  hover: {
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};


export default function NavAnimation({ text, className, isActive = false }) {
  const { theme } = useTheme();
  const letters = Array.from(text);

  const wordVariants = {
    initial: {
      backgroundColor: theme === 'dark' ? "var(--color-white)" : "var(--color-black)",
      borderRadius: "0rem",
      padding: "4px 10px",
    },
    hover: {
      backgroundColor: theme === 'dark' ? "var(--color-indigo)" : "var(--color-purple)",
      borderRadius: "2rem",
      padding: "4px 10px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      key={theme}
      className={className}
      variants={wordVariants}
      initial="initial"
      animate={isActive ? "hover" : "initial"}
      whileHover="hover"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {letters.map((letter, index) => (
        <div
          key={index}
          style={{
            overflow: 'hidden',
            lineHeight: '1.2em',
            height: '1.2em',
          }}
        >
          <motion.div variants={letterShuffleVariants} style={{ y: 0 }}>
            <span style={{ display: 'block', height: '1.2em' }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
            <span style={{ display: 'block', height: '1.2em' }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}