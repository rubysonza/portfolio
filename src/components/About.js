"use client";

import { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

const About = forwardRef(function About({ setRefs }, ref) {

  const rubyTargetRef = useRef(null);
  const imageTargetRef = useRef(null);
  const textTargetRef = useRef(null);

  useEffect(() => {
    if (setRefs) {
      setRefs({ rubyTargetRef, imageTargetRef, textTargetRef });
    }
  }, [setRefs]);

  return (
    <section ref={ref} className={styles.aboutContainer}>
      <div className={styles.contentWrapper}>
        <div ref={imageTargetRef} className={styles.imagePlaceholder} />

        <div>
            <h2 className={styles.name}>
                <span ref={rubyTargetRef} className={styles.namePlaceholder}>Ruby</span>
                <motion.span className={styles.highlight}> Sonza</motion.span>
            </h2>

            <p className={styles.bio}>
            I&apos;m a <span ref={textTargetRef} className={styles.paragraphPlaceholder}>web designer and developer</span> guided by a strategic mind and a
            creative heart.
            </p>
        </div>

        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <FiMapPin className={styles.icon} />
            <span>Bayonne, NJ</span>
          </li>
          <li className={styles.infoItem}>
            <RiGraduationCapLine className={styles.icon} />
            <span>B.A. of Information Technology</span>
          </li>
        </ul>

        <a
          href="/ruby-sonza-resume.pdf" // Place your resume in the `public` folder
          download
          className={styles.resumeButton}
        >
          Resume <MdOutlineFileDownload />
        </a>
      </div>
    </section>
  );
});

export default About;