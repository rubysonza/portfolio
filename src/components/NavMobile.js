"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import SocialLinks from "@/components/SocialLinks";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useTransitionContext } from '@/context/TransitionContext';

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useLockBodyScroll(isMenuOpen);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // An array for easier mapping of nav items
  const navItems = [
    { href: "/about", label: "About", delay: "delay-200" },
    { href: "/projects", label: "Projects", delay: "delay-300" },
    { href: "/contact", label: "Contact", delay: "delay-400" },
  ];

  const handleLinkClick = (href) => {
    // 1. Start a short delay before doing anything.
    //    The user has clicked, but the menu will stay visible for this long.
    setTimeout(() => {
      // 2. After the initial delay, start the menu's fade-out animation.
      setIsMenuOpen(false); 
      
      // 3. Wait for the fade-out animation to finish (300ms).
      setTimeout(() => {
        // 4. AFTER that wait, navigate to the new page.
        router.push(href);
      }, 100); // This is the DURATION of your fade-out animation.
    }, 200); // This is the initial DELAY before the animation starts.
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-full my-0 mx-auto">
        <Link href="/" className="font-josefin font-extrabold text-lg lowercase z-50">
          Ruby Sonza
        </Link>

        <button
          onClick={toggleMenu}
          className="border-none cursor-pointer text-xl z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <RiCloseLine size={28} /> : <RiMenu4Fill size={25} strokeWidth={0.5} />}
        </button>
      </div>

      <div
        className={`h-screen fixed inset-0 bg-white dark:bg-black z-40
                    transition-opacity duration-300 ease-in-out
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center justify-center p-10 h-[90vh] gap-15">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className={`text-3xl font-bold tracking-wider uppercase transition-all duration-500 ease-out
                          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                          ${item.delay}`}
            >
              {item.label}
            </Link>
          ))}

          
          
          <div
            className={`transition-all duration-300 ease-out delay-500
                        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <ThemeToggleButton />
          </div>

          
        </nav>

        <div className="flex w-full h-auto">
            <SocialLinks className="gap-8" />
        </div>
      </div>
    </>
  );
}