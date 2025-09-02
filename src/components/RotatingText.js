"use client";

import { motion } from 'framer-motion';
import styles from './RotatingText.module.css';

export default function RotatingText() {
  return (
    <div className={styles.rotatingTextContainer}>
      <motion.svg
        className={styles.rotatingTextSvg}
        viewBox="0 0 200 200"
        width="200"
        height="200"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          // The duration for one full rotation. A higher number is slower.
          duration: 50,
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
        <text className={styles.svgText}>
          <textPath href="#circlePath" startOffset="3%">
            web designer and developer • web designer and developer •
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}