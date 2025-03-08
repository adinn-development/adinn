"use client";

import React, { useEffect, useState, useRef } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import Image from "next/image";
import { BackgroundImage } from "../ReUsableComponents/Icons/Icons";
import Subtract from "@/public/Subtract.svg";
import { motion } from "framer-motion";
import HomeFrame from "@/public/HomeFrame.png";

const LandingHero = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [hasLeftHeroSection, setHasLeftHeroSection] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle scrolling and animation
  useEffect(() => {
    const startAnimation = () => {
      setIsAnimationInProgress(true);
      setIsAnimationComplete(true);

      animationTimeout.current = setTimeout(() => {
        setIsAnimationInProgress(false);
        setIsScrollLocked(false);
      }, 1500); // Slower transition delay
    };

    const resetAnimation = () => {
      setIsAnimationInProgress(false);
      setIsAnimationComplete(false);
      setIsScrollLocked(true);
    };

    let lastScrollTop = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.scrollY;

      if (isScrollLocked && e.deltaY > 0) {
        e.preventDefault();
        if (!isAnimationInProgress && !isAnimationComplete) startAnimation();
      } else if (scrollTop < lastScrollTop && scrollTop === 0) {
        resetAnimation(); // Reset if user scrolls back to top
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isScrollLocked, isAnimationInProgress, isAnimationComplete]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="landing-hero-container relative w-full h-screen overflow-hidden"
        ref={heroSectionRef}
      >
        <motion.div
          className="sticky top-0 w-full h-screen"
          animate={{ y: hasLeftHeroSection ? "-100%" : "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
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
              opacity: isAnimationComplete ? 0 : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }} // Slower and smoother scaling
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
              y: isAnimationComplete ? "0%" : "100%",
              opacity: isAnimationComplete ? 1 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth sliding effect
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
    </>
  );
};

export default LandingHero;
