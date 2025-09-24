"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "@/data/aboutPageData.js";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";


export default function AboutPage() {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    });

    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.7])
    const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

    return (
        <main ref={ref} className='py-[6rem] md:py-[8rem] flex flex-col justify-center items-center gap-15 lg:gap-30'>
            <div className='relative flex justify-center items-center h-auto'>
                <h1 className="text-center px-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Get to know me</h1>
            </div>

            <div className="relative h-[100vh] flex flex-col max-w-[1024px]">
                <div className="relative top-0 flex flex-col justify-center items-center">
                    <div className="relative flex justify-center items-end min-w-[280px] sm:min-w-[340px] md:min-w-[400px] lg:min-w-[500px]">
                        <div className="absolute top-4 sm:top-12 left-0 right-0 flex flex-col items-start w-60 h-auto pl-3">
                            <span className="flex font-bold text-purple text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-10 sm:leading-12 md:leading-15 lg:leading-20">Ruby<br></br>Sonza</span>
                            <p className="font-redditMono font-light text-xs md:text-base">based in New Jersey</p>
                        </div>
                        <div
                            
                            className="flex justify-end items-end w-full"
                        >
                            <div className="flex justify-end items-end w-3/4">
                                <img
                                    src="/profile.webp"
                                    alt="Photo of Ruby Sonza"
                                    width={300}
                                    height={300}
                                    className="w-40 sm:w-60 lg:w-75 h-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="z-10 border-3 w-full"></hr>
                </div>

                <div className="py-12 md:py-25 px-9 md:px-30">
                    <div className="flex flex-col justify-start items-start gap-15 lg:gap-22">
                        {about.map((section, index) => (
                            <div key={index} className="w-full space-y-3">
                                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">{section.title}</h4>

                                {section.type === 'text' && (
                                    <div className="flex flex-col gap-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="font-redditMono text-sm sm:text-base leading-7 lg:leading-9">{paragraph}</p>
                                        ))}
                                    </div>
                                )}

                                {section.type === 'tools' && (
                                    <div className="flex flex-col gap-6 w-full">
                                        <p className="font-redditMono">Here are the tools that bring my ideas to life.</p>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 place-items-center gap-5">
                                            {section.content.map((tool) => (
                                                <div key={tool.name} className="flex flex-col justify-center items-center gap-2">
                                                    <Icon icon={tool.icon} alt={`${tool.name} icon`} className="w-8 h-8 md:w-10 md:h-10"/>
                                                    <span className="font-redditMono text-xs font-bold">{tool.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}