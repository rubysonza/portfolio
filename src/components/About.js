"use client";

import { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

const About = forwardRef(function About({ setTargetRefs }, ref) {

  const rubyTargetRef = useRef(null);
  const imageTargetRef = useRef(null);

  useEffect(() => {
    const rubyRect = rubyTargetRef.current.getBoundingClientRect();
    const imageRect = imageTargetRef.current.getBoundingClientRect();

    if (setTargetRefs) {
      setTargetRefs({ rubyTargetRef, imageTargetRef });
    }
  }, [setTargetRefs]);

  return (
    <section ref={ref} className={styles.aboutContainer}>
      <div className={styles.contentWrapper}>
        <div>

          <div ref={imageTargetRef} className={styles.imagePlaceholder}>
            <img src="/profile.webp" alt="Photo of Ruby Sonza" width={200} height={200} className={styles.profileImage} />
          </div>

          <h2 className={styles.name}>
              <span ref={rubyTargetRef} className={styles.namePlaceholder}>Ruby</span>
              <motion.span> Sonza</motion.span>
          </h2>

          <p className={styles.bio}>
            I&apos;m a web designer and developer guided by a strategic mind and a creative heart.
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
          href="/ruby-sonza-resume.pdf"
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