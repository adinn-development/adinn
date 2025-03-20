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
    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-hero-container",
        start: "top top",
        end: "+=300%", // 3x viewport height for smooth scrolling distance
        scrub: 1, // Lower value for immediate response with no lag
        pin: true,
        anticipatePin: 1, // Smoother pinning
        snap: {
          snapTo: "labels", // Snap to the labels we define
          duration: { min: 0.2, max: 0.5 }, // Quicker snapping
          directional: false, // Snap in both directions
        }
      },
      smoothChildTiming: true,
    });
    
    // Add labels for snap points
    tl.addLabel("start")
      .to(".text", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out", // Responsive easing
      })
      .addLabel("scale1")
      .to(".text", {
        scale: 2,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .addLabel("scale2")
      .to(".text", {
        scale: 3,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .addLabel("scale3")
      .to(".text", {
        scale: 5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      })
      .addLabel("fadeout")
      .fromTo(".bottom-image",
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2.out",
        }
      )
      .addLabel("end");
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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

          <div className="absolute inset-0 -z-10 w-full h-full">
  <Image
    src={Subtract}
    alt=" Shape"
    layout="fill"
    objectFit="cover"
    priority
    className="sm:object-contain object-cover text"
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
