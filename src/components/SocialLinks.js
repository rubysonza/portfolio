// src/components/SocialLinks.js
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { TbBrandGithub } from 'react-icons/tb';
import { SiGmail } from 'react-icons/si';

export default function SocialLinks({ animated = false, targetRef }) {

  // --- RENDER THE ANIMATED, FIXED VERSION ---
  if (animated) {
    // This is all the animation logic you had before
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "20% start"],
    });

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
    const y = useTransform(scrollYProgress, [0.9, 1], [0, 50]);

    return (
      <motion.div
        // Use a new class for the fixed positioning
        className='z-100 fixed flex justify-center items-center w-full gap-4 bottom-[2rem]'
        style={{ opacity, y }}
      >
        <a href="https://www.linkedin.com/in/ruby-sonza" target="_blank" rel="noopener noreferrer" aria-label="Link to LinkedIn profile" className='socialLink'>
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/rubysonza" target="_blank" rel="noopener noreferrer" aria-label="Link to GitHub profile" className='socialLink'>
          <TbBrandGithub />
        </a>
        <a href="mailto:rubyabayasonza@gmail.com" aria-label="Send an email" className='socialLink'>
          <SiGmail />
        </a>
      </motion.div>
    );
  }

  // --- RENDER THE SIMPLE, STATIC VERSION (FOR THE FOOTER) ---
  return (
    <div className='z-100 flex justify-center items-center w-full gap-4'>
      <a href="https://www.linkedin.com/in/ruby-sonza" target="_blank" rel="noopener noreferrer" aria-label="Link to LinkedIn profile" className='socialLink'>
        <FaLinkedinIn />
      </a>
      <a href="https://github.com/rubysonza" target="_blank" rel="noopener noreferrer" aria-label="Link to GitHub profile" className='socialLink'>
        <TbBrandGithub />
      </a>
      <a href="mailto:rubyabayasonza@gmail.com" aria-label="Send an email" className='socialLink'>
        <SiGmail />
      </a>
    </div>
  );
}