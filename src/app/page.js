"use client";

import { useRef, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

export default function Home() {
  const heroRef = useRef(null);
  const [targetRefs, setTargetRefs] = useState(null);
  const aboutSectionRef = useRef(null);

  return (
    <main ref={heroRef}>
      <Hero heroRef={heroRef} targetRefs={targetRefs} />
      <About ref={heroRef} setRefs={setTargetRefs} />
      <Projects />
      {/* <SocialLinks animated={true} targetRef={aboutSectionRef}/> */}
      <Footer />
    </main>
  );
}