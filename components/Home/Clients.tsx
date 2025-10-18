"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image';
import {
  AmulLogo,
  HavLogo,
  KFCLogo,
  tvsLogo,
  DBSLogo,
  ZomatoLogo,
  DaikinLogo,
  DalmiaLogo,
  BhimaLogo,
  HondaLogo,
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
  HatsunLogo,
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
  RoyalLogo,
} from "@/components/ReUsableComponents/Icons/Icons";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Type definitions
interface LogoData {
  id: number;
  name: string;
  image: any;
  size: { width: number; height: number };
  positionIndex: number;
  section: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

// Constants
const NUM_SECTIONS = 3;
const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;
const RESIZE_DEBOUNCE = 150;
const SCROLL_TRIGGER_ID = "clientsScrollTrigger";

// Static logo data
const LOGO_CONFIG_BY_SECTION = {
  0: [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 150, height: 40 } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 150, height: 145 } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 150, height: 85 } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 220, height: 82 } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 120, height: 34 } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 150, height: 35 } },
    { id: 7, name: "Daikin", image: DaikinLogo, size: { width: 150, height: 40 } },
    { id: 8, name: "Dalmia", image: DalmiaLogo, size: { width: 150, height: 40 } },
    { id: 9, name: "Honda", image: HondaLogo, size: { width: 150, height: 40 } },
    { id: 10, name: "JSW", image: JSWLogo, size: { width: 150, height: 40 } },
    { id: 11, name: "Kalyan", image: KalyanLogo, size: { width: 150, height: 40 } },
    { id: 12, name: "LLyod", image: LLyodLogo, size: { width: 120, height: 40 } },
    { id: 13, name: "Malabar", image: MalabarLogo2, size: { width: 150, height: 40 } },
    { id: 14, name: "Muthhoot", image: MuthhootLogo, size: { width: 150, height: 40 } },
    { id: 15, name: "Nippon", image: NipponLogo, size: { width: 150, height: 40 } },
    { id: 16, name: "TataIpl", image: TataIplLogo, size: { width: 150, height: 40 } },
  ],
  1: [
    { id: 17, name: "Bhima", image: BhimaLogo, size: { width: 150, height: 40 } },
    { id: 18, name: "Asian", image: AsianLogo, size: { width: 150, height: 40 } },
    { id: 19, name: "Ambuja", image: AmbujaLogo, size: { width: 150, height: 40 } },
    { id: 20, name: "Acc", image: AccLogo, size: { width: 150, height: 40 } },
    { id: 21, name: "Act", image: ActLogo, size: { width: 150, height: 40 } },
    { id: 22, name: "Agni", image: AgniLogo, size: { width: 150, height: 40 } },
    { id: 23, name: "Amrutanjan", image: AmrutanjanLogo, size: { width: 150, height: 40 } },
    { id: 24, name: "Bosch", image: BoschIcon, size: { width: 150, height: 40 } },
    { id: 25, name: "Cas", image: CasLogo, size: { width: 150, height: 40 } },
    { id: 26, name: "Grb", image: GrbLogo, size: { width: 200, height: 90 } },
    { id: 27, name: "Grt", image: GrtLogo, size: { width: 150, height: 40 } },
    { id: 28, name: "Hatsun", image: HatsunLogo, size: { width: 250, height: 140 } },
    { id: 29, name: "IOB", image: IOBLogo, size: { width: 150, height: 40 } },
    { id: 30, name: "James", image: JamesLogo, size: { width: 150, height: 40 } },
    { id: 31, name: "Khadim", image: KhadimLogo, size: { width: 150, height: 40 } },
  ],
  2: [
    { id: 32, name: "LG", image: LGLogo, size: { width: 150, height: 40 } },
    { id: 33, name: "Lisha", image: LishaLogo, size: { width: 150, height: 40 } },
    { id: 34, name: "Maruti", image: MarutiLogo, size: { width: 150, height: 40 } },
    { id: 35, name: "Metro", image: MetroLogo, size: { width: 150, height: 40 } },
    { id: 36, name: "Pepe", image: PepeLogo, size: { width: 150, height: 40 } },
    { id: 37, name: "Shriram", image: ShriramLogo, size: { width: 150, height: 40 } },
    { id: 38, name: "SPR", image: SPRLogo, size: { width: 150, height: 40 } },
    { id: 39, name: "Thangamayil", image: ThangamayilLogo, size: { width: 150, height: 40 } },
    { id: 40, name: "VGN", image: VGNLogo, size: { width: 150, height: 40 } },
    { id: 41, name: "VST", image: VSTLogo, size: { width: 150, height: 40 } },
    { id: 42, name: "Burger", image: BurgerLogo, size: { width: 100, height: 60 } },
    { id: 43, name: "Hero", image: HeroLogo, size: { width: 150, height: 40 } },
    { id: 44, name: "Impex", image: ImpexLogo, size: { width: 150, height: 40 } },
    { id: 45, name: "Mahindra", image: MahindraLogo, size: { width: 150, height: 40 } },
    { id: 46, name: "Royal", image: RoyalLogo, size: { width: 150, height: 40 } },
  ],
};

