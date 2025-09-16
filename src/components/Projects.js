"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image"; // Using Next.js Image component for optimization

const projects = [
    {
        number: '1/2',
        title: 'Portfolio',
        description: 'My personal space on the web to showcase my skills, projects, and journey as a developer and designer.',
        imageUrl: '/Auralyst.png'
    },
    {
        number: '2/2',
        title: 'Auralyst',
        description: 'A comprehensive skincare guide featuring routine steps, curated products, and an actives glossary.',
        imageUrl: '/Auralyst.png'
    }
];

function ProjectSlide({ project, opacity, scale, y }) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-center"
            style={{ scale, opacity, y }}
        >
            <div className="relative w-full max-w-[75%] aspect-3/2 border-4 border-dashed rounded-2xl p-4 mb-8 cursor-pointer">
                <Image
                    src={project.imageUrl} 
                    alt={`${project.title} project screenshot`} 
                    fill 
                    className='object-cover rounded-lg' 
                />
            </div>
            <div className="max-w-md space-y-6">
                <span className="block mb-6 text-base sm:text-xl md:text-2xl text-gray-700 font-redditMono">{project.number}</span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-3">{project.title}</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">{project.description}</p>
                <button type="button" className="py-2 px-5 text-lg md:text-xl font-redditMono bg-purple cursor-pointer">
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
        <section ref={targetRef} className="relative h-[400vh] bg-gray-100">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-4xl mx-auto px-4">
                    <motion.div
                        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase">
                            Projects
                        </h3>
                    </motion.div>

                    {projects.map((project, i) => {
                        const start = projectsStart + i * projectChapterDuration;
                        const end = start + projectChapterDuration;
                        
                        const fadeInPoint = start + 0.1;
                        const fadeOutPoint = end - 0.1;

                        const opacity = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0, 1, 1, 0]);
                        const scale = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [0.8, 1, 1, 0.8]);
                        const y = useTransform(animationProgress, [start, fadeInPoint, fadeOutPoint, end], [500, 0, 0, -500]);

                        return <ProjectSlide key={i} project={project} opacity={opacity} scale={scale} y={y} />;
                    })}
                </div>
            </div>
        </section>
    );
}