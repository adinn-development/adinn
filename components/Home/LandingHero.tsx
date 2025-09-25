"use client";

import React, { useEffect, useRef, useState } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import Image from "next/image";
import { BackgroundImage } from "../ReUsableComponents/Icons/Icons";
import Subtract from "@/public/Subtract.svg";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoImage from "../ReUsableComponents/VideoImage";
gsap.registerPlugin(ScrollTrigger);

const LandingHero = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIsMobile();

    // Add resize listener
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Set video visible immediately on mobile
  useEffect(() => {
    if (isMobile) {
      setVideoVisible(true);

      // Force play video on mobile after a short delay
      setTimeout(() => {
        if (videoRef.current) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Video play error:", error);
            });
          }
        }
      }, 1000);
    }
  }, [isMobile]);

  useEffect(() => {
    // Skip animation setup on mobile
    if (isMobile) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-hero-container",
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.5 },
          directional: false,
        },
        onUpdate: (self) => {
          // Check if we've reached the end of the animation
          if (self.progress > 0.8) {
            setVideoVisible(true);
          } else {
            setVideoVisible(false);
          }
        }
      },
      smoothChildTiming: true,
    });

    // Add labels for snap points
    tl.addLabel("start")
      .to(".text", {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      
      .addLabel("scale3")
      .to(".text", {
        scale: 8,
        opacity: 1,
       
        duration: 2.5,
        ease: "power2.out",
      })
      .addLabel("scale3")
      .to(".text", {
        scale: 10,
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
          onComplete: () => {
            setVideoVisible(true);
          }
        }
      )
      .addLabel("end");
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  // Effect to control video playback
  useEffect(() => {
    if (videoRef.current) {
      if (videoVisible) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video play error:", error);
          });
        }
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [videoVisible]);

  return (
    <>
      <div
        className={`landing-hero-container relative w-full md:h-screen h-[60vh] ${isMobile ? '' : 'mb-40 md:mb-0'} overflow-hidden`}
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
              fill
              priority
              className="hidden sm:block md:block text object-cover"
            />
          </div>


          {/* Bottom Image */}
          <div className={`bottom-image absolute bottom-0 w-full ${isMobile ? 'h-[39vh] z-20' : 'h-[100vh]'}`}>
            {isMobile && (
                <div className="relative w-[100%] max-w-[1050px] mx-auto">
                   {/* Background Image */}
                   <Image
                     unoptimized
                     src="/frame.png"
                     alt="Video Frame"
                     width={1500}
                     height={1500}
                     className="w-[100%] h-full object-cover pointer-events-none select-none"
                   />
             
                   {/* Video positioned in bottom half */}
                   <div className="absolute top-27 left-1/2 w-[74%] h-30 transform -translate-x-1/2 overflow-hidden">
                     <video
                       ref={videoRef}
                       src="/ad_c2.mp4"
                       muted
                       loop
                       autoPlay
                       playsInline
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </div>
            )}

            {!isMobile && (
                <div className="relative w-[80%] max-w-[1050px] mx-auto">
                   {/* Background Image */}
                   <Image
                     unoptimized
                     src="/frame.png"
                     alt="Video Frame"
                     width={1500}
                     height={1500}
                     className="w-[100%] h-full object-cover pointer-events-none select-none"
                   />
             
                   {/* Video positioned in bottom half */}
                   <div className="absolute top-68 left-1/2 w-[74%] h-77 transform -translate-x-1/2 overflow-hidden">
                     <video
                       ref={videoRef}
                       src="/ad_c2.mp4"
                       muted
                       loop
                       autoPlay
                       playsInline
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </div>
            )}
            {/* <VideoImage /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHero;
