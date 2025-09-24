"use client";

import { useTransitionContext } from "@/context/TransitionContext";

export default function PageWrapper({ children }) {
  const { isTransitioning } = useTransitionContext();

  return (
    <div
      className={`transition-opacity duration-400 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
}