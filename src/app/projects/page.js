"use client";

import {} from "react";
import { motion } from "framer-motion";
import { projects } from '@/data/projectsPageData';

function ProjectCard({ project }) {
    return (
        <div className="flex flex-col justify-center items-center w-full md:w-[70%] lg:w-[50%] max-w-[70%]">

            <div className="flex flex-col w-full gap-3">
                <div className="relative w-full aspect-3/2 border-4 rounded-2xl shadow-lg inset-shadow-black/40 cursor-pointer">
                    <img
                        src={project.imageUrl} 
                        alt={`${project.title} project screenshot`}
                        className='object-cover rounded-2xl' 
                    />
                </div>

                <div className="flex flex-wrap justify-start items-center w-full gap-x-3 gap-y-2 pl-3 mb-4">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs sm:text-sm md:text-base font-bold font-redditMono border-2 border-purple text-purple">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-start w-full pl-3">
                <h4 className="flex justify-start font-bold text-[28px] sm:text-3xl md:text-4xl lg:text-5xl">{project.title}</h4>
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <main className="py-[6rem] md:py-[8rem]">
            <div className="flex flex-col justify-center items-center gap-15">
                <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                    Projects
                </h3>

                <div className="flex flex-col justify-center items-center gap-24 lg:gap-30">
                    {projects.map((project, i) => {
                        return <ProjectCard key={i} project={project} />;
                    })}
                </div>
            </div>
        </main>
    );
}