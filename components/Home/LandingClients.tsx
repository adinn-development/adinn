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
import ScrollTrigger from "gsap/ScrollTrigger";

interface Logo {
  id: number;
  positionIndex: number;
  section: number;
  image: string;
  name: string; // Changed to string to avoid error with 'positions'
  size: { width: number; height: number };
}

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{
    [key: string]: React.CSSProperties;
  }>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [circleRatio, setCircleRatio] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sections = [0, 1, 2]; // The three sections
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");
  const scrollTriggerRef = useRef<any>(null);
  const initializedRef = useRef(false);
  const sectionInitializedRef = useRef([false, false, false]);

  // Circle size increase factor (1.2 = 20% larger)
  const circleSizeFactor = windowSize.width < 768 ? 1.75 : 1.1; // 1.0 for mobile, 1.1 for larger screens

  // Base circle sizes (before scaling)
  const baseCircleSizes = {
    small: { width: 457 * circleSizeFactor, height: 438 * circleSizeFactor },
    medium: { width: 670 * circleSizeFactor, height: 640 * circleSizeFactor },
    large: { width: 971 * circleSizeFactor, height: 926 * circleSizeFactor },
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
  const positions: Record<string, { x: number; y: number }> = {
    // Section 0 logos
    Amul: { x: getResponsivePosition(-220), y: getResponsivePosition(380) },
    Havells: { x: getResponsivePosition(330), y: getResponsivePosition(120) },
    KFC: { x: getResponsivePosition(480), y: getResponsivePosition(-90) },
    TVS: { x: getResponsivePosition(235), y: getResponsivePosition(-220) },
    DBS: { x: getResponsivePosition(-410), y: getResponsivePosition(240) },
    Zomato: { x: getResponsivePosition(-150), y: getResponsivePosition(300) },
    Daikin: { x: getResponsivePosition(400), y: getResponsivePosition(-150) },
    Dalmia: { x: getResponsivePosition(-300), y: getResponsivePosition(200) },
    Honda: { x: getResponsivePosition(200), y: getResponsivePosition(-300) },
    JSW: { x: getResponsivePosition(-400), y: getResponsivePosition(100) },
    Kalyan: { x: getResponsivePosition(400), y: getResponsivePosition(-200) },
    LLyod: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) },
    Malabar: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    Muthhoot: { x: getResponsivePosition(-200), y: getResponsivePosition(100) },
    Nippon: { x: getResponsivePosition(200), y: getResponsivePosition(-100) },
    TataIpl: { x: getResponsivePosition(-300), y: getResponsivePosition(0) },
    // Section 1 logos
    Asian: { x: getResponsivePosition(-200), y: getResponsivePosition(350) },
    Ambuja: { x: getResponsivePosition(350), y: getResponsivePosition(80) },
    Acc: { x: getResponsivePosition(490), y: getResponsivePosition(-80) },
    Act: { x: getResponsivePosition(255), y: getResponsivePosition(-180) },
    Agni: { x: getResponsivePosition(-380), y: getResponsivePosition(260) },
    Amrutanjan: {
      x: getResponsivePosition(400),
      y: getResponsivePosition(-200),
    },
    Bosch: { x: getResponsivePosition(-100), y: getResponsivePosition(-300) },
    Cas: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    Grb: { x: getResponsivePosition(-200), y: getResponsivePosition(100) },
    Grt: { x: getResponsivePosition(200), y: getResponsivePosition(-100) },
    Hatsun: { x: getResponsivePosition(-300), y: getResponsivePosition(0) },
    IOB: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    James: { x: getResponsivePosition(-400), y: getResponsivePosition(100) },
    Khadim: { x: getResponsivePosition(400), y: getResponsivePosition(-200) },

    // Section 2 logos
    LG: { x: getResponsivePosition(-230), y: getResponsivePosition(370) },
    Lisha: { x: getResponsivePosition(370), y: getResponsivePosition(110) },
    Maruti: { x: getResponsivePosition(460), y: getResponsivePosition(-100) },
    Metro: { x: getResponsivePosition(220), y: getResponsivePosition(-210) },
    Pepe: { x: getResponsivePosition(-420), y: getResponsivePosition(220) },
    Shriram: { x: getResponsivePosition(-300), y: getResponsivePosition(0) },
    SPR: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    Thangamayil: {
      x: getResponsivePosition(-200),
      y: getResponsivePosition(100),
    },
    VGN: { x: getResponsivePosition(200), y: getResponsivePosition(-100) },
    VST: { x: getResponsivePosition(-300), y: getResponsivePosition(0) },
    Burger: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },
    Hero: { x: getResponsivePosition(-400), y: getResponsivePosition(100) },
    Impex: { x: getResponsivePosition(400), y: getResponsivePosition(-200) },
    Mahindra: { x: getResponsivePosition(-300), y: getResponsivePosition(0) },
    Royal: { x: getResponsivePosition(100), y: getResponsivePosition(-200) },

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
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
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
        name: "Asian",
        image: AsianLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 0,
        section: 1,
      },
      {
        id: 18,
        name: "Ambuja",
        image: AmbujaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 1,
        section: 1,
      },
      {
        id: 19,
        name: "Acc",
        image: AccLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 2,
        section: 1,
      },
      {
        id: 20,
        name: "Act",
        image: ActLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 3,
        section: 1,
      },
      {
        id: 21,
        name: "Agni",
        image: AgniLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 4,
        section: 1,
      },
      {
        id: 22,
        name: "Amrutanjan",
        image: AmrutanjanLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 5,
        section: 1,
      },
      {
        id: 23,
        name: "Bosch",
        image: BoschIcon,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 6,
        section: 1,
      },
      {
        id: 24,
        name: "Cas",
        image: CasLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 7,
        section: 1,
      },
      {
        id: 25,
        name: "Grb",
        image: GrbLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 8,
        section: 1,
      },
      {
        id: 26,
        name: "Grt",
        image: GrtLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 9,
        section: 1,
      },
      {
        id: 27,
        name: "Hatsun",
        image: Hatsun,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 10,
        section: 1,
      },
      {
        id: 28,
        name: "IOB",
        image: IOBLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 11,
        section: 1,
      },
      {
        id: 29,
        name: "James",
        image: JamesLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 12,
        section: 1,
      },
      {
        id: 30,
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
        id: 31,
        name: "LG",
        image: LGLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 0,
        section: 2,
      },
      {
        id: 32,
        name: "Lisha",
        image: LishaLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 1,
        section: 2,
      },
      {
        id: 33,
        name: "Maruti",
        image: MarutiLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 2,
        section: 2,
      },
      {
        id: 34,
        name: "Metro",
        image: MetroLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 3,
        section: 2,
      },
      {
        id: 35,
        name: "Pepe",
        image: PepeLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 4,
        section: 2,
      },
      {
        id: 36,
        name: "Shriram",
        image: ShriramLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 5,
        section: 2,
      },
      {
        id: 37,
        name: "SPR",
        image: SPRLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 6,
        section: 2,
      },
      {
        id: 38,
        name: "Thangamayil",
        image: ThangamayilLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 7,
        section: 2,
      },
      {
        id: 39,
        name: "VGN",
        image: VGNLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 8,
        section: 2,
      },
      {
        id: 40,
        name: "VST",
        image: VSTLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 9,
        section: 2,
      },
      {
        id: 41,
        name: "Burger",
        image: BurgerLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 10,
        section: 2,
      },
      {
        id: 42,
        name: "Hero",
        image: HeroLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 11,
        section: 2,
      },
      {
        id: 43,
        name: "Impex",
        image: ImpexLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 12,
        section: 2,
      },
      {
        id: 44,
        name: "Mahindra",
        image: MahindraLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 13,
        section: 2,
      },
      {
        id: 45,
        name: "Royal",
        image: RoyalLogo,
        size: { width: getResponsiveSize(150), height: getResponsiveSize(40) },
        positionIndex: 14,
        section: 2,
      },
    ];

    return [...section0Logos, ...section1Logos, ...section2Logos];
  };

  const [logoList, setLogoList] = useState<any[]>([]);

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

  // Initialize logos for active section
  useEffect(() => {
    if (!logoList.length) return;

    // Set initial visibility for all logos
    logoList.forEach((logo) => {
      const element = logoRefs.current[logo.id - 1];
      if (element) {
        const position = positions[logo.name];
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

  //scroll animati
  useEffect(() => {
    if (
      !logoList.length ||
      typeof window === "undefined" ||
      !scrollContainerRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const numSections = 3;
      const sectionHeight = window.innerHeight;

      // Clean up any existing ScrollTrigger instances
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Create markers for each section
      const markers = sections.map((_, i) => {
        return ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: `top+=${sectionHeight * i} top`,
          end: `top+=${sectionHeight * (i + 1)} top`,
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
          markers: false, // Set to true for debugging
        });
      });

      // Main scroll trigger
      scrollTriggerRef.current = ScrollTrigger.create({
        id: "clientsScrollTrigger",
        trigger: scrollContainerRef.current,
        start: "top top",
        end: `+=${sectionHeight * (numSections - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        snap: {
          snapTo: sections.map((_, i) => i / (numSections - 1)),
          duration: { min: 0.3, max: 0.8 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const currentProgress = self.progress;
          const currentPosition = self.scroll();

          // Update scroll direction
          if (currentPosition > lastScrollPosition.current) {
            scrollDirection.current = "down";
          } else if (currentPosition < lastScrollPosition.current) {
            scrollDirection.current = "up";
          }
          lastScrollPosition.current = currentPosition;

          // Calculate section based on progress
          let sectionIndex;
          if (currentProgress < 0.33) {
            sectionIndex = 0;
          } else if (currentProgress < 0.66) {
            sectionIndex = 1;
          } else {
            sectionIndex = 2;
          }

          // Only update state if section has actually changed
          if (sectionIndex !== activeSection) {
            setActiveSection(sectionIndex);
          }
        },
      });

      // Cleanup markers on unmount
      return () => {
        markers.forEach(marker => marker.kill());
      };

    }, scrollContainerRef);

    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [logoList, windowSize]);

  // Update logos when active section changes
  useEffect(() => {
    if (!logoList.length) return;

    const ctx = gsap.context(() => {
      logoList.forEach((logo) => {
        const element = logoRefs.current[logo.id - 1];
        const position = positions[logo.name];

        if (!element) return;

        if (logo.section === activeSection) {
          gsap.to(element, {
            duration: 0.8,
            x: position.x,
            y: position.y,
            scale: 1,
            opacity: 1,
            visibility: "visible",
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          gsap.to(element, {
            duration: 0.8,
            x: position.x,
            y: position.y,
            scale: 0,
            opacity: 0,
            visibility: "hidden",
            ease: "power2.in",
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

  // Calculate circle sizes
  const getCircleSize = (baseSize: number) => {
    return Math.round(baseSize * circleRatio);
  };

  // Don't render anything until we have window dimensions
  if (windowSize.width === 0) {
    return null;
  }

  return (
    <div className="relative " ref={scrollContainerRef} id="landingClients">
      <div
        className=" top-0 left-0 w-full h-screen flex items-center justify-center"
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
                priority={logo.section === 0 || logo.section === 1} // Prioritize first and second section logos
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingClients;
