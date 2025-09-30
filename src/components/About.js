"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";


export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const paragraphOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 1, 1, 0]);
  const paragraphY = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [200, 0, 0, -200]);

  const listOpacity = useTransform(scrollYProgress, [0, 0.4, 0.65, 1], [0, 1, 1, 0]);
  const listY = useTransform(scrollYProgress, [0, 0.4, 0.65, 1], [400, 0, 0, -200]);

  const buttonOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const buttonY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [600, 0, 0, -200]);

  const containerScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.8]);


  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center text-center p-5 overflow-hidden">

        <motion.div
          className="relative flex flex-col items-center w-full max-w-[600px] gap-10 py-12"
          style={{ scale: containerScale }}
        >
          <motion.div
            className="flex flex-col gap-6"
            style={{ opacity: paragraphOpacity, y: paragraphY }}
          >
            <p className="text-center max-w-[500px] lg:max-w-[600px] px-2 text-xl md:text-2xl lg:text-3xl leading-10 lg:leading-13 font-redditMono">
              I&apos;m a web designer and developer guided by a strategic mind and a creative heart.
            </p>
          </motion.div>

          <motion.ul
            className="flex flex-col list-none gap-4 mb-10"
            style={{ opacity: listOpacity, y: listY }}
          >
            <motion.li className="flex items-center gap-3 text-base md:text-xl">
              <FiMapPin className="text-purple text-xl md:text-2xl" />
              <span>Bayonne, NJ</span>
            </motion.li>
            <motion.li className="flex items-center gap-3 text-base md:text-xl">
              <PiGraduationCap className="w-6 h-6 text-purple text-xl md:text-2xl" />
              <span>B.A. of Information Technology</span>
            </motion.li>
          </motion.ul>

          <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
            <ActionButton 
              href="/Ruby_Sonza_Resume.pdf"
              text="Resume"
              
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}