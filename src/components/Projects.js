"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
    {
        number: "1/2",
        title: "Portfolio",
        description: "A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.",
        imageUrl: ""
    },
    {
        number: "2/2",
        title: "Auralyst",
        description: "A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.",
        imageUrl: ""
    }
];

export default function Projects() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 0]);

  return (
    <section ref={containerRef} className='projectsContainer'>
      <div className={styles.stickyWrapper}>
        <motion.h2
          className={styles.title}
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
        >
          PROJECTS
        </motion.h2>

        {projects.map((project, i) => {
          // Define the start and end points for each slide's animation
          const start = 0.1 + i * 0.2;
          const end = start + 0.2;
          
          // Animate each slide based on its specific scroll range
          const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);

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
    </section>
  );
}