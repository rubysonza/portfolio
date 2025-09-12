"use client";

import { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

export default function About() {

  const rubyTargetRef = useRef(null);
  const imageTargetRef = useRef(null);

  

  return (
    <section className='min-h-screen flex flex-col justify-center items-center text-center p-4'>
      <div className='flex flex-col items-center w-full max-w-[600px] gap-10 py-12'>
        <div>

          <p className='text-center max-w-[500px] text-2xl leading-10 font-redditMono'>
            I&apos;m a web designer and developer guided by a strategic mind and a creative heart.
          </p>
        </div>

        <ul className='flex flex-col list-none gap-4 mb-10'>
          <li className='flex items-center gap-3 text-xl'>
            <FiMapPin className='text-purple text-2xl' />
            <span>Bayonne, NJ</span>
          </li>
          <li className='flex items-center gap-3 text-xl'>
            <RiGraduationCapLine className='text-purple text-2xl' />
            <span>B.A. of Information Technology</span>
          </li>
        </ul>

        <a
          href="/ruby-sonza-resume.pdf"
          download
          className='inline-flex items-center gap-2 py-2 px-5 bg-purple font-redditMono text-lg font-bold text-white tracking-widest'
        >
          Resume <MdOutlineFileDownload className='text-2xl' />
        </a>
      </div>
    </section>
  );
}