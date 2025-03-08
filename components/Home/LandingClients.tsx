"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AmulLogo, HavLogo, KFCLogo, tvsLogo, DBSLogo, ZomatoLogo, HavName } from "@/components/ReUsableComponents/Icons/Icons";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const logoList = [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 227, height: 40 }, position: { x: "-325px", y: "150px" } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 45, height: 45 }, position: { x: "350px", y: "100px" } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 193, height: 85 }, position: { x: "500px", y: "-70px" } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 207, height: 82 }, position: { x: "245px", y: "-180px" } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 120, height: 34 }, position: { x: "-390px", y: "-250px" } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 222, height: 35 }, position: { x: "4px", y: "325px" } },
    { id: 7, name: "AmulSmall", image: AmulLogo, size: { width: 60, height: 39 }, position: { x: "-505px", y: "-25px" } },
    { id: 8, name: "KFCBlurred", image: KFCLogo, size: { width: 60, height: 85 }, position: { x: "500px", y: "300px" } },
    { id: 9, name: "DBSBlurred", image: DBSLogo, size: { width: 60, height: 34 }, position: { x: "-340px", y: "-110px" } },
  ];

  useEffect(() => {
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
            transform: `translate(${logo.position.x}, ${logo.position.y}) scale(${scale})`,
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
  }, []);

  return (
    <div className="p-5 flex items-center justify-center  bg-white relative h-screen">
      {/* Circles */}
      <div className="absolute w-[457px] h-[438px] rounded-full border border-dashed border-gray-400 opacity-60"></div>
      <div className="absolute w-[670px] h-[640px] rounded-full border border-dashed border-gray-400 opacity-60"></div>
      <div className="absolute w-[971px] h-[926px] rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center">
        <p className="text-4xl  text-[#000000]">Our Clients</p>
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
                width={90} 
                height={50} 
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LandingClients;