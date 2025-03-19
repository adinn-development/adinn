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
  RoyalLogo,
} from "@/components/ReUsableComponents/Icons/Icons";
import { gsap } from "gsap";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
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

  // Define logo positions
  const positions = [
    { x: getResponsivePosition(-200), y: getResponsivePosition(400) },
    { x: getResponsivePosition(350), y: getResponsivePosition(100) },
    { x: getResponsivePosition(500), y: getResponsivePosition(-70) },
    { x: getResponsivePosition(245), y: getResponsivePosition(-200) },
    { x: getResponsivePosition(-400), y: getResponsivePosition(260) },
    { x: getResponsivePosition(4), y: getResponsivePosition(-195) },
    { x: getResponsivePosition(-525), y: getResponsivePosition(45) },
    { x: getResponsivePosition(250), y: getResponsivePosition(440) },
    { x: getResponsivePosition(-270), y: getResponsivePosition(-70) },
    { x: getResponsivePosition(370), y: getResponsivePosition(-350) },
    { x: getResponsivePosition(-325), y: getResponsivePosition(150) },
    { x: getResponsivePosition(-400), y: getResponsivePosition(-480) },
    { x: getResponsivePosition(500), y: getResponsivePosition(280) },
    { x: getResponsivePosition(500), y: getResponsivePosition(-200) },
    { x: getResponsivePosition(-100), y: getResponsivePosition(-300) },
    { x: getResponsivePosition(0), y: getResponsivePosition(-440) },
  ];

  // Create logo sets for each section
  const createLogoSets = () => {
    // Section 1 logos
    const section0Logos = [
      { id: 1, name: "Amul", image: AmulLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 0, section: 0 },
      { id: 2, name: "Havells", image: HavLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(145) }, positionIndex: 1, section: 0 },
      { id: 3, name: "KFC", image: KFCLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(85) }, positionIndex: 2, section: 0 },
      { id: 4, name: "TVS", image: tvsLogo, size: { width: getResponsiveSize(220), height: getResponsiveSize(82) }, positionIndex: 3, section: 0 },
      { id: 5, name: "DBS", image: DBSLogo, size: { width: getResponsiveSize(120), height: getResponsiveSize(34) }, positionIndex: 4, section: 0 },
      { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(35) }, positionIndex: 5, section: 0 },
      { id: 7, name: "Daikin", image: DaikinLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 6, section: 0 },
      { id: 8, name: "Dalmia", image: DalmiaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 7, section: 0 },
      { id: 9, name: "Honda", image: HondaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 8, section: 0 },
      { id: 10, name: "JSW", image: JSWLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 9, section: 0 },
      { id: 11, name: "Kalyan", image: KalyanLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 10, section: 0 },
      { id: 12, name: "LLyod", image: LLyodLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 11, section: 0 },
      { id: 13, name: "Malabar", image: MalabarLogo2, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 12, section: 0 },
      { id: 14, name: "Muthhoot", image: MuthhootLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 13, section: 0 },
      { id: 15, name: "Nippon", image: NipponLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 14, section: 0 },
      { id: 16, name: "TataIpl", image: TataIplLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 15, section: 0 },
    ];

    // Section 2 logos
    const section1Logos = [
      { id: 17, name: "Asian", image: AsianLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 0, section: 1 },
      { id: 18, name: "Ambuja", image: AmbujaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 1, section: 1 },
      { id: 19, name: "Acc", image: AccLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 2, section: 1 },
      { id: 20, name: "Act", image: ActLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 3, section: 1 },
      { id: 21, name: "Agni", image: AgniLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 4, section: 1 },
      { id: 22, name: "Amrutanjan", image: AmrutanjanLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 5, section: 1 },
      { id: 23, name: "Bosch", image: BoschIcon, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 6, section: 1 },
      { id: 24, name: "Cas", image: CasLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 7, section: 1 },
      { id: 25, name: "Grb", image: GrbLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 8, section: 1 },
      { id: 26, name: "Grt", image: GrtLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 9, section: 1 },
      { id: 27, name: "Hatsun", image: Hatsun, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 10, section: 1 },
      { id: 28, name: "IOB", image: IOBLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 11, section: 1 },
      { id: 29, name: "James", image: JamesLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 12, section: 1 },
      { id: 30, name: "Khadim", image: KhadimLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 13, section: 1 },
    ];

    // Section 3 logos
    const section2Logos = [
      { id: 31, name: "LG", image: LGLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 0, section: 2 },
      { id: 32, name: "Lisha", image: LishaLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 1, section: 2 },
      { id: 33, name: "Maruti", image: MarutiLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 2, section: 2 },
      { id: 34, name: "Metro", image: MetroLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 3, section: 2 },
      { id: 35, name: "Pepe", image: PepeLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 4, section: 2 },
      { id: 36, name: "Shriram", image: ShriramLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 5, section: 2 },
      { id: 37, name: "SPR", image: SPRLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 6, section: 2 },
      { id: 38, name: "Thangamayil", image: ThangamayilLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 7, section: 2 },
      { id: 39, name: "VGN", image: VGNLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 8, section: 2 },
      { id: 40, name: "VST", image: VSTLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 9, section: 2 },
      { id: 41, name: "Burger", image: BurgerLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 10, section: 2 },
      { id: 42, name: "Hero", image: HeroLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 11, section: 2 },
      { id: 43, name: "Impex", image: ImpexLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 12, section: 2 },
      { id: 44, name: "Mahindra", image: MahindraLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 13, section: 2 },
      { id: 45, name: "Royal", image: RoyalLogo, size: { width: getResponsiveSize(150), height: getResponsiveSize(40) }, positionIndex: 14, section: 2 },
    ];

    return [...section0Logos, ...section1Logos, ...section2Logos];
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
      setLogoList(createLogoSets());
    }
  }, [circleRatio]);

  // Update logo visibility based on active section
  const updateLogoVisibility = (sectionIndex: number) => {
    logoList.forEach((logo) => {
      const position = positions[logo.positionIndex];
      
      if (logo.section === sectionIndex) {
        // Show logo with GSAP
        gsap.to(logoRefs.current[logo.id - 1], {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          visibility: 'visible',
          x: position.x,
          y: position.y,
          ease: "power2.out"
        });
      } else {
        // Hide logo with GSAP
        gsap.to(logoRefs.current[logo.id - 1], {
          duration: 0.5,
          scale: 0,
          opacity: 0,
          visibility: 'hidden',
          ease: "power2.out",
          pin: true
        });
      }
    });
  };

  // Handle section switching on scroll
  useEffect(() => {
    if (logoList.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollRatio = scrollY / (documentHeight - viewportHeight);
      
      let newActiveSection;
      if (scrollRatio < 0.33) {
        newActiveSection = 0;
      } else if (scrollRatio < 0.66) {
        newActiveSection = 1;
      } else {
        newActiveSection = 2;
      }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
        updateLogoVisibility(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    updateLogoVisibility(activeSection);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoList, activeSection]);

  // Calculate circle sizes
  const getCircleSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

  // Don't render anything until we have window dimensions
  if (windowSize.width === 0) {
    return null;
  }

  return (
    <div className="p-5 flex items-center justify-center bg-white relative min-h-screen" ref={containerRef}>
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
        <div className="text-center">
          <p className={`text-[#000000] font-medium ${windowSize.width < 768 ? 'text-2xl' : windowSize.width < 1024 ? 'text-3xl' : 'text-4xl'}`}>
            Our Clients
          </p>
          <p className="text-gray-500 mt-2">Section {activeSection + 1}/3</p>
        </div>
      </div>

      {/* Logos */}
      {logoList.map((logo, index) => {
        const position = positions[logo.positionIndex];
        return (
          <div
            key={logo.id}
            ref={(el) => {
              logoRefs.current[index] = el;
            }}
            className="absolute flex flex-col items-center transition-all duration-500"
            style={{
              transform: logoStyles[logo.id]?.transform || `translate(${position.x}px, ${position.y}px) scale(${logo.section === activeSection ? 1 : 0})`,
              opacity: logoStyles[logo.id]?.opacity || (logo.section === activeSection ? 1 : 0),
              visibility: logoStyles[logo.id]?.visibility || (logo.section === activeSection ? 'visible' : 'hidden')
            }}
          >
            <Image
              src={logo.image}
              alt={logo.name}
              width={logo.size.width}
              height={logo.size.height}
              className="object-contain"
              priority={index < 16} // Prioritize loading of first section logos
            />
          </div>
        );
      })}
    </div>
  );
};
  
export default LandingClients;   