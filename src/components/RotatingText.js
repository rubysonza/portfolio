"use client";

import { motion } from 'framer-motion';

export default function RotatingText() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: -180, transition: { duration: 2.5, delay: 0.2 } }}
      className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 
                    w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[540px] lg:h-[540px]'>
      <motion.svg
        className='w-full h-full'
        viewBox="0 0 200 200"
        width="200"
        height="200"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 80, // Duration: higher number is slower.
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
        <text className='font-redditMono text-[10px] tracking-[2.4px] fill-black dark:fill-gray-200 lowercase'>
          <textPath href="#circlePath" startOffset="3%">
            web designer and developer • web designer and developer •
          </textPath>
        </text>
      </motion.svg>
    </motion.div>
  );
}