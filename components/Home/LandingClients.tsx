"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AmulLogo, HavLogo, KFCLogo, tvsLogo, DBSLogo, ZomatoLogo, HavName } from "@/components/ReUsableComponents/Icons/Icons";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const logoList = [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 170, height: 45 }, position: { x: "-260px", y: "100px" } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 50, height: 50 }, position: { x: "305px", y: "70px" } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 140, height: 100 }, position: { x: "460px", y: "-120px" } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 220, height: 100 }, position: { x: "175px", y: "-190px" } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 140, height: 40 }, position: { x: "-350px", y: "-300px" } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 150, height: 40 }, position: { x: "10px", y: "275px" } },
    { id: 7, name: "AmulSmall", image: AmulLogo, size: { width: 70, height: 45 }, position: { x: "-500px", y: "-40px" } },
    { id: 8, name: "KFCBlurred", image: KFCLogo, size: { width: 70, height: 100 }, position: { x: "470px", y: "220px" } },
    { id: 9, name: "DBSBlurred", image: DBSLogo, size: { width: 70, height: 40 }, position: { x: "-230px", y: "-180px" } },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const newStyles: { [key: string]: React.CSSProperties } = {};
      logoRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY;

          // Calculate visibility and scale based on scroll position
          const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          const scale = Math.max(0.5, 1 - distanceFromCenter / viewportHeight);
          const blur = 5 * (1 - scale);
          const opacity = scale;

          newStyles[logoList[index].id] = {
            transform: `translate(${logoList[index].position.x}, ${logoList[index].position.y}) scale(${scale})`,
            filter: `blur(${blur}px)`,
            opacity: opacity,
          };
        }
      });
      setLogoStyles(newStyles);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set styles

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-5 flex items-center justify-center h-screen bg-white relative overflow-hidden">
      {/* Smallest Circle */}
      <div className="absolute w-[357px] h-[338px] rounded-full border border-dashed border-gray-400 opacity-60"></div>

      {/* Medium Circle */}
      <div className="absolute w-[570px] h-[542px] rounded-full border border-dashed border-gray-400 opacity-60"></div>

      {/* Largest Circle with Text */}
      <div className="absolute w-[951px] h-[926px] rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center">
        <p className="text-3xl font-medium text-black">Our Clients</p>
      </div>

      {/* Logos with Sizes and Positions */}
      {logoList.map((logo, index) => (
        <div
          key={logo.id}
          ref={(el) => {
            logoRefs.current[index] = el; // Just assign, don't return
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
          {/* Show Name Only for Havells */}
          {logo.name === "Havells" && (
            <div className="flex items-center py-2">
              <Image src={HavName} alt={logo.name} width={90} height={50} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LandingClients;