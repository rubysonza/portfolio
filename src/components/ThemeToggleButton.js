"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes"; 
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { useIsMounted } from '@/hooks/useIsMounted';

export const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-purple cursor-pointer"
      whileHover={{ scale: 1.2, rotate: 270 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 600, damping: 100 }}
    >
      {resolvedTheme === "dark" ? (
        <RiMoonFill className="w-7.5 h-7.5" />
      ) : (
        <RiSunFill className="w-7.5 h-7.5" />
      )}
    </motion.button>
  );
};