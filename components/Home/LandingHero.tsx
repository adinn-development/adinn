"use client";

import React, { useEffect, useState, useRef } from 'react';
import TopNav from '../ReUsableComponents/TopNav';
import Image from 'next/image';
import { BackgroundImage } from '../ReUsableComponents/Icons/Icons';
import Subtract from '@/public/Subtract.svg';
import { motion } from 'framer-motion';
import HomeFrame from '@/public/HomeFrame.png';

const LandingHero = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [hasLeftHeroSection, setHasLeftHeroSection] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const lastScrollPosition = useRef(0);

  // Monitor scroll position
  useEffect(() => {
    const checkScroll = () => {
      if (!heroSectionRef.current) return;
      
      const heroHeight = heroSectionRef.current.clientHeight;
      const scrollPosition = window.scrollY;
      const isScrollingUp = scrollPosition < lastScrollPosition.current;
      
      // Update last scroll position
      lastScrollPosition.current = scrollPosition;

      // Handle section visibility
      if (scrollPosition > heroHeight) {
        setHasLeftHeroSection(true);
      } else {
        setHasLeftHeroSection(false);
      }

      // Reset states when scrolling back up
      if (isScrollingUp && scrollPosition < 100) {
        setIsAnimationComplete(false);
        return;
      }

      // Update animation completion state when scrolling down
      if (scrollPosition >= 100 && !isAnimationComplete && !isScrollingUp) {
        setIsAnimationComplete(true);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isAnimationComplete]);

  return (
    <div className="landing-hero-container relative w-full h-screen" ref={heroSectionRef}>
      <motion.div 
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ 
          y: hasLeftHeroSection ? '-100%' : '0%',
        }}
      >
        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full z-50">
          <TopNav />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image 
            src={BackgroundImage} 
            alt="Background Image" 
            layout="fill" 
            objectFit="cover" 
            quality={100} 
            priority
          />
        </div>

        {/* Subtract Image */}
        <motion.div 
          className="absolute inset-0 -z-5 flex justify-center items-center"
          animate={{
            scale: isAnimationComplete ? 1.5 : 1,
            opacity: isAnimationComplete ? 0 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src={Subtract} 
            alt="Subtract Shape" 
            layout="fill" 
            objectFit="cover" 
            quality={100} 
            priority
          />
        </motion.div>

        {/* Sliding Image (HomeFrame) */}
        <motion.div
          className="absolute inset-0 -z-10 flex justify-center items-center"
          animate={{
            y: isAnimationComplete ? '0%' : '100%',
            opacity: isAnimationComplete ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src={HomeFrame} 
            alt="New Sliding Image"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingHero;