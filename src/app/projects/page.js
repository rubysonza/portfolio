"use client";

import {} from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { projects } from '@/data/projectsPageData';
import { RiExternalLinkLine } from "react-icons/ri";
import { Icon } from "@iconify/react";


function ProjectCard({ project }) {

    const cardVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02, y: -20, transition: { type: 'spring', stiffness: 200 } },
    };

    return (
        <div className="flex flex-col justify-center items-center w-[85%] md:w-[70%] lg:w-[55%] xl:w-[50%] max-w-full gap-5">

            <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                className="relative w-full aspect-3/2 rounded-2xl cursor-pointer">
                <img
                    src={project.image} 
                    alt={`${project.title} project screenshot`}
                    className='object-cover rounded-2xl border-3 shadow-[0_0_5px]' 
                />
            </motion.div>

            <div className="flex flex-col justify-start w-full gap-3">
                <div className="flex flex-row justify-between w-full px-3">
                    <h4 className="flex font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{project.title}</h4>

                    <div className="flex flex-row text-purple gap-3.5">
                        <Link href={`/projects/${project.slug}`}>
                            <Icon icon="mdi:file-document-box-search-outline" className="w-6 h-6 sm:w-8 sm:h-8" />
                        </Link>
                        <a href={project.link} target="_blank">
                            <RiExternalLinkLine strokeWidth="0" className="w-6 h-6 sm:w-8 sm:h-8" aria-label="View website through an external link" />
                        </a>
                    </div>
                </div>

                <p className="pl-5 text-base md:text-lg lg:text-xl font-redditMono">{project.description}</p>

                <div className="flex flex-wrap justify-start items-center w-full gap-x-3 gap-y-2 pl-3 my-4">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-bold font-redditMono border-2 border-purple text-purple">
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