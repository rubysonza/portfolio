"use client";

import { useRef, useState } from 'react';
import Hero from '@/components/Hero';
import HeroTransition from '@/components/HeroTransition';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

export default function Home() {

  return (
    <main>
      <HeroTransition />
      <Projects />
      <SocialLinks /> 
      <Footer />
    </main>
  );
}