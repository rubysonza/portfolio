"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { projects } from '@/data/projectsPageData';
import { Icon } from "@iconify/react";



function ProjectSlide({ project, opacity, scale, y }) {

    const cardVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.03, y: -20, transition: { type: 'spring', stiffness: 200 } }
    }
    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-center gap-y-0 sm:gap-y-3"
            style={{ scale, opacity, y }}
        >
            <div className="flex flex-col w-full max-w-[85%] gap-2 sm:gap-3">
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="relative w-full aspect-3/2">
                    <img
                        src={project.image} 
                        alt={`${project.title} project screenshot`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className='object-cover border-3 dark:border-none shadow-[0_0_5px] rounded-2xl cursor-pointer'
                    />
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-4">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-redditMono border-2 border-purple text-purple">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center max-w-lg gap-y-3 sm:gap-y-7">
                <span className="block text-base sm:text-xl md:text-2xl font-redditMono">{project.number}</span>
                <div className="flex flex-col">
                    <h5 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3">{project.title}</h5>
                    <p className="px-12 md:px-0 text-center text-sm sm:text-base md:text-lg lg:text-xl font-redditMono max-w-full">{project.description}</p>
                </div>
                <button type="button" className="flex flex-row items-center py-1.5 px-3 md:py-2.5 md:px-5 gap-2 text-sm sm:text-base md:text-lg text-center font-redditMono tracking-widest font-bold bg-purple uppercase cursor-pointer">
                    View Case Study <Icon icon="mdi:file-document-box-search-outline" className="w-6.5 h-6.5" />
                </button>
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

    const projectsStart = 0.35;
    const projectsEnd = 1;
    const projectChapterDuration = (projectsEnd - projectsStart) / projects.length;

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
                        const start = projectsStart + i * projectChapterDuration;
                        const end = start + projectChapterDuration;
                        
                        const fadeInPoint = start + 0.1;
                        const fadeOutPoint = end - 0.1;

                        const opacity = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0, 1, 1, 0]);
                        const scale = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0.7, 1, 1, 0.7]);
                        const y = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [500, 0, 0, -500]);

                        return <ProjectSlide key={i} project={project} opacity={opacity} scale={scale} y={y} />;
                    })}
                </div>
            </div>
        </section>
    );
}