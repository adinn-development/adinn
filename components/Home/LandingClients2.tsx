"use client";
import React, { useEffect, useRef, useState } from 'react'
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


const LandingClients2 = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const [logoList, setLogoList] = useState<any[]>([]);
  const circleSizeFactor = windowSize.width < 768 ? 1.75 : 1.1; 
  const [activeSection, setActiveSection] = useState(0);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initializedRef = useRef(false);


  // Base circle sizes (before scaling)
  const baseCircleSizes = {
    small: { width: 457 * circleSizeFactor, height: 438 * circleSizeFactor },
    medium: { width: 670 * circleSizeFactor, height: 640 * circleSizeFactor },
    large: { width: 971 * circleSizeFactor, height: 926 * circleSizeFactor },
  };
  const getCircleSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

    // Calculate responsive sizes based on the base scale
    const getResponsiveSize = (baseSize: number) => {
        return Math.round(baseSize * circleRatio);
      };
    
      // Calculate responsive positions - adjust to account for larger circles
      const getResponsivePosition = (basePosition: number) => {
        return Math.round(basePosition * circleRatio * circleSizeFactor);
      };
    

  const positions: Record<string, { x: number; y: number }> = {
    // Section 0 logos
    Amul: { x: getResponsivePosition(-200), y: getResponsivePosition(400) },
    Havells: { x: getResponsivePosition(350), y: getResponsivePosition(100) },
    KFC: { x: getResponsivePosition(500), y: getResponsivePosition(-70) },
    TVS: { x: getResponsivePosition(245), y: getResponsivePosition(-200) },
    DBS: { x: getResponsivePosition(-400), y: getResponsivePosition(-260) },
    Zomato: { x: getResponsivePosition(4), y: getResponsivePosition(195) },
    Bhima:{x:getResponsivePosition(-405), y:getResponsivePosition(200)},
    Daikin: { x: getResponsivePosition(-525), y: getResponsivePosition(45) },
    Dalmia: { x: getResponsivePosition(250), y: getResponsivePosition(440) },
    Honda: { x: getResponsivePosition(-270), y: getResponsivePosition(-70) },
    JSW: { x: getResponsivePosition(370), y: getResponsivePosition(-325) },
    LLyod: { x: getResponsivePosition(200), y: getResponsivePosition(300) },
    Malabar: { x: getResponsivePosition(500), y: getResponsivePosition(280) },
    Muthhoot: { x: getResponsivePosition(600), y: getResponsivePosition(-200) },
    Nippon: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) },
    TataIpl: { x: getResponsivePosition(0), y: getResponsivePosition(-440) },
    Kalyan: { x: getResponsivePosition(-325), y: getResponsivePosition(150) },
  
    // Section 1 logos
    Asian: { x: getResponsivePosition(4), y: getResponsivePosition(215) },
    Ambuja: { x: getResponsivePosition(370), y: getResponsivePosition(325) },
    Acc: { x: getResponsivePosition(-200), y: getResponsivePosition(400) },
    Act: { x: getResponsivePosition(0), y: getResponsivePosition(-440) },
    Agni: { x: getResponsivePosition(-400), y: getResponsivePosition(-260) },
    Amrutanjan: {
      x: getResponsivePosition(340),
      y: getResponsivePosition(-410),
    },
    Bosch: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) },
    Cas: { x: getResponsivePosition(-525), y: getResponsivePosition(45) },
    Grb: { x: getResponsivePosition(-200), y: getResponsivePosition(100) },
    Grt: { x: getResponsivePosition(350), y: getResponsivePosition(100) },
    Hatsun: { x: getResponsivePosition(525), y: getResponsivePosition(6) },
    IOB: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    James: { x: getResponsivePosition(-300), y: getResponsivePosition(-100) },
    Khadim: { x: getResponsivePosition(400), y: getResponsivePosition(-200) },
  
    // Section 2 logos
    LG: { x: getResponsivePosition(-440), y: getResponsivePosition(-260) },
    Lisha: { x: getResponsivePosition(505), y: getResponsivePosition(-70) },
    Maruti: { x: getResponsivePosition(525), y: getResponsivePosition(160) },
    Metro: { x: getResponsivePosition(-80), y: getResponsivePosition(-330) },
    Pepe: { x: getResponsivePosition(4), y: getResponsivePosition(210) },
    Shriram: { x: getResponsivePosition(0), y: getResponsivePosition(-485) },
    SPR: { x: getResponsivePosition(-230), y: getResponsivePosition(370) },
    Thangamayil: {
      x: getResponsivePosition(-525),
      y: getResponsivePosition(45),
    },
    VGN: { x: getResponsivePosition(200), y: getResponsivePosition(-100) },
    VST: { x: getResponsivePosition(300), y: getResponsivePosition(100) },
    Burger: { x: getResponsivePosition(380), y: getResponsivePosition(-450) },
    Hero: { x: getResponsivePosition(-200), y: getResponsivePosition(100) },
    Impex: { x: getResponsivePosition(400), y: getResponsivePosition(-200) },
    Mahindra: { x: getResponsivePosition(-275), y: getResponsivePosition(-120) },
    Royal: { x: getResponsivePosition(370), y: getResponsivePosition(365) },
  
    // More logos
  };
  // Create logo sets for each section
  const createLogoSets = () => {
    // Section 1 logos
    const section0Logos = [
      {
        id: 1,
        name: "Amul",
        image: AmulLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 0,
        section: 0,
      },
      {
        id: 2,
        name: "Havells",
        image: HavLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(145) },
        positionIndex: 1,
        section: 0,
      },
      {
        id: 3,
        name: "KFC",
        image: KFCLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(85) },
        positionIndex: 2,
        section: 0,
      },
      {
        id: 4,
        name: "TVS",
        image: tvsLogo,
        size: { width: getResponsiveSize(220), height: getResponsiveSize(82) },
        positionIndex: 3,
        section: 0,
      },
      {
        id: 5,
        name: "DBS",
        image: DBSLogo,
        size: { width: getResponsiveSize(120), height: getResponsiveSize(34) },
        positionIndex: 4,
        section: 0,
      },
      {
        id: 6,
        name: "Zomato",
        image: ZomatoLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(35) },
        positionIndex: 5,
        section: 0,
      },
      {
        id: 7,
        name: "Daikin",
        image: DaikinLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 6,
        section: 0,
      },
      {
        id: 8,
        name: "Dalmia",
        image: DalmiaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 7,
        section: 0,
      },
      {
        id: 9,
        name: "Honda",
        image: HondaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 8,
        section: 0,
      },
      {
        id: 10,
        name: "JSW",
        image: JSWLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 9,
        section: 0,
      },
      {
        id: 11,
        name: "Kalyan",
        image: KalyanLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 10,
        section: 0,
      },
      {
        id: 12,
        name: "LLyod",
        image: LLyodLogo,
        size: { width: getResponsiveSize(120), height: getResponsiveSize(40) },
        positionIndex: 11,
        section: 0,
      },
      {
        id: 13,
        name: "Malabar",
        image: MalabarLogo2,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 12,
        section: 0,
      },
      {
        id: 14,
        name: "Muthhoot",
        image: MuthhootLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 13,
        section: 0,
      },
      {
        id: 15,
        name: "Nippon",
        image: NipponLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 14,
        section: 0,
      },
      {
        id: 16,
        name: "TataIpl",
        image: TataIplLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 15,
        section: 0,
      },
      
    ];
  
    // Section 2 logos
    const section1Logos = [
      {
        id: 17,
        name: "Bhima",
        image: BhimaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 15,
        section: 1,
      },
      {
        id: 18,
        name: "Asian",
        image: AsianLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 0,
        section: 1,
      },
      {
        id: 19,
        name: "Ambuja",
        image: AmbujaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 1,
        section: 1,
      },
      {
        id: 20,
        name: "Acc",
        image: AccLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 2,
        section: 1,
      },
      {
        id: 21,
        name: "Act",
        image: ActLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 3,
        section: 1,
      },
      {
        id: 22,
        name: "Agni",
        image: AgniLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 4,
        section: 1,
      },
      {
        id: 23,
        name: "Amrutanjan",
        image: AmrutanjanLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 5,
        section: 1,
      },
      {
        id: 24,
        name: "Bosch",
        image: BoschIcon,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 6,
        section: 1,
      },
      {
        id: 25,
        name: "Cas",
        image: CasLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 7,
        section: 1,
      },
      {
        id: 26,
        name: "Grb",
        image: GrbLogo,
        size: { width: getResponsiveSize(200), height: getResponsiveSize(90) },
        positionIndex: 8,
        section: 1,
      },
      {
        id: 27,
        name: "Grt",
        image: GrtLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 9,
        section: 1,
      },
      {
        id: 28,
        name: "Hatsun",
        image: HatsunLogo,
        size: { width: getResponsiveSize(250), height: getResponsiveSize(140) },
        positionIndex: 10,
        section: 1,
      },
      {
        id: 29,
        name: "IOB",
        image: IOBLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 11,
        section: 1,
      },
      {
        id: 30,
        name: "James",
        image: JamesLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 12,
        section: 1,
      },
      {
        id: 31,
        name: "Khadim",
        image: KhadimLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 13,
        section: 1,
      },
    ];
  
    // Section 3 logos
    const section2Logos = [
      {
        id: 32,
        name: "LG",
        image: LGLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 0,
        section: 2,
      },
      {
        id: 33,
        name: "Lisha",
        image: LishaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 1,
        section: 2,
      },
      {
        id: 34,
        name: "Maruti",
        image: MarutiLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 2,
        section: 2,
      },
      {
        id: 35,
        name: "Metro",
        image: MetroLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 3,
        section: 2,
      },
      {
        id: 36,
        name: "Pepe",
        image: PepeLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 4,
        section: 2,
      },
      {
        id: 37,
        name: "Shriram",
        image: ShriramLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 5,
        section: 2,
      },
      {
        id: 38,
        name: "SPR",
        image: SPRLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 6,
        section: 2,
      },
      {
        id: 39,
        name: "Thangamayil",
        image: ThangamayilLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 7,
        section: 2,
      },
      {
        id: 40,
        name: "VGN",
        image: VGNLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 8,
        section: 2,
      },
      {
        id: 41,
        name: "VST",
        image: VSTLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 9,
        section: 2,
      },
      {
        id: 42,
        name:"Burger",
        image: BurgerLogo,
        size: { width: getResponsiveSize(100), height: getResponsiveSize(60) },
        positionIndex: 10,
        section: 2,
      },
      {
        id: 43,
        name: "Hero",
        image: HeroLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 11,
        section: 2,
      },
      {
        id: 44,
        name: "Impex",
        image: ImpexLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 12,
        section: 2,
      },
      {
        id: 45,
        name: "Mahindra",
        image: MahindraLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 13,
        section: 2,
      },
      {
        id: 46,
        name: "Royal",
        image: RoyalLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 14,
        section: 2,
      },
    ];
  
      return [...section0Logos, ...section1Logos, ...section2Logos];
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

   

    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
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
    
      useEffect(() => {
        if (windowSize.width > 0 && windowSize.height > 0) {
          calculateBaseScale();
        }
      }, [windowSize]);
    
  // Update logo list when circle ratio changes
  useEffect(() => {
    if (circleRatio > 0) {
      setLogoList(createLogoSets());
    }
    
  }, [circleRatio]);
    // Initialize logos for active section
    useEffect(() => {
        if (!logoList.length) return;
    
        // Set initial visibility for all logos
        logoList.forEach((logo) => {
          const element = logoRefs.current[logo.id - 1];
          if (element) {
            const position = positions[logo.name];
            // Just set initial position without animation
            gsap.set(element, {
              x: position.x,
              y: position.y,
              scale: logo.section === activeSection ? 1 : 0,
              opacity: logo.section === activeSection ? 1 : 0,
              visibility: logo.section === activeSection ? "visible" : "hidden",
            });
          }
        });
    
        initializedRef.current = true;
      }, [logoList]);
    

 // Handle section content visibility changes
 useEffect(() => {
    const sectionContents = document.querySelectorAll('.section-content');
    if (sectionContents.length >= 3) {
      // Same animation style for all section contents
      sectionContents.forEach((content, index) => {
        if (index === activeSection) {
          gsap.fromTo(content, 
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power1.out",
              pointerEvents: "auto",
              overwrite: true
            }
          );
        } else {
          gsap.to(content, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.in",
            pointerEvents: "none",
            overwrite: true
          });
        }
      });
    }
  }, [activeSection]);

  useEffect(() => {
    if (
      !logoList.length ||
      typeof window === "undefined" ||
      !scrollContainerRef.current
    )
      return;
      
    const container = scrollContainerRef.current;
    container.style.visibility = 'hidden';
    
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const numSections = 3;
      const sectionHeight = window.innerHeight;
      
      // Create main scroll trigger with center-center positioning
      const mainTrigger = ScrollTrigger.create({
        id: "clientsScrollTrigger",
        trigger: container,
        start: "center center", // Center of trigger meets center of viewport
        end: `+=${sectionHeight * (numSections - 1)}`,
        pin: true,
        scrub: 0.3,
        preventOverlaps: true,
        onUpdate: function(self) {
          // Calculate section based on progress, using thresholds for smoother transitions
          const progress = self.progress;
          let newSection;
          
          // Divide progress into equal sections with thresholds
          if (progress < 1/numSections) {
            newSection = 0; // Section 1
          } else if (progress < 2/numSections) {
            newSection = 1; // Section 2
          } else {
            newSection = 2; // Section 3
          }
          
          // Only update if section changed
          if (newSection !== activeSection) {
            setActiveSection(newSection);
          }
        },
        snap: {
          snapTo: [0, 0.5, 1],
          duration: { min: 0.1, max: 0.3 },
          delay: 0.5,
          ease: "power1.inOut"
        },
        markers: false // Set to true for debugging
      });
      
      // Make container visible after setup
      container.style.visibility = 'visible';
      
      return () => {
        mainTrigger.kill();
      };
    }, container);
    
    return () => {
      ctx.revert();
    };
  }, [logoList, windowSize, activeSection]);
  
  // Make sure sections are initially set up correctly  
  useEffect(() => {
    const sectionContents = document.querySelectorAll('.section-content');
    if (sectionContents.length >= 1) {
      // Just set initial visibility without animation
      sectionContents.forEach((content, index) => {
        gsap.set(content, { 
          opacity: index === 0 ? 1 : 0, 
          pointerEvents: index === 0 ? "auto" : "none" 
        });
      });
    }
  }, []);

    // Update logos when active section changes
    useEffect(() => {
        if (!logoList.length) return;
    
        const ctx = gsap.context(() => {
          // Apply same animation style for all sections
          logoList.forEach((logo) => {
            const element = logoRefs.current[logo.id - 1];
            const position = positions[logo.name];
    
            if (!element) return;
    
            if (logo.section === activeSection) {
              // Animation for appearing logos - same for all sections
              gsap.fromTo(element,
                {
                  x: position.x,
                  y: position.y,
                  scale: 0,
                  opacity: 0,
                  visibility: "hidden",
                },
                {
                  duration: 0.8,
                  scale: 1,
                  opacity: 1,
                  visibility: "visible",
                  ease: "power1.out",
                  delay: 0.04 * logo.positionIndex,
                  overwrite: true,
                }
              );
            } else {
              // Animation for disappearing logos
              gsap.to(element, {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                ease: "power1.in",
                overwrite: true,
                onComplete: () => {
                  gsap.set(element, { visibility: "hidden" });
                },
              });
            }
          });
        }, containerRef);
    
        return () => {
          ctx.revert();
        };
      }, [activeSection, logoList]);
      
  return (
    <div className="relative md:mb-0 mb-[-150px] min-h-screen flex items-center justify-center" ref={scrollContainerRef} id="landingClients">
      <div
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center"
        ref={containerRef}
      >
        {/* Circles */}
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60"
          style={{
            width: getCircleSize(baseCircleSizes.small.width) + "px",
            height: getCircleSize(baseCircleSizes.small.height) + "px",
          }}
        ></div>
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60"
          style={{
            width: getCircleSize(baseCircleSizes.medium.width) + "px",
            height: getCircleSize(baseCircleSizes.medium.height) + "px",
          }}
        ></div>
        <div
          className="absolute rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center"
          style={{
            width: getCircleSize(baseCircleSizes.large.width) + "px",
            height: getCircleSize(baseCircleSizes.large.height) + "px",
          }}
        >
          <div className="text-center">
            <p
              className={`text-black font-medium ${
                windowSize.width < 768
                  ? "text-2xl"
                  : windowSize.width < 1024
                  ? "text-3xl"
                  : "text-4xl"
              }`}
            >
              Our Clients
            </p>
            {/* <p className="text-gray-500 mt-2">Section {activeSection + 1}/3</p> */}
          </div>
        </div>

        {/* Section Content Wrappers - consistent styling for all sections */}
        <div className="section-content absolute w-full h-full" style={{ 
          opacity: activeSection === 0 ? 1 : 0,
          pointerEvents: activeSection === 0 ? "auto" : "none"
        }}>
          {/* Section 0 content */}
        </div>
        <div className="section-content absolute w-full h-full" style={{ 
          opacity: activeSection === 1 ? 1 : 0,
          pointerEvents: activeSection === 1 ? "auto" : "none"
        }}>
          {/* Section 1 content */}
        </div>
        <div className="section-content absolute w-full h-full" style={{ 
          opacity: activeSection === 2 ? 1 : 0,
          pointerEvents: activeSection === 2 ? "auto" : "none"
        }}>
          {/* Section 2 content */}
        </div>

        {/* Logos */}
        {logoList.map((logo, index) => {
          const position = positions[logo.name];
          const isActive = logo.section === activeSection;

          return (
            <div
              key={logo.id}
              ref={(el) => {
                logoRefs.current[logo.id - 1] = el;
              }}
              className="absolute flex flex-col items-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${
                  isActive ? 1 : 0
                })`,
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
                // priority={logo.section === 0 || logo.section === 1} // Prioritize first and second section logos
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default LandingClients2
