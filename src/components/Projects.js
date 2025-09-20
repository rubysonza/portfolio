"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { projects } from '@/data/projectsPageData';


function ProjectSlide({ project, opacity, scale, y }) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-center"
            style={{ scale, opacity, y }}
        >
            <div className="flex flex-col w-full max-w-[85%] gap-3">
                <div className="relative w-full aspect-3/2 border-4 rounded-2xl shadow-lg inset-shadow-black/40 cursor-pointer">
                    <Image
                        src={project.imageUrl} 
                        alt={`${project.title} project screenshot`} 
                        fill 
                        className='object-cover rounded-2xl' 
                    />
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-4">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-redditMono border-2 border-purple text-purple">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center max-w-md space-y-6">
                <span className="block mb-7 text-base sm:text-xl md:text-2xl text-gray-700 font-redditMono">{project.number}</span>
                <h5 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 md:mb-5">{project.title}</h5>
                <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 max-w-[80%] md:max-w-full">{project.description}</p>
                <button type="button" className="py-2 px-5 text-lg md:text-xl font-redditMono bg-purple cursor-pointer uppercase">
                    View Project
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
                        <h5 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase">
                            Projects
                        </h5>
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