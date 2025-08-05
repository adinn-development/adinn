"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Service1,
  Service2,
  Service3,
  Service4,
  ServiceLogo,
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

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

  // Debug: Log image sources
  useEffect(() => {
    console.log("Image sources:", contents.map(item => ({
      title: item.title,
      image: item.image,
      type: typeof item.image
    })));
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleImageError = (index: number) => {
    console.error(`Image failed to load at index ${index}:`, contents[index]);
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const handleImageLoad = (index: number) => {
    console.log(`Image loaded successfully at index ${index}`);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!scrollContainerRef.current) return;

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
    
    const scrollAmount = 600;
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

    gsap.to(container, {
      scrollLeft: targetPosition,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setIsScrolling(false);
      }
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        handleWheel(e);
      }
    };

    container.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelEvent);
    };
  }, [scrollPosition, isScrolling]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !progressBar) return;

    const updateScrollProgress = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) : 0;
      
      setScrollProgress(progress * 100);
      
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
    <div className="md:h-screen mt-[50px] flex flex-col items-center justify-start md:p-8 overflow-hidden md:mt-[300px]">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-8 gap-4 md:gap-0">
        <div className="flex flex-row items-center justify-start space-x-2 md:space-x-3">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold">
            OUR
          </div>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
            SERVICES
          </div>
        </div>

        <div className="text-sm md:text-base lg:text-[27px] hidden sm:block md:block">
          We create impactful and high-performing
          <br className="hidden md:block" /> ads that drive your business growth.
        </div>
      </div>

      {/* Mobile: Static Grid Layout */}
   // Replace your mobile section with this production-ready version

{/* Mobile: Static Grid Layout - PRODUCTION FIX */}
<div className="block md:hidden w-full mt-[50px] px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {contents.map((item, index) => (
      <div
        key={index}
        className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden"
        style={{ minHeight: '300px' }} // Force height for production
      >
        {/* Production-safe image rendering */}
        {typeof window !== 'undefined' && window.innerWidth < 768 ? (
          // Use regular img for mobile in production
          <img
            src={typeof item.image === 'object' ? item.image.src : item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              console.error(`Mobile img error for ${item.title}:`, e);
              // Fallback to a placeholder
              e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f3f4f6"/>
                  <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
                    ${item.title}
                  </text>
                </svg>
              `)}`;
            }}
            onLoad={() => console.log(`Mobile img loaded: ${item.title}`)}
          />
        ) : (
          // Use Next.js Image for desktop
          <Image
            src={item.image}
            alt={item.title}
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={index < 2}
            quality={75}
            onError={() => console.error(`Next Image error: ${item.title}`)}
          />
        )}
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white rounded-b-lg z-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold leading-tight">
              {item.title}
            </h3>
            <p className="text-xs opacity-90 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Desktop: Horizontal Scroll Layout */}
      <div className="hidden md:block relative w-full mt-[80px]">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-hidden h-[500px] flex items-center"
        >
          <motion.div ref={ref} className="flex gap-6 h-full">
            {contents.map((item, index) => (
              <motion.div
                key={index}
                className="relative min-w-[600px] h-full"
                variants={itemVariants}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full h-full relative bg-gray-200 rounded-lg">
                  {imageErrors[index] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                      <div className="text-center p-4">
                        <div className="text-gray-600 mb-2">Image failed to load</div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover rounded-lg"
                      fill
                      sizes="600px"
                      priority={index < 2}
                      onError={() => handleImageError(index)}
                      onLoad={() => handleImageLoad(index)}
                      quality={75}
                      unoptimized
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
                    <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-bold max-w-[250px]">
                        {item.title}
                      </h3>
                      <p className="text-sm max-w-[250px] text-right">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingService;