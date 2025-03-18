"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  BhimaLogo,
  JSWLogo,
  KalyanLogo,
  LLyodLogo,
  MalabarLogo2,
  MuthhootLogo,
  NipponLogo,
  TataIplLogo,
  AsianLogo,
  AmbujaLogo,
  AccLogo,
  ActLogo,
  AgniLogo,
  AmrutanjanLogo,
  BoschIcon,
  CasLogo,
  GrbLogo,
  GrtLogo,
  Hatsun,
  IOBLogo,
  JamesLogo,
  KhadimLogo,
  LGLogo,
  LishaLogo,
  MarutiLogo,
  MetroLogo,
  PepeLogo,
  ShriramLogo,
  SPRLogo,
  ThangamayilLogo,
  VGNLogo,
  VSTLogo,
  BurgerLogo,
  HeroLogo,
  ImpexLogo,
  MahindraLogo,
  RoyalLogo
} from "@/components/ReUsableComponents/Icons/Icons";

gsap.registerPlugin(ScrollTrigger);

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const [currentScrollSection, setCurrentScrollSection] = useState(0);
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
    const referenceWidth = 1920;
    const referenceHeight = 1080;
    const screenRatio = windowSize.width / windowSize.height;
    const referenceRatio = referenceWidth / referenceHeight;
    let baseScale;
    if (screenRatio > referenceRatio) {
      baseScale = windowSize.height / referenceHeight;
    } else {
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

  // Define logo sets for different scroll sections
  const logoSets = [
    // Section 1 (ids 1-16)
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  ];

  // Create responsive logo list
  const getLogoList = () => {
    return [
      // Section 1 logos
      { id: 1, name: "Amul", image: AmulLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-200), y: getResponsivePosition(400) }, section: 0 },
      { id: 2, name: "Havells", image: HavLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(145) }, position: { x: getResponsivePosition(350), y: getResponsivePosition(100) }, section: 0 },
      { id: 3, name: "KFC", image: KFCLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(85) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-70) }, section: 0 },
      { id: 4, name: "TVS", image: tvsLogo, size: { width: getResponsiveSize(220), height: getResponsiveSize(82) }, position: { x: getResponsivePosition(245), y: getResponsivePosition(-200) }, section: 0 },
      { id: 5, name: "DBS", image: DBSLogo, size: { width: getResponsiveSize(120), height: getResponsiveSize(34) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-260) }, section: 0 },
      { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(35) }, position: { x: getResponsivePosition(4), y: getResponsivePosition(195) }, section: 0 },
      { id: 7, name: "Daikin", image: DaikinLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-525), y: getResponsivePosition(45) }, section: 0 },
      { id: 8, name: "Dalmia", image: DalmiaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(250), y: getResponsivePosition(440) }, section: 0 },
      { id: 9, name: "Honda", image: HondaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-270), y: getResponsivePosition(-70) }, section: 0 },
      { id: 10, name: "JSW", image: JSWLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(370), y: getResponsivePosition(-350) }, section: 0 },
      { id: 11, name: "Kalyan", image: KalyanLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-325), y: getResponsivePosition(150) }, section: 0 },
      { id: 12, name: "LLyod", image: LLyodLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-480) }, section: 0 },
      { id: 13, name: "Malabar", image: MalabarLogo2, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(280) }, section: 0 },
      { id: 14, name: "Muthhoot", image: MuthhootLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(600), y: getResponsivePosition(-200) }, section: 0 },
      { id: 15, name: "Nippon", image: NipponLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) }, section: 0 },
      { id: 16, name: "TataIpl", image: TataIplLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(0), y: getResponsivePosition(-440) }, section: 0 },
  
      // Section 2 logos
      { id: 17, name: "Asian", image: AsianLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-200), y: getResponsivePosition(400) }, section: 1 },
      { id: 18, name: "Ambuja", image: AmbujaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(350), y: getResponsivePosition(100) }, section: 1 },
      { id: 19, name: "Acc", image: AccLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-70) }, section: 1 },
      { id: 20, name: "Act", image: ActLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(245), y: getResponsivePosition(-200) }, section: 1 },
      { id: 21, name: "Agni", image: AgniLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(260) }, section: 1 },   
      { id: 22, name: "Amrutanjan", image: AmrutanjanLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(4), y: getResponsivePosition(-195) }, section: 1 },
      { id: 23, name: "Bosch", image: BoschIcon, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-525), y: getResponsivePosition(45) }, section: 1 },
      { id: 24, name: "Cas", image: CasLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(250), y: getResponsivePosition(440) }, section: 1 },
      { id: 25, name: "Grb", image: GrbLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-270), y: getResponsivePosition(-70) }, section: 1 },
      { id: 26, name: "Grt", image: GrtLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(370), y: getResponsivePosition(-350) }, section: 1 },
      { id: 27, name: "Hatsun", image: Hatsun, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-325), y: getResponsivePosition(150) }, section: 1 },
      { id: 28, name: "IOB", image: IOBLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-480) }, section: 1 },
      { id: 29, name: "James", image: JamesLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-200) }, section: 1 },
      { id: 30, name: "Khadim", image: KhadimLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) }, section: 1 },
      
      // Section 3 logos
      { id: 31, name: "LG", image: LGLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-200), y: getResponsivePosition(400) }, section: 2 },
      { id: 32, name: "Lisha", image: LishaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(350), y: getResponsivePosition(100) }, section: 2 },
      { id: 33, name: "Maruti", image: MarutiLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-70) }, section: 2 },
      { id: 34, name: "Metro", image: MetroLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(245), y: getResponsivePosition(-200) }, section: 2 },
      { id: 35, name: "Pepe", image: PepeLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(260) }, section: 2 },
      { id: 36, name: "Shriram", image: ShriramLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(4), y: getResponsivePosition(-195) }, section: 2 },
      { id: 37, name: "SPR", image: SPRLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-525), y: getResponsivePosition(45) }, section: 2 },
      { id: 38, name: "Thangamayil", image: ThangamayilLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(250), y: getResponsivePosition(440) }, section: 2 },
      { id: 39, name: "VGN", image: VGNLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-270), y: getResponsivePosition(-70) }, section: 2 },
      { id: 40, name: "VST", image: VSTLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(370), y: getResponsivePosition(-350) }, section: 2 },
      { id: 41, name: "Burger", image: BurgerLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-325), y: getResponsivePosition(150) }, section: 2 },
      { id: 42, name: "Hero", image: HeroLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-400), y: getResponsivePosition(-480) }, section: 2 },
      { id: 43, name: "Impex", image: ImpexLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-200) }, section: 2 },
      { id: 44, name: "Mahindra", image: MahindraLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(500), y: getResponsivePosition(-200) }, section: 2 },
      { id: 45, name: "Royal", image: RoyalLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, position: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) }, section: 2 },
    ];
  };

  const [logoList, setLogoList] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

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

  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      calculateBaseScale();
    }
  }, [windowSize]);

  useEffect(() => {
    if (circleRatio > 0) {
      setLogoList(getLogoList());
    }
  }, [circleRatio]);

  useEffect(() => {
    if (logoList.length === 0) return;

    const handleScroll = () => {
      // Calculate which section we're in based on scroll position
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;
      
      // Determine which section we're in (0, 1, or 2)
      const newSection = Math.min(
        Math.floor(scrollPercentage / (100 / logoSets.length)), 
        logoSets.length - 1
      );
      
      if (newSection !== currentScrollSection) {
        setCurrentScrollSection(newSection);
      }
      
      const newStyles: { [key: string]: React.CSSProperties } = {};
      
      logoRefs.current.forEach((ref, index) => {
        if (ref && index < logoList.length) {
          const logo = logoList[index];
          const rect = ref.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Check if this logo is in the current section
          const isInCurrentSection = logoSets[currentScrollSection].includes(logo.id);
          
          if (isInCurrentSection) {
            // For logos in the current section, apply scaling effects
            const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
            const scale = Math.max(0.5, 1 - distanceFromCenter / viewportHeight);
            const blur = 5 * (1 - scale);
            const opacity = scale;

            newStyles[logo.id] = {
              transform: `translate(${logo.position.x}px, ${logo.position.y}px) scale(${scale})`,
              filter: `blur(${blur}px)`,
              opacity: opacity,
              display: 'block',
              transition: 'opacity 0.5s, filter 0.5s, transform 0.5s'
            };
          } else {
            // For logos not in the current section, hide them
            newStyles[logo.id] = {
              transform: `translate(${logo.position.x}px, ${logo.position.y}px)`,
              opacity: 0,
              display: 'none',
              transition: 'opacity 0.5s'
            };
          }
        }
      });
      
      setLogoStyles(newStyles);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set up the first section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoList, currentScrollSection]);

  // GSAP animation for the second set of logos
  useEffect(() => {
    const secondSetTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(logoRefs.current.slice(16, 32), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(logoRefs.current.slice(16, 32), {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    return () => {
      secondSetTrigger.kill(); // Clean up the ScrollTrigger on unmount
    };
  }, []);

  // Calculate circle sizes
  const getCircleSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

  // Don't render anything until we have window dimensions
  if (windowSize.width === 0) {
    return null;
  }

  return (
    <div className="p-5 flex items-center justify-center relative h-[60vh]" ref={containerRef}>
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
          {`Our Clients - Set ${currentScrollSection + 1}`}
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
            opacity: logoStyles[logo.id]?.opacity !== undefined ? logoStyles[logo.id].opacity : 
              logoSets[0].includes(logo.id) ? 1 : 0,
            display: logoStyles[logo.id]?.display !== undefined ? logoStyles[logo.id].display : 
              logoSets[0].includes(logo.id) ? 'block' : 'none',
            transition: logoStyles[logo.id]?.transition || 'opacity 0.5s, filter 0.5s, transform 0.5s'
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