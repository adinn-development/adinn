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

  // Desktop wheel scroll handler (only for desktop)
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
    const scrollAmount = window.innerWidth >= 1024 ? 600 : 400;
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

  // Desktop only wheel event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollPosition, isScrolling, isMobile]);

  // Update scroll progress (desktop only)
  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !progressBar || isMobile) return;

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
  }, [isMobile]);

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
        {/* Mobile: Static Grid Layout */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-6">
            {contents.map((item, index) => (
              <div
                key={index}
                className="relative h-[300px] w-full overflow-hidden"
              >
                <div className="w-full h-full relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover rounded-lg"
                    fill
                    sizes="100vw"
                    priority={index < 3}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg opacity-80" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Horizontal Scroll Layout */
          <div
            ref={scrollContainerRef}
            className="w-full h-[400px] lg:h-[450px] xl:h-[500px] flex items-center overflow-x-hidden"
          >
            <motion.div 
              ref={ref} 
              className="flex h-full gap-4 md:gap-6"
            >
              {contents.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative h-full min-w-[400px] lg:min-w-[500px] xl:min-w-[600px] flex-shrink-0 overflow-hidden"
                  variants={itemVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <div className="w-full h-full relative group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover rounded-lg transition-transform duration-300"
                      fill
                      sizes="(max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
                      priority={index < 3}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex flex-row justify-between items-end gap-4">
                        <h3 className="text-2xl font-bold leading-tight max-w-[250px]">
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed max-w-[250px] text-right">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Progress Bar - Desktop only */}
       
      </div>
    </div>
  );
};

export default LandingService;