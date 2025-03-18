"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  AmulLogo,
  HavLogo,
  KFCLogo,
  tvsLogo,
  DBSLogo,
  ZomatoLogo,
  DaikinLogo,
  DalmiaLogo,
  HondaLogo,
  JSWLogo,
  KalyanLogo,
  LLyodLogo,
  MalabarLogo2,
  MuthhootLogo,
  NipponLogo,
  TataIplLogo,
} from "@/components/ReUsableComponents/Icons/Icons";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Circle size increase factor (1.2 = 20% larger)
  const circleSizeFactor = 1.2;

  // Base circle sizes (before scaling)
  const baseCircleSizes = {
    small: { width: 457 * circleSizeFactor, height: 438 * circleSizeFactor },
    medium: { width: 670 * circleSizeFactor, height: 640 * circleSizeFactor },
    large: { width: 971 * circleSizeFactor, height: 926 * circleSizeFactor }
  };

  // Calculate the base scale for the entire component
  const calculateBaseScale = () => {
    // Reference design size
    const referenceWidth = 1920;
    const referenceHeight = 1080;
    
    // Calculate the current viewport ratio
    const screenRatio = windowSize.width / windowSize.height;
    const referenceRatio = referenceWidth / referenceHeight;
    
    // Determine whether width or height is the limiting factor
    let baseScale;
    if (screenRatio > referenceRatio) {
      // Height limited
      baseScale = windowSize.height / referenceHeight;
    } else {
      // Width limited
      baseScale = windowSize.width / referenceWidth;
    }
    
    setCircleRatio(baseScale);
    return baseScale;
  };

  // Calculate responsive sizes based on the base scale
  const getResponsiveSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

  // Calculate responsive positions - adjust to account for larger circles
  const getResponsivePosition = (basePosition: number) => {
    return Math.round(basePosition * circleRatio * circleSizeFactor);
  };

  // Create responsive logo list
  const getLogoList = () => {
    return [
      { id: 1, name: "Amul", image: AmulLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-200), y: getResponsivePosition(400) } },
      { id: 2, name: "Havells", image: HavLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(145) }, position: { x: getResponsivePosition(350), y: getResponsivePosition(100) } },
      { id: 3, name: "KFC", image: KFCLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(85) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-70) } },
      { id: 4, name: "TVS", image: tvsLogo, size: { width: getResponsiveSize(220), height: getResponsiveSize(82) }, position: { x: getResponsivePosition(245), y: getResponsivePosition(-200) } },
      { id: 5, name: "DBS", image: DBSLogo, size: { width: getResponsiveSize(120), height: getResponsiveSize(34) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-260) } },
      { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(35) }, position: { x: getResponsivePosition(4), y: getResponsivePosition(195) } },
      { id: 7, name: "Daikin", image: DaikinLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-525), y: getResponsivePosition(45) } },
      { id: 8, name: "Dalmia", image: DalmiaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(250), y: getResponsivePosition(440) } },
      { id: 9, name: "Honda", image: HondaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-270), y: getResponsivePosition(-70) } },
      { id: 10, name: "JSW", image: JSWLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(370), y: getResponsivePosition(-350) } },
      { id: 11, name: "Kalyan", image: KalyanLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-325), y: getResponsivePosition(150) } },
      { id: 12, name: "LLyod", image: LLyodLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-480) } },
      { id: 13, name: "Malabar", image: MalabarLogo2, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(280) } },
      { id: 14, name: "Muthhoot", image: MuthhootLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(600), y: getResponsivePosition(-200) } },
      { id: 15, name: "Nippon", image: NipponLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) } },
      { id: 16, name: "TataIpl", image: TataIplLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(0), y: getResponsivePosition(-440) } },
    ];
  };

  const [logoList, setLogoList] = useState<any[]>([]);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initialize
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Calculate base scale when window size changes
  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      calculateBaseScale();
    }
  }, [windowSize]);

  // Update logo list when circle ratio changes
  useEffect(() => {
    if (circleRatio > 0) {
      setLogoList(getLogoList());
    }
  }, [circleRatio]);

  useEffect(() => {
    if (logoList.length === 0) return;

    const handleScroll = () => {
      const newStyles: { [key: string]: React.CSSProperties } = {};
      
      logoRefs.current.forEach((ref, index) => {
        if (ref && index < logoList.length) {
          const logo = logoList[index];
          const rect = ref.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          const scale = Math.max(0.5, 1 - distanceFromCenter / viewportHeight);
          const blur = 5 * (1 - scale);
          const opacity = scale;

          newStyles[logo.id] = {
            transform: `translate(${logo.position.x}px, ${logo.position.y}px) scale(${scale})`,
            filter: `blur(${blur}px)`,
            opacity: opacity,
          };
        }
      });
      
      setLogoStyles(newStyles);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoList]);

  // Calculate circle sizes
  const getCircleSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

  // Don't render anything until we have window dimensions
  if (windowSize.width === 0) {
    return null;
  }

  return (
    <div className="p-5 flex items-center justify-center bg-white relative h-screen overflow-hidden" ref={containerRef}>
      {/* Circles */}
      <div 
        className="absolute rounded-full border border-dashed border-gray-400 opacity-60"
        style={{ 
          width: getCircleSize(baseCircleSizes.small.width) + 'px', 
          height: getCircleSize(baseCircleSizes.small.height) + 'px' 
        }}
      ></div>
      <div 
        className="absolute rounded-full border border-dashed border-gray-400 opacity-60"
        style={{ 
          width: getCircleSize(baseCircleSizes.medium.width) + 'px', 
          height: getCircleSize(baseCircleSizes.medium.height) + 'px' 
        }}
      ></div>
      <div 
        className="absolute rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center"
        style={{ 
          width: getCircleSize(baseCircleSizes.large.width) + 'px', 
          height: getCircleSize(baseCircleSizes.large.height) + 'px' 
        }}
      >
        <p className={`text-[#000000] font-medium ${windowSize.width < 768 ? 'text-2xl' : windowSize.width < 1024 ? 'text-3xl' : 'text-4xl'}`}>
          Our Clients
        </p>
      </div>

      {/* Logos */}
      {logoList.map((logo, index) => (
        <div
          key={logo.id}
          ref={(el) => {
            logoRefs.current[index] = el;
          }}
          className="absolute flex flex-col items-center transition-all duration-500"
          style={{
            transform: logoStyles[logo.id]?.transform || `translate(${logo.position.x}px, ${logo.position.y}px)`,
            filter: logoStyles[logo.id]?.filter || "none",
            opacity: logoStyles[logo.id]?.opacity || 1,
          }}
        >
          <Image
            src={logo.image}
            alt={logo.name}
            width={logo.size.width}
            height={logo.size.height}
            className="object-contain"
            priority={index < 6} // Prioritize loading of first few logos
          />
        </div>
      ))}
    </div>
  );
};

export default LandingClients;