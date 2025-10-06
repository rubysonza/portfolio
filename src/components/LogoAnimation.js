"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

// Variants for the PARENT container to stagger the WORDS
const logoContainerVariants = {
  enter: { transition: { staggerChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.08 } } // Stagger for word hover
};

// Variants for EACH WORD
const wordVariants = {
  // Page transition variants
  initialDown: { opacity: 0, y: -20 },
  initialUp: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exitUp: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.6, 0, 0.7, 0] } },
  exitDown: { opacity: 0, y: 20, transition: { duration: 0.3, ease: [0.6, 0, 0.7, 0] } },
  
  // Hover variant for each word
  hover: { y: -7, transition: { duration: 0.2, ease: 'easeOut' } },
};


export default function LogoAnimation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleHomeClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.location.reload();
    }
  };

  const homeText = "Ruby Sonza";
  const backText = "back to home";

  return (
    <Link 
      href="/" 
      onClick={handleHomeClick}
      className="flex justify-self-start items-center font-josefin text-black dark:text-white hover:text-purple dark:hover:text-indigo transition-colors duration-500 font-extrabold text-lg lowercase" 
      aria-label={isHomePage ? "Ruby Sonza Home" : "Back to home page"}
    >
      <div className="relative w-[160px] h-[1.2em] flex items-center">
        <AnimatePresence mode="wait">
          {isHomePage ? (
            <motion.div
              key="home"
              className="absolute inset-0 flex items-center"
              variants={logoContainerVariants}
              initial="initialDown"
              animate="enter"
              exit="exitUp"
              whileHover="hover" // Use whileHover for the word-shift effect
            >
              {homeText.split(' ').map((word, i) => (
                <motion.span key={`${word}-${i}`} variants={wordVariants} className="mr-[0.4em]">
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className="absolute inset-0 flex items-center"
              variants={logoContainerVariants}
              initial="initialUp"
              animate="enter"
              exit="exitDown"
              whileHover="hover" // Apply hover here as well
            >
              <motion.span variants={wordVariants} className="mr-2"><FiArrowLeft /></motion.span>
              {backText.split(' ').map((word, i) => (
                 <motion.span key={`${word}-${i}`} variants={wordVariants} className="mr-[0.4em]">{word}</motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}