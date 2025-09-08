"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';
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


export default function Hero({ heroRef, targetRefs }) {

  const [deltas, setDeltas] = useState({ 
    ruby: {x: 0, y: 0, scale: 1},
    image: {x: 0, y: 0, scale: 1}
  });

  const rubyStartRef = useRef(null);
  const imageStartRef = useRef(null);

  useEffect(() => {
    const measurePositions = () => {
      if (rubyStartRef.current && targetRefs?.rubyTargetRef?.current && imageStartRef.current && targetRefs?.imageTargetRef?.current) {
        const rubyStartRect = rubyStartRef.current.getBoundingClientRect();
        const rubyTargetRect = targetRefs.rubyTargetRef.current.getBoundingClientRect();
        const imageStartRect = imageStartRef.current.getBoundingClientRect();
        const imageTargetRect = targetRefs.imageTargetRef.current.getBoundingClientRect();
        
        setDeltas({
          ruby: {
            x: rubyTargetRect.left - rubyStartRect.left,
            y: rubyTargetRect.top - rubyStartRect.top,
            scale: rubyTargetRect.width / rubyStartRect.width,
          },
          image: {
            x: imageTargetRect.x - imageStartRect.x,
            y: imageTargetRect.top - imageStartRect.top,
          }
        });
      }
    };

    measurePositions();
    window.addEventListener('resize', measurePositions);
    return () => window.removeEventListener('resize', measurePositions);
  }, [targetRefs]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], 
  });

  const fadeOutOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const pinProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  
  const rubyX = useTransform(pinProgress, [0, 1], [0, deltas.ruby.x]);
  const rubyY = useTransform(pinProgress, [0, 1], [0, deltas.ruby.y]);
  const rubyScale = useTransform(pinProgress, [0, 1], [1, deltas.ruby.scale]);

  const imageX = useTransform(pinProgress, [0.1, 1], [0, deltas.image.x]);
  const imageY = useTransform(pinProgress, [0.1, 1], [0, deltas.image.y]);

  return (
    <section ref={heroRef} className={styles.heroContainer}>
      <div className={styles.contentWrapper}>

        <motion.div
          ref={imageStartRef}
          className={styles.imageContainer}
          style={{ x: imageX, y: imageY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "backOut"}}
          >
            <Image src="/profile.webp" alt="Photo of Ruby Sonza" width={200} height={200} className={styles.profileImage} />
          </motion.div>

          <motion.div style={{ opacity: fadeOutOpacity }}>
            <motion.div 
              initial={{ opacity: 0, rotate: 360, delay: 2 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%'
              }}
            >
              <RotatingText />
            </motion.div>
            </motion.div>
        </motion.div>

        <h1 className={styles.greeting}>
          <motion.div
            variants={greetingContainerVariants}
            initial="hidden"
            animate="visible"
            transition={{duration: 0.1}}
          >
            <motion.div style={{ opacity: fadeOutOpacity }}>
              <motion.div variants={wordVariants}>
                <AnimatedText text="Hey," className={styles.greetingLine} />
              </motion.div>
            </motion.div>

            <div className={styles.greetingLine} style={{ display: 'flex', gap: '1.2rem' }}>
              <motion.div style={{ opacity: fadeOutOpacity }}>
                <motion.div variants={wordVariants}>
                  <AnimatedText text="I'm" />
                </motion.div>
              </motion.div>

              <motion.div ref={rubyStartRef} style={{ x: rubyX, y: rubyY, scale: rubyScale }}>
                <motion.div variants={wordVariants}>
                  <AnimatedText text="Ruby" className={styles.highlight} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </h1>
      </div>
    </section>
  );
}