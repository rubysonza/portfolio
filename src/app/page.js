"use client";

import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <SocialLinks animated />
    </main>
  );
}