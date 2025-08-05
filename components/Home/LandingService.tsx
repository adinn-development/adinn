"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Service1,
  Service2,
  Service3,
  Service4,
} from "../ReUsableComponents/Icons/Icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const LandingService = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const contents = [
    {
      title: "OOH & Outdoor Advertising",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service1,
    },
    {
      title: "Roadshow & Mobile Van Advertising",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service2,
    },
    {
      title: "Digital Marketing",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service3,
    },
    {
      title: "Retail Branding & Signage Solutions",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service4,
    },
    {
      title: "Events & Activation",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service1,
    },
    {
      title: "Media Buying & Planning",
      description:
        "Redefining luxury in audio with advanced technology and exquisite design.",
      image: Service2,
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Desktop wheel scroll handler
  const handleWheel = (e: WheelEvent) => {
    if (isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    const isAtStart = currentScroll <= 0;
    const isAtEnd = currentScroll >= maxScroll - 10;

    if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
      return;
    }

    e.preventDefault();
    if (isScrolling) return;

    setIsScrolling(true);
    
    // Responsive scroll amount based on screen size
    const scrollAmount = window.innerWidth >= 1024 ? 600 : 
                       window.innerWidth >= 768 ? 400 : 300;
    const direction = e.deltaY > 0 ? 1 : -1;
    
    const sectionCount = Math.ceil(maxScroll / scrollAmount);
    const sectionsArray = Array.from({length: sectionCount + 1}, (_, i) => i * scrollAmount);
    
    let currentSectionIndex = 0;
    let minDistance = Infinity;
    
    sectionsArray.forEach((pos, idx) => {
      const distance = Math.abs(pos - currentScroll);
      if (distance < minDistance) {
        minDistance = distance;
        currentSectionIndex = idx;
      }
    });
    
    const targetIndex = Math.max(0, Math.min(currentSectionIndex + direction, sectionCount));
    const targetPosition = sectionsArray[targetIndex];
    
    setScrollPosition(targetPosition);
    setCurrentSlide(targetIndex);

    gsap.to(container, {
      scrollLeft: targetPosition,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setIsScrolling(false);
      }
    });
  };

  // Mobile touch handlers
  const handleTouchStart = useRef<number>(0);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !scrollContainerRef.current) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const touchStart = handleTouchStart.current;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      const container = scrollContainerRef.current;
      const slideWidth = container.clientWidth;
      const direction = diff > 0 ? 1 : -1;
      const newSlide = Math.max(0, Math.min(currentSlide + direction, contents.length - 1));
      
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
        gsap.to(container, {
          scrollLeft: newSlide * slideWidth,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollPosition, isScrolling, isMobile]);

  // Update scroll progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !progressBar) return;

    const updateScrollProgress = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) : 0;
      
      gsap.to(progressBar, {
        width: `${Math.max(progress * 100, 5)}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    container.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
    
    return () => {
      container.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="md:min-h-screen flex flex-col items-center justify-start p-4 md:p-8 overflow-hidden mt-12 md:mt-20 lg:mt-[300px]">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-8">
        <div className="flex flex-row items-center justify-start space-x-2 md:space-x-3">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] font-bold text-gray-900">
            OUR
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] instrument-font text-[#CF1E00] font-serif italic tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px]">
            SERVICES
          </div>
        </div>

        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[27px] text-gray-600 leading-relaxed max-w-md">
          <span className="block sm:hidden">
            We create impactful ads that drive growth.
          </span>
          <span className="hidden sm:block">
            We create impactful and high-performing
            <br className="hidden md:block" /> 
            ads that drive your business growth.
          </span>
        </div>
      </div>

      {/* Services Container */}
      <div className="relative w-full mt-8 md:mt-16 lg:mt-20">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className={`w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] flex items-center ${
            isMobile 
              ? 'overflow-x-auto snap-x snap-mandatory scrollbar-hide' 
              : 'overflow-x-hidden'
          }`}
          onTouchStart={(e) => {
            handleTouchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <motion.div 
            ref={ref} 
            className={`flex h-full ${
              isMobile 
                ? 'gap-4' 
                : 'gap-4 md:gap-6'
            }`}
          >
            {contents.map((item, index) => (
              <motion.div
                key={index}
                className={`relative h-full overflow-hidden ${
                  isMobile 
                    ? 'min-w-[280px] sm:min-w-[320px] snap-center' 
                    : 'min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]'
                } flex-shrink-0`}
                variants={itemVariants}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="w-full h-full relative group ">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover rounded-lg transition-transform duration-300 "
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
                    priority={index < 3}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 md:gap-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight max-w-[200px] md:max-w-[250px]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90 leading-relaxed max-w-[220px] md:max-w-[250px] md:text-right">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Bar - Hidden on mobile, shown on desktop */}
        {/* <div className="hidden md:flex justify-center mt-8">
          <div className="w-32 sm:w-40 md:w-48 lg:w-[200px] h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                background: "linear-gradient(to right, #CF1E00, #ED6400)",
                width: "5%",
                transformOrigin: "left center"
              }}
            />
          </div>
        </div> */}

        {/* Mobile Dots Indicator */}
        {/* <div className="flex md:hidden justify-center mt-6 space-x-2">
          {contents.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#CF1E00] w-6' 
                  : 'bg-gray-300'
              }`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const slideWidth = container.clientWidth;
                  setCurrentSlide(index);
                  gsap.to(container, {
                    scrollLeft: index * slideWidth,
                    duration: 0.5,
                    ease: "power2.out"
                  });
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default LandingService;