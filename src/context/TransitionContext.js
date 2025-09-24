"use client";

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href) => {
    setIsTransitioning(true); // Start the exit animation

    // Wait for the animation to finish before navigating
    setTimeout(() => {
      router.push(href);
      // It's often good practice to reset the state after navigation,
      // though the component remounting usually handles this.
      setTimeout(() => setIsTransitioning(false), 50); 
    }, 400); // This should match your exit animation duration
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, handleLinkClick }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);