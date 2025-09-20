"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import RotatingText from "./RotatingText";
import GreetingText from "./GreetingText";

function ImageAndRotatingText({ scrollYProgress }) {
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -10]);
    const imageX = useTransform(scrollYProgress, [0, 1], [0, 800]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 110]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backInOut" } }}
            className="absolute flex justify-center items-center p-4 top-20 lg:top-12 right-4"
        >
            <motion.div
                style={{ opacity, scale: imageScale, y: imageY, x: imageX, rotate: imageRotate }}
            >
                <div className="will-change-transform z-30">
                    <Image
                        src="/profile.webp"
                        alt="Photo of Ruby Sonza"
                        width={300}
                        height={300}
                        priority
                        className="pt-3 object-contain rounded-full border-8 border-solid border-black
                                w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[380px] lg:h-[380px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    className="z-0"
                >
                    <RotatingText />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function Greeting({ scrollYProgress }) {
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    const heyY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const heyX = useTransform(scrollYProgress, [0, 1], [0, -900]);

    const imY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const imX = useTransform(scrollYProgress, [0, 1], [0, -400]);

    const rubyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const rubyX = useTransform(scrollYProgress, [0, 1], [0, -400]);
    
    const greetingContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.6,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: "backOut" }
        },
    };

    return (
        <div className="absolute flex flex-col bottom-0 left-0">
            <motion.div
                variants={greetingContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col absolute py-3 px-10 bottom-0 left-0 font-bold text-[3rem] md:text-[3.5rem] lg:text-[5rem]"
                style={{ opacity }}
            >
                    <motion.div
                        variants={wordVariants}
                        style={{ y: heyY, x: heyX, scale: textScale }}
                    >
                        <GreetingText text="Hey," className="" />
                    </motion.div>

                <div className="flex gap-5">
                    <motion.div
                        variants={wordVariants}
                        style={{ y: imY, x: imX, scale: textScale }}
                    >
                        <GreetingText text="I&apos;m" className="" />
                    </motion.div>
                

                    <motion.div
                        variants={wordVariants}
                        style={{ y: rubyY, x: rubyX, scale: textScale }}
                    >
                        <GreetingText text="Ruby" className="text-purple " />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    return (
        <section ref={ref} className="relative w-full h-[100vh] overflow-hidden">
            <div className="h-screen flex items-center justify-center">
                <div className="relative inset-0 flex justify-center items-center h-full w-full
                                max-h-[450px] max-w-[450px] sm:max-h-[500px] md:max-h-[550px] md:max-w-[575px] lg:max-h-[650px] lg:max-w-[720px]">
                    <Greeting scrollYProgress={scrollYProgress} />
                    <ImageAndRotatingText scrollYProgress={scrollYProgress} />
                    

                </div>
            </div>
        </section>
    );
}