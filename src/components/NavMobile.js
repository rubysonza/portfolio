"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import SocialLinks from "@/components/SocialLinks";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import LogoAnimation from './LogoAnimation';

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useLockBodyScroll(isMenuOpen);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/about", label: "About", delay: "delay-200" },
    { href: "/projects", label: "Projects", delay: "delay-300" },
    { href: "/contact", label: "Contact", delay: "delay-400" },
  ];

  return (
    <>
      <div className="flex justify-between items-center max-w-full my-0 mx-auto">
        <div className="relative z-50">
          <LogoAnimation />
        </div>
        
        <button
          onClick={toggleMenu}
          className="border-none cursor-pointer text-xl z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <RiCloseLine size={28} /> : <RiMenu4Fill size={25} strokeWidth={0.5} />}
        </button>
      </div>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-black z-40
                    transition-opacity duration-300 ease-in-out flex flex-col
                    p-8 pt-24 h-[100dvh] 
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Centered Navigation Items */}
        <nav className="flex-grow flex flex-col items-center justify-center gap-15">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleMenu}
              className={`text-3xl font-bold tracking-wider uppercase transition-all duration-500 ease-out
                          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                          ${item.delay}
                          ${pathname === item.href ? 'text-purple dark:text-indigo' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`transition-all duration-300 ease-out delay-500 mt-5
                        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <ThemeToggleButton />
          </div>
        </nav>

        {/* Social Links at the bottom */}
        <div className={`flex w-full justify-center pt-10 transition-opacity duration-300 ease-out delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <SocialLinks className="gap-8" />
        </div>
      </div>
    </>
  );
}