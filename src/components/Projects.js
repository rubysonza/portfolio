"use client";

import Link from 'next/link';
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from '@/data/projectsPageData';
import { FiArrowRight } from "react-icons/fi";



function ProjectSlide({ project, i, animationProgress }) {

    const projectsStart = 0.35;
    const projectsEnd = 1;
    const projectChapterDuration = (projectsEnd - projectsStart) / projects.length;

    const start = projectsStart + i * projectChapterDuration;
    const end = start + projectChapterDuration;

    const fadeInPoint = start + 0.1;
    const fadeOutPoint = end - 0.1;

    const opacity = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0, 1, 1, 0]);
    const scale = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0.7, 1, 1, 0.7]);
    const y = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [500, 0, 0, -500]);
    const pointerEvents = useTransform(opacity, (value) => (value > 0 ? 'auto' : 'none'));

    const cardVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02, y: -20, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    };

    const overlayVariants = {
        initial: { opacity: 0 },
        hover: { opacity: 1, transition: { duration: 0.3 } }
    };

    const imageVariants = {
        initial: { filter: "blur(0px) brightness(100%)", scale: 1 },
        hover: { filter: "blur(1px) brightness(75%)", scale: 1.03, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-center w-full h-full gap-y-0 sm:gap-y-3"
            style={{ scale, opacity, y, pointerEvents }}
        >
            <div className="flex flex-col justify-center items-center w-full max-w-full gap-2 sm:gap-7">
                <Link href={`/projects/${project.slug}`} passHref className='flex justify-center items-center md:max-w-[75%]'>
                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        whileFocus="hover"
                        className="relative w-full md: aspect-16/9">
                        <motion.img
                            src={project.image} 
                            alt={`${project.title} project screenshot`}
                            variants={imageVariants}
                            className='object-cover border-3 dark:border-none shadow-[0_0_5px] rounded-2xl cursor-pointer'
                        />

                        <motion.div
                            variants={overlayVariants}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <button className="relative flex justify-center items-center text-center inset-0 py-4 px-5 gap-2 rounded-full hover:scale-105 transition-transform duration-500 bg-purple dark:bg-indigo text-white dark:text-black text-3xl font-bold tracking-wider uppercase cursor-pointer">
                                View Case Study <FiArrowRight />
                            </button>
                        </motion.div>
                    </motion.div>
                </Link>

                <motion.div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-4">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-redditMono border-2 border-purple text-purple dark:border-indigo dark:text-indigo">
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="flex flex-col justify-center items-center max-w-lg gap-y-3 sm:gap-y-7">
                <span className="block text-base sm:text-xl md:text-2xl font-redditMono">{project.number}</span>
                <div className="flex flex-col">
                    <h5 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3">{project.title}</h5>
                    <p className="px-12 md:px-0 text-center text-sm sm:text-base md:text-lg lg:text-xl font-redditMono max-w-full">{project.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end end'] 
    });
    
    const animationStartPoint = 0.15;
    const animationEndPoint = 1;

    const animationProgress = useTransform(
        scrollYProgress,
        [animationStartPoint, animationEndPoint],
        [0, 1]
    );

    const titleOpacity = useTransform(animationProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
    const titleScale = useTransform(animationProgress, [0, 0.15, 0.25, 0.35], [0.7, 1, 1, 0.7]);
    const titleY = useTransform(animationProgress, [0, 0.15, 0.25, 0.35], [500, 0, 0, -500]);

    return (
        <section ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-4xl mx-auto px-4">
                    <motion.div
                        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase">
                            Projects
                        </h2>
                    </motion.div>

                    {projects.map((project, i) => {
                        return <ProjectSlide key={i} project={project} i={i} animationProgress={animationProgress} />;
                    })}
                </div>
            </div>
        </section>
    );
}