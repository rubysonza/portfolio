"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import RotatingText from './RotatingText';
import AnimatedText from './AnimatedText';
import { Stick } from 'next/font/google';


const greetingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.6,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    y: "0%",
    transition: { duration: 0.4, ease: "backOut" }
  },
};


export default function Hero() {
  return (
    <section className='relative w-full h-[100vh]'>
      <div className='sticky h-screen flex items-center justify-center overflow-hidden'>

        <div className='relative inset-0 flex justify-center items-center h-[100vh] w-full'>
          <div className='relative flex justify-center items-center top-0 md:top-18 h-full w-full max-h-[500px]
                          max-w-[450px] sm:max-w-[550px] lg:max-w-[650px]'>
            <div className='absolute flex p-4 justify-center items-center top-15 md:top-0 right-4'>
              <motion.div
                layoutId="profile-image"
                className='will-change-transform z-30'
              >
                <Image
                  src='/profile.webp'
                  alt='Photo of Ruby Sonza'
                  width={300}
                  height={300}
                  priority
                  className='pt-3 object-contain rounded-full border-8 border-solid border-black
                            w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px]'
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                className='z-0'
              >
                <RotatingText />
              </motion.div>
            </div>

            <div className='flex flex-col'>
              <motion.div
                variants={greetingContainerVariants}
                initial="hidden"
                animate="visible"
                className='flex flex-col absolute p-10 bottom-[5%] left-0 font-bold text-[3rem] md:text-[3.5rem] lg:text-[4rem]'
              >
                <motion.div 
                  variants={wordVariants}
                  className=''
                >
                  <AnimatedText text='Hey,' />
                </motion.div>

                <div className='flex gap-5'>
                  <motion.div variants={wordVariants} className=''>
                    <AnimatedText text='I&apos;m' />
                  </motion.div>

                  <motion.div
                    variants={wordVariants}
                    layoutId="ruby-text"
                    className='will-change-transform z-30'
                  >
                    <AnimatedText text='Ruby' className='text-purple' />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}