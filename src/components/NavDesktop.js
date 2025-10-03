"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import dynamic from 'next/dynamic';

const TextShuffle = dynamic(() => import('@/components/TextShuffle'), { ssr: false });

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 items-center max-w-full my-0 mx-auto">
      <Link href="/" className="flex justify-self-start items-center font-josefin text-black dark:text-white hover:text-purple dark:hover:text-indigo transition-transform duration-500 font-extrabold text-lg lowercase" aria-label="Go to home page">
        Ruby Sonza
      </Link>

      <nav className="desktopNav flex justify-self-center gap-8">
        <Link href="/about" className="text-white dark:text-black">
          <TextShuffle text="About" isActive={pathname === '/about'} />
        </Link>
        <Link href="/projects" className="text-white dark:text-black">
          <TextShuffle text="Projects" isActive={pathname === '/projects'} />
        </Link>
        <Link href="/contact" className="text-white dark:text-black">
          <TextShuffle text="Contact" isActive={pathname === '/contact'} />
        </Link>
      </nav>

      <div className="flex justify-self-end">
        <ThemeToggleButton />
      </div>
    </div>
  );
}