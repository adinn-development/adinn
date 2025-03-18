"use client";

import React, { useEffect, useRef } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import Image from "next/image";
import { BackgroundImage } from "../ReUsableComponents/Icons/Icons";
import Subtract from "@/public/Subtract.svg";
import HomeFrame from "@/public/HomeFrame.svg"; // Ensure this path is correct
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
        scrub: 1, // Increased for smoother movement
        pin: true,
      },
      smoothChildTiming: true, // Ensures all animations blend seamlessly
    });
  
    // Extended dead zone (gentle start)
    tl.to({}, { duration: 0 }) // Soft entry before text animation starts
  
      // Smooth, seamless text animations with subtle overlaps
      .to(".text", {
        scale: 1,
        opacity: 1,
        duration: 10, // Increased for smoother motion
        ease: "power4.inOut", // Upgraded easing for extra fluidity
      })
      .to(".text", {
        scale: 3,
        opacity: 1,
        duration: 10,
        ease: "power4.inOut",
      }, "-=3") // Overlap by 3s to avoid a rigid transition
      .to(".text", {
        scale: 5,
        opacity: 0,
        duration: 10,
        ease: "power4.inOut",
      }, "-=3") // Another overlap for smooth fading
  
      // Ultra-smooth bottom image reveal
      .fromTo(".bottom-image",
        { opacity: 0, y: 150 }, // Start lower for a floating feel
        {
          opacity: 1,
          y: 0,
          duration: 20, // Extended for an elegant entrance
          ease: "power4.out", // Power4 for a graceful finish
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
          {/* Top Navigation */}
          <div className="absolute top-0 left-0 w-full z-50">
            <TopNav />
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={BackgroundImage}
              alt="Background Image"
              fill
              objectFit="cover"
              quality={100}
              priority
            />
          </div>

          {/* Subtract Image */}
          {/* <div>
            <Image
              src={Subtract}
              alt="Subtract Shape"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="text "
              priority
            />
          </div> */}
         <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
  <Image
    src={Subtract}
    alt="Subtract Shape"
    fill
    style={{
      objectFit: 'cover',  // Ensure the image covers the full height and width of the container
      width: '100%',
      height: '100%',
    }}
    quality={100}
    className="text"
    priority
  />
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
