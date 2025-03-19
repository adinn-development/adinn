"use client";

import React, { useEffect, useRef } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import Image from "next/image";
import { BackgroundImage } from "../ReUsableComponents/Icons/Icons";
import Subtract from "@/public/Subtract.svg";
import HomeFrame from "@/public/HomeFrame.svg"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const LandingHero2 = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-hero-container",
        start: "top top",
        scrub: 1,
        pin: true,
      },
      smoothChildTiming: true, 
    });
    tl.to({}, { duration: 0 })
      .to(".text", {
        scale: 1,
        opacity: 1,
        duration: 10,
        ease: "power4.inOut",
      })
      .to(".text", {
        scale: 3,
        opacity: 1,
        duration: 10,
        ease: "power4.inOut",
      }, "-=3") 
      .to(".text", {
        scale: 5,
        opacity: 0,
        duration: 10,
        ease: "power4.inOut",
      }, "-=3") 
      .fromTo(".bottom-image",
        { opacity: 0, y: 150 }, 
        {
          opacity: 1,
          y: 0,
          duration: 20,
          ease: "power4.out", 
        },
        "-=5"
      );

  }, []);

  return (
    <>
      <div
        className="landing-hero-container relative w-full h-screen mb-40 md:mb-0 overflow-hidden"
        ref={heroSectionRef}
      >
        <div>
          <div className="absolute top-0 left-0 w-full z-50">
            <TopNav />
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={BackgroundImage}
              alt="Background Image"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </div>

       
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-full  ">
              <Image
                src={Subtract}
                alt="Subtract Shape"
                fill
                style={{ objectFit: "cover" }}
                className="text"
                priority
              />
            </div>
          </div>


          {/* Bottom Image */}
          <div className="absolute bottom-0 w-full h-[50vh]">
            <Image
              src={HomeFrame}
              alt="New Sliding Image"
              fill
              priority
              quality={100}
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
              className="bottom-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHero2;
