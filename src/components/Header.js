"use client";

import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="z-50 fixed top-0 left-0 w-full h-auto bg-transparent py-8 px-5 text-black dark:text-white">
      {/* Renders NavDesktop but hides it on small screens */}
      <div className="hidden md:block">
        <NavDesktop />
      </div>

      {/* Renders NavMobile but hides it on medium and larger screens */}
      <div className="block md:hidden">
        <NavMobile />
      </div>
    </header>
  );
}