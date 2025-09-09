'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroTransition.module.css';
import RotatingText from './RotatingText';
import AnimatedText from './AnimatedText';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";


function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
}

export default function HeroTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const heroImageRef = useRef(null);
  const heroRubyRef = useRef(null);
  const aboutImagePlaceholderRef = useRef(null);
  const aboutRubyPlaceholderRef = useRef(null);
  const [imageTransform, setImageTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const [rubyTransform, setRubyTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const [isCalculated, setIsCalculated] = useState(false);

  // ... (Your useEffect for calculating transforms remains the same)
  useEffect(() => {
    const calculateTransforms = () => {
      if (
        heroImageRef.current && 
        aboutImagePlaceholderRef.current && 
        heroRubyRef.current && 
        aboutRubyPlaceholderRef.current
      ) {
        const heroImageRect = heroImageRef.current.getBoundingClientRect();
        const aboutImageRect = aboutImagePlaceholderRef.current.getBoundingClientRect();
        const heroRubyRect = heroRubyRef.current.getBoundingClientRect();
        const aboutRubyRect = aboutRubyPlaceholderRef.current.getBoundingClientRect();
        
        // This center-point logic is already correct.
        const imageDeltaX = (aboutImageRect.left + aboutImageRect.width / 2) - (heroImageRect.left + heroImageRect.width / 2);
        const imageDeltaY = (aboutImageRect.top + aboutImageRect.height / 2) - (heroImageRect.top + heroImageRect.height / 2);
        
        // Use a single scale value for uniform scaling, which is best for a circle.
        // The key is that the WIDTHS of the two elements (including borders/padding)
        // must be proportional for this to look right.
        const imageScale = (aboutImageRect.width / heroImageRect.width) / 1.1;
        
        const rubyDeltaX = (aboutRubyRect.left + aboutRubyRect.width / 2) - (heroRubyRect.left + heroRubyRect.width / 2);
        const rubyDeltaY = (aboutRubyRect.top + aboutRubyRect.height / 2) - (heroRubyRect.top + heroRubyRect.height / 2);
        const rubyScale = aboutRubyRect.width / heroRubyRect.width;
        
        setImageTransform({ 
          x: imageDeltaX, 
          y: imageDeltaY,
          scale: imageScale, // Store the single scale value
        });
        
        setRubyTransform({ 
          x: rubyDeltaX, 
          y: rubyDeltaY,
          scale: rubyScale, // Store the single scale value
        });
        
        setIsCalculated(true);
      }
    };
    
    // Give the browser a moment to ensure all styles are applied before measuring
    const timeoutId = setTimeout(calculateTransforms, 100); 
    
    window.addEventListener('resize', calculateTransforms); // Recalculate on resize
    
    return () => {
      window.removeEventListener('resize', calculateTransforms);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- ALL YOUR ANIMATION LOGIC REMAINS THE SAME ---
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const greetingY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const rotatingTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const imageX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, imageTransform.x * 0.3, imageTransform.x * 0.8, imageTransform.x]);
  const imageY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, imageTransform.y * 0.3, imageTransform.y * 0.8, imageTransform.y]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, imageTransform.scale]);
  const rubyX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, rubyTransform.x * 0.3, rubyTransform.x * 0.8, rubyTransform.x]);
  const rubyY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, rubyTransform.y * 0.3, rubyTransform.y * 0.8, rubyTransform.y]);
  const rubyScale = useTransform(scrollYProgress, [0, 0.7], [1, rubyTransform.scale]);
  const aboutOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.45, 0.75], [30, 0]);
  const placeholderOpacity = useTransform(scrollYProgress, [0, 0.65, 0.7], [1, 0.5, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);


  return (
    <section ref={containerRef} className='relative w-full h-[200vh] overflow-hidden'>
      <motion.div
        // Apply the new fade-out style here
        style={{
          opacity: contentOpacity
        }}
        className='fixed inset-0 w-full h-[100vh]'
      >
        {/* The rest of your JSX remains exactly the same */}
        {/* HERO SECTION LAYER */}
        <div className='absolute inset-0 flex justify-center items-center'>
          <div className='relative flex justify-center items-center h-full w-full max-h-[500px]
                          max-w-[450px] sm:max-w-[500px] lg:max-w-[600px]'>
            
            {/* IMAGE + ROTATING TEXT CONTAINER */}
            <div className='absolute flex p-4 justify-center items-center top-0 right-4'>
              
              {/* PROFILE IMAGE - Shared Element */}
              <motion.div 
                ref={heroImageRef}
                style={{ 
                  x: isCalculated ? imageX : 0, 
                  y: isCalculated ? imageY : 0, 
                  scale: isCalculated ? imageScale : 1,
                  position: 'relative',
                  zIndex: 30,
                  transformOrigin: 'center center'
                }}
                className='will-change-transform'
              >
                <Image 
                  src='/profile.webp' 
                  alt='Photo of Ruby Sonza' 
                  width={300}
                  height={300}
                  priority
                  className='pt-3 object-contain rounded-full border-8 border-solid border-black
                            w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px]'
                />
              </motion.div>

              {/* ROTATING TEXT - Fades Out */}
              <motion.div 
                initial={{ opacity: 0, rotate: 360 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                style={{ 
                  opacity: rotatingTextOpacity,
                  x: isCalculated ? imageX : 0, 
                  y: isCalculated ? imageY : 0, 
                  position: 'absolute'
                }}
                className='z-0'
              >
                <RotatingText />
              </motion.div>
            </div>

            {/* GREETING TEXT */}
            <div className='absolute p-10 bottom-[5%] left-0 font-bold
                          text-[3rem] md:text-[3.5rem] lg:text-[4rem]'>
              <motion.div
                initial='hidden'
                animate='visible'
                transition={{duration: 0.1}}
              >
                {/* "Hey, I'm" - Fades Out */}
                <motion.div
                  style={{ 
                    opacity: greetingOpacity,
                    y: greetingY
                  }}
                >
                  <AnimatedText text='Hey,' />
                </motion.div>

                <div className='flex flex-row gap-5'>
                  <motion.div
                    style={{ 
                      opacity: greetingOpacity,
                      y: greetingY
                    }}
                  >
                      <AnimatedText text='I&apos;m' />
                  </motion.div>
                  {/* "Ruby" - Shared Element */}
                  <motion.div
                    ref={heroRubyRef}
                    style={{ 
                      x: isCalculated ? rubyX : 0,
                      y: isCalculated ? rubyY : 0,
                      scale: isCalculated ? rubyScale : 1,
                      position: 'relative',
                      zIndex: 30,
                      transformOrigin: 'center center',
                      display: 'inline-block'
                    }}
                    className='will-change-transform'
                  >
                    <AnimatedText text='Ruby' className='text-purple' />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION LAYER */}
        <motion.div 
          className='absolute inset-0 flex items-center justify-center'
          style={{ 
            opacity: aboutOpacity,
            y: aboutY
          }}
        >
          <div className='relative flex flex-col justify-center items-center h-full w-full gap-12 sm:gap-15'>
            
            {/* About Content Container */}
            <div className='flex flex-col justify-center items-center'>
              
              {/* Image Placeholder - Target position for morphing image */}
              <motion.div 
                ref={aboutImagePlaceholderRef}
                className='relative right-0 p-4'
                style={{ opacity: placeholderOpacity }}
              >
                <div className='relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 
                              pt-2.5 border-8 border-black rounded-full bg-gray-200' />
              </motion.div>

              {/* Name Section */}
              <h2 className='relative font-josefin text-4xl mb-6 text-center flex items-center gap-4'>
                {/* Ruby Placeholder - Target position for morphing text */}
                <motion.span 
                  ref={aboutRubyPlaceholderRef}
                  className='font-bold text-purple inline-block'
                  style={{ opacity: placeholderOpacity }}
                >
                  Ruby
                </motion.span>
                <motion.span 
                  className='font-bold'
                  style={{ opacity: aboutOpacity }}
                >
                  Sonza
                </motion.span>
              </h2>

              {/* Description - Fades in */}
              <motion.p 
                className='font-redditMono max-w-[380px] text-md sm:text-lg px-5 leading-8 text-center text-black font-extralight text-xl'
                style={{ opacity: aboutOpacity }}
              >
                I&apos;m a web designer and developer guided by a strategic mind and a creative heart.
              </motion.p>
            </div>

            {/* Info List - Fades in */}
            <motion.ul 
              className='flex flex-col list-none justify-start gap-5'
              style={{ opacity: aboutOpacity }}
            >
              <li className='flex flex-row space-x-2'>
                <FiMapPin className='text-purple text-xl' />
                <span className='text-lg'>Bayonne, NJ</span>
              </li>
              <li className='flex flex-row space-x-2'>
                <RiGraduationCapLine className='text-purple text-xl' />
                <span className='text-lg'>B.A. of Information Technology</span>
              </li>
            </motion.ul>

            {/* Resume Button - Fades in */}
            <motion.a
              href="/Ruby_Sonza_Resume.pdf"
              target='_blank'
              className='gap-2 py-2 px-5 bg-purple font-redditMono text-md font-bold'
              style={{ opacity: aboutOpacity }}
            >
              <span className='inline-flex items-center text-white'>
                Resume <MdOutlineFileDownload className='font-bold text-xl' />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}