const POSITIONS_CONFIG = {
  Amul: { x: -200, y: 400 },
  Havells: { x: 350, y: 100 },
  KFC: { x: 500, y: -70 },
  TVS: { x: 245, y: -200 },
  DBS: { x: -400, y: -260 },
  Zomato: { x: 4, y: 195 },
  Bhima: { x: -405, y: 200 },
  Daikin: { x: -525, y: 45 },
  Dalmia: { x: 250, y: 440 },
  Honda: { x: -270, y: -70 },
  JSW: { x: 370, y: -325 },
  LLyod: { x: 200, y: 300 },
  Malabar: { x: 500, y: 280 },
  Muthhoot: { x: 600, y: -200 },
  Nippon: { x: -100, y: -300 },
  TataIpl: { x: 0, y: -440 },
  Kalyan: { x: -325, y: 150 },
  Asian: { x: 4, y: 215 },
  Ambuja: { x: 370, y: 325 },
  Acc: { x: -200, y: 400 },
  Act: { x: 0, y: -440 },
  Agni: { x: -400, y: -260 },
  Amrutanjan: { x: 340, y: -410 },
  Bosch: { x: -100, y: -300 },
  Cas: { x: -525, y: 45 },
  Grb: { x: -200, y: 100 },
  Grt: { x: 350, y: 100 },
  Hatsun: { x: 525, y: 6 },
  IOB: { x: 100, y: -200 },
  James: { x: -300, y: -100 },
  Khadim: { x: 400, y: -200 },
  LG: { x: -440, y: -260 },
  Lisha: { x: 505, y: -70 },
  Maruti: { x: 525, y: 160 },
  Metro: { x: -80, y: -330 },
  Pepe: { x: 4, y: 210 },
  Shriram: { x: 0, y: -485 },
  SPR: { x: -230, y: 370 },
  Thangamayil: { x: -525, y: 45 },
  VGN: { x: 200, y: -100 },
  VST: { x: 300, y: 100 },
  Burger: { x: 380, y: -450 },
  Hero: { x: -200, y: 100 },
  Impex: { x: 400, y: -200 },
  Mahindra: { x: -275, y: -120 },
  Royal: { x: 370, y: 365 },
};

