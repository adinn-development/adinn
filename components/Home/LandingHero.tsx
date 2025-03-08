"use client";

import React, { useEffect, useState, useRef } from 'react';
import TopNav from '../ReUsableComponents/TopNav';
import Image from 'next/image';
import { BackgroundImage } from '../ReUsableComponents/Icons/Icons';
import Subtract from '@/public/Subtract.svg';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HomeFrame from '@/public/HomeFrame.png';

const LandingHero = () => {
  const { scrollY } = useScroll();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasScrolledToNextSection, setHasScrolledToNextSection] = useState(false);
  const [hasLeftHeroSection, setHasLeftHeroSection] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Spring-based scroll progress for smooth animations
  const springProgress = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
  });

  // Transformations based on scroll progress
  const subtractScale = useTransform(springProgress, [0, 400], [1, 1.5]);
  const subtractOpacity = useTransform(springProgress, [0, 400], [1, 0]);
  const newImageY = useTransform(springProgress, [200, 500], ['100%', '0%']);
  const newImageOpacity = useTransform(springProgress, [200, 500], [0, 1]);

  // Monitor scroll position and trigger section change
  useEffect(() => {
    const checkScroll = () => {
      const heroHeight = heroSectionRef.current?.clientHeight || window.innerHeight;

      if (window.scrollY > heroHeight) {
        setHasLeftHeroSection(true);
        return;
      } else {
        setHasLeftHeroSection(false);
      }

      if (window.scrollY >= 500 && !isAnimationComplete) {
        setIsAnimationComplete(true);
      } else if (window.scrollY < 400) {
        setIsAnimationComplete(false);
        setHasScrolledToNextSection(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isAnimationComplete]);

  // Lock scroll during animation and unlock after
  useEffect(() => {
    if (isAnimationComplete && !hasScrolledToNextSection) {
      // Lock scroll during transition
      document.body.style.overflow = 'hidden';

      // Get the height of the LandingHero section
      const heroHeight = heroSectionRef.current?.clientHeight || window.innerHeight;

      // Smoothly scroll to next section
      window.scrollTo({
        top: heroHeight,
        behavior: "smooth",
      });

      setHasScrolledToNextSection(true);

      // Unlock scroll after transition completes
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 800); // Adjust the delay to match the transition duration
    }
  }, [isAnimationComplete, hasScrolledToNextSection]);

  return (
    <div className="landing-hero-container relative w-full h-screen" ref={heroSectionRef}>
      <motion.div 
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ 
          y: hasLeftHeroSection ? '-100%' : '0%', // Move section up after leaving
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
          style={{
            scale: subtractScale,
            opacity: subtractOpacity,
          }}
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
          style={{
            y: newImageY,
            opacity: newImageOpacity,
          }}
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