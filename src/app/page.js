"use client";

import HeroTransition from '@/components/HeroTransition';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* No more props needed for HeroTransition or Projects */}
      <HeroTransition />
      <Projects />
      <SocialLinks />
      <Footer />
    </main>
  );
}