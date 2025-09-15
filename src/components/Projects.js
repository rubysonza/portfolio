'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      className='relative h-[400vh] py-20 px-4'
    >
      <div className='sticky h-screen top-0 overflow-hidden'>
        <motion.h3
          className='z-1 absolute flex justify-center items-center text-center w-full font-josefin text-6xl font-bold tracking-widest uppercase'
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
        >
          Projects
        </motion.h3>

        {projects.map((project, i) => {
          const start = 0.1 + i * 0.2;
          const end = start + 0.2;
          const scale = useTransform(projectsScrollYProgress, [start, end], [0.8, 1]);

          return (
            <motion.div key={i} className='z-2 sticky flex flex-col justify-center items-center top-0 h-screen w-full' style={{ scale }}>
              <div className='flex flex-col items-center w-full p-4'>
                <div className='w-full max-w-[500px] aspect-[3/2] border-2 rounded-4xl p-4 mb-6 bg-black'>
                  <img src={project.imageUrl} alt={`${project.title} project screenshot`} className='w-full h-full object-contain rounded-2xl' />
                </div>
                <div className='text-center mas-w-[500px]'>
                  <span className='block mb-2 text-black font-redditMono'>{project.number}</span>
                  <h3 className='font-josefin text-5xl mb-3'>{project.title}</h3>
                  <p className='max-w-[25rem] text-xl leading-8 text-black'>{project.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}