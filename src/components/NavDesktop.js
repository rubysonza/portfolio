"use client";

import Link from "next/link";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import dynamic from 'next/dynamic';

// Dynamically import TextShuffle for client-side execution
const TextShuffle = dynamic(() => import('@/components/TextShuffle'), { ssr: false });

export default function DesktopNav() {
  return (
    <div className="grid grid-cols-3 items-center max-w-full my-0 mx-auto">
      {/* Column 1: Logo */}
      <Link href="/" className="flex justify-self-start items-center font-josefin font-extrabold text-lg lowercase">
        Ruby Sonza
      </Link>

      {/* Column 2: Nav Items */}
      <nav className="desktopNav flex justify-self-center gap-8">
        <Link href="/about" className="text-white dark:text-black">
          <TextShuffle text="About" />
        </Link>
        <Link href="/projects" className="text-white dark:text-black">
          <TextShuffle text="Projects" />
        </Link>
        <Link href="/contact" className="text-white dark:text-black">
          <TextShuffle text="Contact" />
        </Link>
      </nav>

      {/* Column 3: Theme Toggle */}
      <div className="flex justify-self-end">
        <ThemeToggleButton />
      </div>
    </div>
  );
}