const LandingClients2: React.FC = () => {
  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapContextRef = useRef<gsap.Context | null>(null);
  const animationFrameRef = useRef<number>(0);
  const pendingSectionChangeRef = useRef<number | null>(null);

  // State
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const [activeSection, setActiveSection] = useState(0);

  // Memoized values
  const circleSizeFactor = useMemo(() => 
    windowSize.width < 768 ? 1.75 : windowSize.width < 1024 ? 1.5 : 1.1, 
    [windowSize.width]
  );

  const baseCircleSizes = useMemo(() => ({
    small: { width: 457 * circleSizeFactor, height: 438 * circleSizeFactor },
    medium: { width: 670 * circleSizeFactor, height: 640 * circleSizeFactor },
    large: { width: 971 * circleSizeFactor, height: 926 * circleSizeFactor },
  }), [circleSizeFactor]);

  // Utility functions
  const getCircleSize = useCallback((baseSize: number): number => {
    return Math.round(baseSize * circleRatio);
  }, [circleRatio]);

  const getResponsiveSize = useCallback((baseSize: number): number => {
    return Math.round(baseSize * circleRatio);
  }, [circleRatio]);

  const getResponsivePosition = useCallback((basePosition: number): number => {
    return Math.round(basePosition * circleRatio * circleSizeFactor);
  }, [circleRatio, circleSizeFactor]);

  // Positions (memoized with responsive values)
  const positions = useMemo<Record<string, Position>>(() => {
    const result: Record<string, Position> = {};
    Object.entries(POSITIONS_CONFIG).forEach(([name, pos]) => {
      result[name] = {
        x: getResponsivePosition(pos.x),
        y: getResponsivePosition(pos.y),
      };
    });
    return result;
  }, [getResponsivePosition]);

  // Logo list (memoized with responsive sizes)
  const logoList = useMemo<LogoData[]>(() => {
    if (circleRatio <= 0) return [];
    
    const allLogos: LogoData[] = [];
    Object.entries(LOGO_CONFIG_BY_SECTION).forEach(([sectionIdx, section]) => {
      section.forEach((logo, idx) => {
        allLogos.push({
          ...logo,
          size: {
            width: getResponsiveSize(logo.size.width),
            height: getResponsiveSize(logo.size.height),
          },
          positionIndex: idx,
          section: parseInt(sectionIdx),
        });
      });
    });
    return allLogos;
  }, [circleRatio, getResponsiveSize]);

  // Calculate base scale
  const calculateBaseScale = useCallback(() => {
    if (windowSize.width <= 0 || windowSize.height <= 0) return;
    
    const screenRatio = windowSize.width / windowSize.height;
    const referenceRatio = REFERENCE_WIDTH / REFERENCE_HEIGHT;
    
    const baseScale = screenRatio > referenceRatio 
      ? windowSize.height / REFERENCE_HEIGHT
      : windowSize.width / REFERENCE_WIDTH;
    
    setCircleRatio(baseScale);
  }, [windowSize]);

  // Handle window resize with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, RESIZE_DEBOUNCE);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize, { passive: true });
    }

    return () => {
      clearTimeout(timeoutId);
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
  }, [windowSize, calculateBaseScale]);

  // Combined main effect for scroll trigger and animations
  useEffect(() => {
    if (!logoList.length || typeof window === "undefined" || !scrollContainerRef.current) {
      return;
    }

    const container = scrollContainerRef.current;
    container.style.visibility = 'hidden';

    gsap.registerPlugin(ScrollTrigger);
    
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
    }

    gsapContextRef.current = gsap.context(() => {
      const sectionHeight = window.innerHeight;

      // Initialize logos and section content - prevent flickering with proper initial state
      const sectionContents = document.querySelectorAll('.section-content');
      gsap.set(sectionContents, (index: number) => ({
        opacity: index === 0 ? 1 : 0,
        pointerEvents: index === 0 ? "auto" : "none",
        willChange: "opacity",
      }));

      // Set initial logo state - prevent flickering
      logoList.forEach((logo) => {
        const element = logoRefs.current[logo.id - 1];
        if (element) {
          const position = positions[logo.name];
          const isActiveSection = logo.section === 0;
          gsap.set(element, {
            x: position.x,
            y: position.y,
            scale: isActiveSection ? 1 : 0,
            opacity: isActiveSection ? 1 : 0,
            visibility: isActiveSection ? "visible" : "hidden",
            willChange: "transform, opacity, visibility",
            force3D: true,
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          });
        }
      });

      // Create scroll trigger
      ScrollTrigger.create({
        id: SCROLL_TRIGGER_ID,
        trigger: container,
        start: "center center",
        end: `+=${sectionHeight * (NUM_SECTIONS - 1)}`,
        pin: true,
        scrub: 0.3,
        preventOverlaps: true,
        onUpdate: function (self) {
          const progress = self.progress;
          let newSection;

          if (progress < 1 / NUM_SECTIONS) {
            newSection = 0;
          } else if (progress < 2 / NUM_SECTIONS) {
            newSection = 1;
          } else {
            newSection = 2;
          }

          if (newSection !== activeSection) {
            pendingSectionChangeRef.current = newSection;
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            animationFrameRef.current = requestAnimationFrame(() => {
              if (pendingSectionChangeRef.current !== null) {
                setActiveSection(pendingSectionChangeRef.current);
                pendingSectionChangeRef.current = null;
              }
            });
          }
        },
        snap: {
          snapTo: [0, 0.5, 1],
          duration: { min: 0.1, max: 0.3 },
          delay: 0.5,
          ease: "power1.inOut"
        },
        markers: false,
        onKill: () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        }
      });

      container.style.visibility = 'visible';
    }, container);

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [logoList, activeSection, positions]);

  // Optimized effect for section transitions - with killTweens to prevent flickering
  useEffect(() => {
    if (!logoList.length) return;

    gsap.context(() => {
      // Animate section content
      const sectionContents = document.querySelectorAll('.section-content');
      sectionContents.forEach((content, index) => {
        if (index === activeSection) {
          gsap.killTweensOf(content);
          gsap.to(content, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            pointerEvents: "auto",
            overwrite: "auto",
          });
        } else {
          gsap.killTweensOf(content);
          gsap.to(content, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
            pointerEvents: "none",
            overwrite: "auto",
          });
        }
      });

      // Animate logos
      logoList.forEach((logo) => {
        const element = logoRefs.current[logo.id - 1];
        const position = positions[logo.name];

        if (!element) return;

        gsap.killTweensOf(element);

        if (logo.section === activeSection) {
          gsap.fromTo(element,
            {
              x: position.x,
              y: position.y,
              scale: 0,
              opacity: 0,
              visibility: "hidden",
            },
            {
              duration: 0.7,
              scale: 1,
              opacity: 1,
              visibility: "visible",
              ease: "back.out(1.2)",
              delay: 0.03 * logo.positionIndex,
              overwrite: "auto",
            }
          );
        } else {
          gsap.to(element, {
            duration: 0.4,
            scale: 0,
            opacity: 0,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => {
              gsap.set(element, { visibility: "hidden" });
            },
          });
        }
      });
    }, containerRef);

  }, [activeSection, logoList, positions]);

  // Responsive text size calculation
  const textSizeClass = useMemo(() => {
    if (windowSize.width < 768) return "text-2xl";
    if (windowSize.width < 1024) return "text-3xl";
    return "text-4xl";
  }, [windowSize.width]);

  return (
    <div 
      className="relative md:mb-0 mb-[-150px] min-h-screen flex items-center justify-center" 
      ref={scrollContainerRef} 
      id="landingClients"
    >
      <div
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center"
        ref={containerRef}
      >
        {/* Circles */}
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60 pointer-events-none"
          style={{
            width: getCircleSize(baseCircleSizes.small.width) + "px",
            height: getCircleSize(baseCircleSizes.small.height) + "px",
            willChange: "width, height",
          }}
        />
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60 pointer-events-none"
          style={{
            width: getCircleSize(baseCircleSizes.medium.width) + "px",
            height: getCircleSize(baseCircleSizes.medium.height) + "px",
            willChange: "width, height",
          }}
        />
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center pointer-events-none"
          style={{
            width: getCircleSize(baseCircleSizes.large.width) + "px",
            height: getCircleSize(baseCircleSizes.large.height) + "px",
            willChange: "width, height",
          }}
        >
          <div className="text-center">
            <p className={`text-black font-medium ${textSizeClass}`}>
              Our Clients
            </p>
          </div>
        </div>

        {/* Section Content Wrappers */}
        {Array.from({ length: NUM_SECTIONS }, (_, index) => (
          <div 
            key={`section-${index}`}
            className="section-content absolute w-full h-full pointer-events-none" 
            style={{
              opacity: activeSection === index ? 1 : 0,
              pointerEvents: activeSection === index ? "auto" : "none",
              willChange: "opacity",
            }}
          />
        ))}

        {/* Logos */}
        {logoList.map((logo) => {
          const position = positions[logo.name];
          const isActive = logo.section === activeSection;

          return (
            <div
              key={logo.id}
              ref={(el) => {
                logoRefs.current[logo.id - 1] = el;
              }}
              className="absolute flex flex-col items-center pointer-events-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${isActive ? 1 : 0})`,
                opacity: isActive ? 1 : 0,
                visibility: isActive ? "visible" : "hidden",
                willChange: "transform, opacity, visibility",
              }}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={logo.size.width}
                height={logo.size.height}
                className="object-contain"
                sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 200px"
                priority={activeSection === logo.section && logo.positionIndex < 5}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingClients2;