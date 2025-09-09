'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
    {
        number: '1/2',
        title: 'Portfolio',
        description: 'A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.',
        imageUrl: ''
    },
    {
        number: '2/2',
        title: 'Auralyst',
        description: 'A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.',
        imageUrl: ''
    }
];

// Accept the shared scrollYProgress from page.js
export default function Projects() {
  const containerRef = useRef(null);

  // This is for the animations *within* the Projects section
  const { scrollYProgress: projectsScrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 👇 THESE ARE THE KEY CHANGES 👇
  // Use the HERO'S scroll progress to control the visibility of the ENTIRE projects section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Your existing animations for the title and slides
  const titleScale = useTransform(projectsScrollYProgress, [0, 0.2], [0.5, 1]);
  const titleOpacity = useTransform(projectsScrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(projectsScrollYProgress, [0, 0.2], [0, 0]);

  return (
    <motion.section
      ref={containerRef}
      className='projectsContainer'
    >
      <div className={styles.stickyWrapper}>
        <motion.h2
          className={styles.title}
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
        >
          PROJECTS
        </motion.h2>

        {projects.map((project, i) => {
          const start = 0.1 + i * 0.2;
          const end = start + 0.2;
          const scale = useTransform(projectsScrollYProgress, [start, end], [0.8, 1]);

          return (
            <motion.div key={i} className={styles.slide} style={{ scale }}>
              <div className={styles.slideContent}>
                <div className={styles.imageContainer}>
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={`${project.title} project screenshot`} className={styles.projectImage} />
                  ) : (
                    <div className={styles.imagePlaceholder}></div>
                  )}
                </div>
                <div className={styles.projectInfo}>
                  <span className={styles.projectNumber}>{project.number}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}