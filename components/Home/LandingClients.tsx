"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AmulLogo, HavLogo, KFCLogo, tvsLogo, DBSLogo, ZomatoLogo, HavName } from "@/components/ReUsableComponents/Icons/Icons";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const [windowWidth, setWindowWidth] = useState(0);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const logoList = [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 150, height: 40 }, position: { x: "-160px", y: "60px" } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 45, height: 45 }, position: { x: "195px", y: "40px" } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 120, height: 85 }, position: { x: "280px", y: "-70px" } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 180, height: 82 }, position: { x: "105px", y: "-120px" } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 120, height: 34 }, position: { x: "-210px", y: "-180px" } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 130, height: 35 }, position: { x: "4px", y: "190px" } },
    { id: 7, name: "AmulSmall", image: AmulLogo, size: { width: 60, height: 39 }, position: { x: "-290px", y: "-25px" } },
    { id: 8, name: "KFCBlurred", image: KFCLogo, size: { width: 60, height: 85 }, position: { x: "290px", y: "130px" } },
    { id: 9, name: "DBSBlurred", image: DBSLogo, size: { width: 60, height: 34 }, position: { x: "-140px", y: "-110px" } },
  ];

  // Mobile logo positions
  const mobileLogoList = [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 100, height: 27 }, position: { x: "-90px", y: "45px" } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 30, height: 30 }, position: { x: "115px", y: "30px" } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 85, height: 60 }, position: { x: "160px", y: "-45px" } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 130, height: 59 }, position: { x: "65px", y: "-75px" } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 85, height: 24 }, position: { x: "-130px", y: "-110px" } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 90, height: 24 }, position: { x: "2px", y: "154px" } },
    { id: 7, name: "AmulSmall", image: AmulLogo, size: { width: 42, height: 27 }, position: { x: "-180px", y: "-15px" } },
    { id: 8, name: "KFCBlurred", image: KFCLogo, size: { width: 42, height: 60 }, position: { x: "170px", y: "85px" } },
    { id: 9, name: "DBSBlurred", image: DBSLogo, size: { width: 42, height: 24 }, position: { x: "-85px", y: "-65px" } },
  ];

  // Store logo lists in refs to maintain stable references
  const logoListRef = useRef(logoList);
  const mobileLogoListRef = useRef(mobileLogoList);
  
  // Get current logo list based on isMobile state
  const getCurrentLogoList = useCallback(() => {
    return isMobile ? mobileLogoListRef.current : logoListRef.current;
  }, [isMobile]);

  // Initialize window width after mount
  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll effect with stable dependencies
  useEffect(() => {
    const handleScroll = () => {
      const currentList = getCurrentLogoList();
      const newStyles: { [key: string]: React.CSSProperties } = {};
      
      logoRefs.current.forEach((ref, index) => {
        if (ref && index < currentList.length) {
          const logo = currentList[index];
          const rect = ref.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          const scale = Math.max(0.5, 1 - distanceFromCenter / viewportHeight);
          const blur = 5 * (1 - scale);
          const opacity = scale;

          newStyles[logo.id] = {
            transform: `translate(${logo.position.x}, ${logo.position.y}) scale(${scale})`,
            filter: `blur(${blur}px)`,
            opacity: opacity,
          };
        }
      });
      
      setLogoStyles(newStyles);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [getCurrentLogoList]); // Only depend on the stable callback

  // Get the current logo list for rendering
  const currentLogoList = getCurrentLogoList();

  return (
    <div className="p-5 flex items-center justify-center h-screen bg-white relative overflow-hidden">
      {/* Smallest Circle */}
      <div className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border border-dashed border-gray-400 opacity-60"></div>

      {/* Medium Circle */}
      <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-gray-400 opacity-60"></div>

      {/* Largest Circle with Text */}
      <div className="absolute w-[480px] h-[480px] md:w-[600px] md:h-[600px] rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center">
        <p className="text-xl md:text-2xl font-medium text-black">Our Clients</p>
      </div>

      {/* Logos with Sizes and Positions */}
      {currentLogoList.map((logo, index) => (
        <div
          key={logo.id}
          ref={(el) => {
            logoRefs.current[index] = el;
          }}
          data-logo-id={logo.id}
          className="absolute flex flex-col items-center transition-all duration-500"
          style={{
            transform: logoStyles[logo.id]?.transform || `translate(${logo.position.x}, ${logo.position.y})`,
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
          />
          {logo.name === "Havells" && (
            <div className="flex items-center py-2">
              <Image 
                src={HavName} 
                alt={logo.name} 
                width={windowWidth < 768 ? 63 : 90} 
                height={windowWidth < 768 ? 35 : 50} 
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LandingClients;