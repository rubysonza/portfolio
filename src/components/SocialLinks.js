"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { TbBrandGithub } from 'react-icons/tb';
import { SiGmail } from 'react-icons/si';

export default function SocialLinks({ animated = false, targetRef, className = ''
 }) {

  const links = (
    <>
      <a href="https://www.linkedin.com/in/ruby-sonza" target="_blank" rel="noopener noreferrer" aria-label="Link to LinkedIn profile" className='socialLink border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white'>
        <FaLinkedinIn />
      </a>
      <a href="https://github.com/rubysonza" target="_blank" rel="noopener noreferrer" aria-label="Link to GitHub profile" className='socialLink border-2 border-black dark:border-white hover:fill-black'>
        <TbBrandGithub />
      </a>
      <a href="mailto:rubyabayasonza@gmail.com" aria-label="Send an email" className='socialLink border-2 border-black dark:border-white hover:fill-black'>
        <SiGmail />
      </a>
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