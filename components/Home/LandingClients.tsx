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
  TataIplLogo 
} from "@/components/ReUsableComponents/Icons/Icons";

const LandingClients = () => {
  const [logoStyles, setLogoStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const logoList = [
    { id: 1, name: "Amul", image: AmulLogo, size: { width: 150, height: 40 }, position: { x: "-200px", y: "400px" } },
    { id: 2, name: "Havells", image: HavLogo, size: { width: 150, height: 145 }, position: { x: "350px", y: "100px" } },
    { id: 3, name: "KFC", image: KFCLogo, size: { width: 150, height: 85 }, position: { x: "500px", y: "-70px" } },
    { id: 4, name: "TVS", image: tvsLogo, size: { width: 220, height: 82 }, position: { x: "245px", y: "-200px" } },
    { id: 5, name: "DBS", image: DBSLogo, size: { width: 120, height: 34 }, position: { x: "-400px", y: "-260px" } },
    { id: 6, name: "Zomato", image: ZomatoLogo, size: { width: 150, height: 35 }, position: { x: "4px", y: "195px" } },
    { id: 7, name: "Daikin", image: DaikinLogo, size: { width: 150, height: 40 }, position: { x: "-525px", y: "45px" } },
    { id: 8, name: "Dalmia", image: DalmiaLogo, size: { width: 150, height: 40 }, position: { x: "250px", y: "440px" } },
    { id: 9, name: "Honda", image: HondaLogo, size: { width: 150, height: 40 }, position: { x: "-270px", y: "-70px" } },
    { id: 10, name: "JSW", image: JSWLogo, size: { width: 150, height: 40 }, position: { x: "370px", y: "-350px" } },
    { id: 11, name: "Kalyan", image: KalyanLogo, size: { width: 150, height: 40 }, position: { x: "-325px", y: "150px" } },
    { id: 12, name: "LLyod", image: LLyodLogo, size: { width: 150, height: 40 }, position: { x: "-400px", y: "-480px" } },
    { id: 13, name: "Malabar", image: MalabarLogo2, size: { width: 150, height: 40 }, position: { x: "500px", y: "280px" } },
    { id: 14, name: "Muthhoot", image: MuthhootLogo, size: { width: 150, height: 40 }, position: { x: "600px", y: "-200px" } },
    { id: 15, name: "Nippon", image: NipponLogo, size: { width: 150, height: 40 }, position: { x: "-100px", y: "-300px" } },
    { id: 16, name: "TataIpl", image: TataIplLogo, size: { width: 150, height: 40 }, position: { x: "0px", y: "-440px" } },
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
    <div className="p-5 flex items-center justify-center bg-white relative h-screen">
      <div className="absolute w-[457px] h-[438px] rounded-full border border-dashed border-gray-400 opacity-60"></div>
      <div className="absolute w-[670px] h-[640px] rounded-full border border-dashed border-gray-400 opacity-60"></div>
      <div className="absolute w-[971px] h-[926px] rounded-full border border-dashed border-gray-400 opacity-60 flex items-center justify-center">
        <p className="text-4xl text-[#000000]">Our Clients</p>
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
        </div>
      ))}
    </div>
  );
};

export default LandingClients;