'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroTransition.module.css';
import RotatingText from './RotatingText';
import AnimatedText from './AnimatedText';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

export default function HeroTransition() {
  const containerRef = useRef(null);
  
  // Refs for source elements (hero section)
  const heroImageRef = useRef(null);
  const heroRubyRef = useRef(null);
  
  // Refs for placeholder/target elements (about section)
  const aboutImagePlaceholderRef = useRef(null);
  const aboutRubyPlaceholderRef = useRef(null);
  
  // State to store calculated distances
  const [imageTransform, setImageTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const [rubyTransform, setRubyTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Set up scroll tracking for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate exact transforms needed including size differences
  useEffect(() => {
    const calculateTransforms = () => {
      if (
        heroImageRef.current && 
        aboutImagePlaceholderRef.current && 
        heroRubyRef.current && 
        aboutRubyPlaceholderRef.current &&
        containerRef.current
      ) {
        // Get container position as reference point
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Get bounding rectangles for all elements
        const heroImageRect = heroImageRef.current.getBoundingClientRect();
        const aboutImageRect = aboutImagePlaceholderRef.current.getBoundingClientRect();
        const heroRubyRect = heroRubyRef.current.getBoundingClientRect();
        const aboutRubyRect = aboutRubyPlaceholderRef.current.getBoundingClientRect();
        
        // Calculate center points for more accurate positioning
        const heroImageCenter = {
          x: heroImageRect.left + heroImageRect.width / 2,
          y: heroImageRect.top + heroImageRect.height / 2
        };
        
        const aboutImageCenter = {
          x: aboutImageRect.left + aboutImageRect.width / 2,
          y: aboutImageRect.top + aboutImageRect.height / 2
        };
        
        const heroRubyCenter = {
          x: heroRubyRect.left + heroRubyRect.width / 2,
          y: heroRubyRect.top + heroRubyRect.height / 2
        };
        
        const aboutRubyCenter = {
          x: aboutRubyRect.left + aboutRubyRect.width / 2,
          y: aboutRubyRect.top + aboutRubyRect.height / 2
        };
        
        // Calculate exact pixel distances from center to center
        const imageDeltaX = aboutImageCenter.x - heroImageCenter.x;
        const imageDeltaY = aboutImageCenter.y - heroImageCenter.y;
        
        // Calculate scale differences if sizes don't match
        const imageScaleX = aboutImageRect.width / heroImageRect.width;
        const imageScaleY = aboutImageRect.height / heroImageRect.height;
        
        // Calculate Ruby text transforms
        const rubyDeltaX = aboutRubyCenter.x - heroRubyCenter.x;
        const rubyDeltaY = aboutRubyCenter.y - heroRubyCenter.y;
        const rubyScaleX = aboutRubyRect.width / heroRubyRect.width;
        const rubyScaleY = aboutRubyRect.height / heroRubyRect.height;
        
        // Store the calculated transforms
        setImageTransform({ 
          x: imageDeltaX, 
          y: imageDeltaY,
          scaleX: imageScaleX,
          scaleY: imageScaleY
        });
        
        setRubyTransform({ 
          x: rubyDeltaX, 
          y: rubyDeltaY,
          scaleX: rubyScaleX,
          scaleY: rubyScaleY
        });
        
        setIsCalculated(true);
      }
    };

    // Initial calculation with delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateTransforms, 150);
    
    // Recalculate on resize
    const handleResize = () => {
      setIsCalculated(false);
      calculateTransforms();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- SECTION VISIBILITY CONTROL ---
  // Entire section fades out as user scrolls to next section
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const sectionPointerEvents = useTransform(
    scrollYProgress,
    [0, 0.9],
    ['auto', 'none']
  );
  
  // --- HERO ELEMENTS ANIMATIONS ---
  
  // "Hey, I'm" text - fades out and moves up early in scroll
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const greetingY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  
  // Rotating text - fades out and moves up
  const rotatingTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const rotatingTextY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  
  // --- SHARED ELEMENTS ANIMATIONS ---
  
  // Profile image - moves exactly to placeholder position with center-based calculation
  const imageX = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 0.7], 
    [0, imageTransform.x * 0.3, imageTransform.x * 0.8, imageTransform.x]
  );
  const imageY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 0.7], 
    [0, imageTransform.y * 0.3, imageTransform.y * 0.8, imageTransform.y]
  );
  const imageScale = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7], 
    [1, (1 + imageTransform.scaleX) / 2, imageTransform.scaleX]
  );
  
  // "Ruby" text - moves exactly to placeholder position
  const rubyX = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 0.7], 
    [0, rubyTransform.x * 0.3, rubyTransform.x * 0.8, rubyTransform.x]
  );
  const rubyY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 0.7], 
    [0, rubyTransform.y * 0.3, rubyTransform.y * 0.8, rubyTransform.y]
  );
  const rubyScale = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7], 
    [1, (1 + rubyTransform.scaleX) / 2, rubyTransform.scaleX]
  );
  
  // --- ABOUT SECTION ANIMATIONS ---
  
  // About section elements - fade in after shared elements are positioned
  const aboutOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.45, 0.75], [30, 0]);
  
  // Hide placeholders once morphing elements arrive
  const placeholderOpacity = useTransform(
    scrollYProgress, 
    [0, 0.65, 0.7], 
    [1, 0.5, 0]
  );

  return (
    <section 
      ref={containerRef} 
      className='relative w-full h-[200vh] overflow-hidden'
    >
      {/* Main content wrapper with opacity control */}
      <motion.div
        style={{ 
          opacity: sectionOpacity,
          pointerEvents: sectionPointerEvents
        }}
        className='fixed inset-0 w-full h-[100vh]'
      >
        
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
                  y: rotatingTextY,
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
                  <AnimatedText text='Hey,' className={styles.greetingLine} />
                  <div className={styles.greetingLine} style={{ display: 'flex', gap: '1.2rem' }}>
                    <AnimatedText text='I&apos;m' />
                  </div>
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

      {/* Debug Info (Remove in production) */}
      {process.env.NODE_ENV === 'development' && isCalculated && (
        <div className='fixed top-4 left-4 bg-black/80 text-white p-2 text-xs z-50 rounded'>
          <div>Image: ΔX={imageTransform.x.toFixed(0)}px, ΔY={imageTransform.y.toFixed(0)}px</div>
          <div>Image Scale: X={imageTransform.scaleX.toFixed(2)}, Y={imageTransform.scaleY.toFixed(2)}</div>
          <div>Ruby: ΔX={rubyTransform.x.toFixed(0)}px, ΔY={rubyTransform.y.toFixed(0)}px</div>
          <div>Ruby Scale: X={rubyTransform.scaleX.toFixed(2)}, Y={rubyTransform.scaleY.toFixed(2)}</div>
          <div>Scroll: {(scrollYProgress.get() * 100).toFixed(0)}%</div>
        </div>
      )}

    </section>
  );
}