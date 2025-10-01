"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { TbBrandGithub } from 'react-icons/tb';
import { SiGmail } from 'react-icons/si';

export default function SocialLinks({ animated = false, targetRef, className = '' }) {

  const linkVariants = {
    initial: {
      scale: 1,
      transition: {
        type: "tween",
        ease: "backOut",
        duration: 0.4,
      },
    },
    hover: {
      scale: 1.15,
      transition: {
        type: "spring",
        duration: 100,
        stiffness: 200,
        damping: 15
      },
    },
  };

  const links = (
    <>
      <motion.a 
        href="https://www.linkedin.com/in/ruby-sonza"
        target="_blank" rel="noopener noreferrer"
        aria-label="Link to LinkedIn profile"
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        className='socialLink border-2 lg:border-3 border-black dark:border-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white transition-transform duration-600'
      >
        <FaLinkedinIn />
      </motion.a>
      <motion.a
        href="https://github.com/rubysonza"
        target="_blank" rel="noopener noreferrer"
        aria-label="Link to GitHub profile"
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        className='socialLink border-2 lg:border-3 border-black dark:border-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white transition-transform duration-600'
      >
        <TbBrandGithub />
      </motion.a>
      <motion.a
        href="mailto:rubyabayasonza@gmail.com"
        aria-label="Send an email"
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        className='socialLink border-2 lg:border-3 border-black dark:border-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white transition-transform duration-600'
      >
        <SiGmail />
      </motion.a>
    </>
  );

  if (animated) {
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "20% start"],
    });

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
    const y = useTransform(scrollYProgress, [0.9, 1], [0, 50]);

    return (
      <motion.div
        className='z-20 fixed flex justify-center items-center w-full gap-8 bottom-[2rem]'
        style={{ opacity, y }}
      >
        {links}
      </motion.div>
    );
  }

  return (
    <div className={`z-20 flex justify-center items-center w-full ${className}`}>
      {links}
    </div>
  );
}