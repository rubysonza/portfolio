"use client";

import { forwardRef } from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";



const About = forwardRef(function About(props, ref) {
  return (
    <section className={styles.aboutContainer} ref={ref}>
      <div className={styles.contentWrapper}>
        <div className={styles.imagePlaceholder} />

        <div>
            <h2 className={styles.name}>
                <span className={styles.namePlaceholder}>Ruby </span>
                <span className={styles.highlight}>Sonza</span>
            </h2>

            <p className={styles.bio}>
            I&apos;m a web designer and developer guided by a strategic mind and a
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