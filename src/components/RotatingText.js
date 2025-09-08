"use client";

import { motion } from 'framer-motion';
import styles from './RotatingText.module.css';

export default function RotatingText() {
  return (
    <div className='absolute top-[50% left-[50%] -translate-x-1/2 -translate-y-1/2 
                    w-[310px] h-[310px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[430px] lg:h-[430px]'>
      <motion.svg
        className='w-full h-full'
        viewBox="0 0 200 200"
        width="200"
        height="200"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 50, // Duration: higher number is slower.
          ease: "linear",
        }}
      >
        <path
          id="circlePath"
          fill="none"
          stroke="none"
          d="
            M 100, 100
            m -75, 0
            a 75,75 0 1,1 150,0
            a 75,75 0 1,1 -150,0
          "
        />
        <text className='font-redditMono text-[10px] tracking-[2.4px] fill-gray lowercase'>
          <textPath href="#circlePath" startOffset="3%">
            web designer and developer • web designer and developer •
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}