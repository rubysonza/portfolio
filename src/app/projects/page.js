"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { projects } from '@/data/projectsPageData';
import { FiExternalLink } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";


function ProjectCard({ project }) {

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
        <div className="flex flex-col justify-center items-center w-[85%] md:w-[70%] lg:w-[50%] xl:w-[45%] max-w-full gap-y-5">

            <Link href={`/projects/${project.slug}`} passHref>
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="relative w-full aspect-16/9 rounded-2xl cursor-pointer">
                    <motion.img
                        src={project.image} 
                        alt={`${project.title} project screenshot`}
                        variants={imageVariants}
                        className='object-cover border-3 dark:border-none shadow-[0_0_5px] rounded-2xl'
                    />

                    <motion.div
                        variants={overlayVariants}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="relative flex justify-center items-center text-center inset-0 py-4 px-5 gap-2 rounded-full hover:scale-105 transition-transform duration-500 bg-purple text-white dark:bg-indigo dark:text-black text-3xl font-bold tracking-wider uppercase cursor-pointer">
                            View Case Study <FiArrowRight />
                        </button>
                    </motion.div>
                </motion.div>
            </Link>

            <div className="flex flex-col justify-start w-full gap-3 pl-2">
                <div className="flex flex-row justify-between w-full">
                    <h3 className="flex font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{project.title}</h3>

                    <a href={project.link} target="_blank">
                        <FiExternalLink strokeWidth="2.2" className="w-6 h-6 sm:w-7.5 sm:h-7.5 text-purple dark:text-indigo hover:scale-110 transition-transform duration-300" aria-label="View website through an external link" />
                    </a>
                </div>

                <p className="text-base md:text-lg lg:text-xl font-redditMono leading-8 lg:leading-10">{project.description}</p>

                <div className="flex flex-wrap justify-start items-center w-full gap-x-3 gap-y-2 my-2">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-bold font-redditMono border-2 border-purple text-purple dark:border-indigo dark:text-indigo">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <main className="py-[6rem] md:py-[8rem]">
            <div className="flex flex-col justify-center items-center gap-15">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                    Projects
                </h1>

                <div className="flex flex-col justify-center items-center gap-24 lg:gap-30">
                    {projects.map((project, i) => {
                        return <ProjectCard key={i} project={project} />;
                    })}
                </div>
            </div>
        </main>
    );
}