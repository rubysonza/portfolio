// src/app/page.js
"use client";

import { useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

export default function Home() {
  const aboutSectionRef = useRef(null);

  return (
    <main>
      <Hero />
      <About ref={aboutSectionRef}/>
      <Projects />
      <SocialLinks animated={true} targetRef={aboutSectionRef}/>
      <Footer />
    </main>
  );
}