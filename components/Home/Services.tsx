"use client";
import React, { useRef, useEffect, useCallback, useMemo } from "react";
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
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with proper context checking
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingService = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);
  const isInitializedRef = useRef(false);
  const componentIdRef = useRef(`landing-service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Memoize contents to prevent recreation on every render
  const contents = useMemo(() => [
    {
      title: "Roadshow",
      image: Service1,
    },
    {
      title: "OOH Media",
      image: Service2,
    },
    {
      title: "Signage",
      image: Service3,
    },
    {
      title: "Events & Activations",
      image: Service4,
    },
    {
      title: "Fixtures",
      image: Service1,
    },
    {
      title: "POPs & Offsets",
      image: Service2,
    },
    {
      title: "Wall Painting",
      image: Service2,
    },
    {
      title: "Digital Marketing",
      image: Service2,
    },
  ], []);

  // Simplified cleanup function
  const cleanupGSAP = useCallback(() => {
    try {
      // Kill ScrollTrigger instance with specific ID
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill(true);
        scrollTriggerInstanceRef.current = null;
      }

      // Reset container position
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { 
          x: 0, 
          clearProps: "transform" 
        });
      }

      isInitializedRef.current = false;
    } catch (error) {
      console.warn('GSAP cleanup error:', error);
    }
  }, []);

  // GSAP ScrollTrigger setup - ONLY for lg screens and above
  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;

    if (!section || !container) return;
    if (isInitializedRef.current) return;

    // Cleanup any existing instances
    cleanupGSAP();

    // Check if desktop (lg and above only)
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (!isDesktop) return;

    const setupAnimation = () => {
      try {
        // Calculate scroll distance
        const scrollWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        const scrollDistance = scrollWidth - containerWidth;

        if (scrollDistance <= 0) return;

        // Mark as initialized
        isInitializedRef.current = true;

        // Create ONLY the horizontal scroll animation - no other effects
        scrollTriggerInstanceRef.current = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: componentIdRef.current, // Unique ID to avoid conflicts
          refreshPriority: -1, // Lower priority to avoid conflicts with other sections
          
          // Simple horizontal scroll animation only
          animation: gsap.to(container, {
            x: -scrollDistance,
            ease: "none",
            duration: 1,
          }),

          // Handle refresh without complex rebuilding
          onRefresh: (self) => {
            if (!container) return;
            
            const newScrollWidth = container.scrollWidth;
            const newContainerWidth = container.clientWidth;
            const newScrollDistance = newScrollWidth - newContainerWidth;
            
            if (newScrollDistance > 0) {
              // Kill the old instance and create a new one
              self.kill();
              gsap.set(container, { x: 0 });
              scrollTriggerInstanceRef.current = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${newScrollDistance}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                id: componentIdRef.current,
                refreshPriority: -1,
                animation: gsap.to(container, {
                  x: -newScrollDistance,
                  ease: "none",
                  duration: 1,
                })
              });
            }
          }
        });

      } catch (error) {
        console.warn('GSAP setup error:', error);
        cleanupGSAP();
      }
    };

    // Delayed setup for better stability
    const timeoutId = setTimeout(setupAnimation, 100);
    
    return () => {
      clearTimeout(timeoutId);
      cleanupGSAP();
    };
  }, [contents, cleanupGSAP]);

  // Resize handler - only for lg and above
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout | null = null;
    
    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      
      resizeTimer = setTimeout(() => {
        const isDesktop = window.innerWidth >= 1024; // lg breakpoint
        
        if (isDesktop && scrollTriggerInstanceRef.current) {
          scrollTriggerInstanceRef.current.refresh();
        } else if (!isDesktop) {
          cleanupGSAP();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
    };
  }, [cleanupGSAP]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanupGSAP;
  }, [cleanupGSAP]);

  return (
    <div 
      ref={sectionRef}
      className="flex flex-col items-center justify-start p-4 lg:min-h-screen lg:p-8 lg:overflow-hidden lg:mt-[300px]"
      data-component-id={componentIdRef.current}
    >
      {/* Header Section - Static for mobile/tablet, animated for lg+ */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-start mb-8 lg:mb-12 gap-4 lg:gap-8">
        <div className="flex flex-row items-start text-start justify-start space-x-2 md:space-x-5 ">
          
          <motion.div 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] font-bold text-gray-900 "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OUR
          </motion.div>
          <motion.div 
            className="  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] instrument-font text-[#CF1E00] font-serif italic tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            SERVICES
          </motion.div>
        </div>
      </div>

      {/* Services Container */}
      <div className="relative w-full mt-8 lg:mt-10">
        {/* Mobile/Tablet: Static Grid Layout */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {contents.map((item, index) => (
            <div
              key={`static-${index}`}
              className="relative h-[300px] w-full overflow-hidden"
            >
              <div className="w-full h-full relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover rounded-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 4}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop (lg+): Horizontal Scroll Layout - Animated */}
        <div className="hidden lg:block w-full h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden">
          <motion.div 
            ref={scrollContainerRef}
            className="flex h-full gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {contents.map((item, index) => (
              <div
                key={`desktop-${index}`}
                className="relative h-full min-w-[400px] lg:min-w-[500px] xl:min-w-[600px] flex-shrink-0 overflow-hidden"
              >
                <div className="w-full h-full relative group rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover rounded-lg transition-transform duration-300 ease-out"
                    fill
                    sizes="(max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
                    priority={index < 3}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg group-hover:from-black/90 transition-all duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-row justify-between items-end gap-4">
                      <h3 className="text-2xl font-bold leading-tight max-w-[250px] transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingService;