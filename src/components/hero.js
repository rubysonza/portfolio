"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';
import RotatingText from './RotatingText';

const greetingLine1 = "Hey,".split("");
const greetingLine2 = "I'm".split("");
const greetingLine3 = "Ruby".split("");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.3 },
  },
};



export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.contentWrapper}>

      <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 100, y: 200, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "backInOut",
          }}
        >
          <Image
            src="/profile.webp"
            alt="Photo of Ruby Sonza"
            width={200}
            height={200}
            className={styles.profileImage}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            initial={{ opacity: 0, rotate: 135, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ 
              delay: 0, 
              duration: 3.5, 
              ease: "easeOut",
            }}
          >
            <RotatingText />
          </motion.div>
        </motion.div>


        <h1 className={styles.greeting}>
          <motion.div 
            className={styles.greetingLine} 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
          >
              {greetingLine1.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>{letter}</motion.span>
              ))}
              <br></br>
              {greetingLine2.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>{letter}</motion.span>
              ))}
              <span>&nbsp;</span> { }
              {greetingLine3.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className={styles.highlight}>{letter}</motion.span>
              ))}
          </motion.div>

        </h1>

      </div>
    </section>
  );
}