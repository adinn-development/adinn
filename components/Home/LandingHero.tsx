"use client";

import React, { useEffect, useRef, useState } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import Image from "next/image";
import { BackgroundImage } from "../ReUsableComponents/Icons/Icons";
import Subtract from "@/public/Subtract.svg";
import HomeFrame from "@/public/HomeFrame.svg"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        duration: 1,
        ease: "power2.out", 
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
          <div className={`absolute bottom-0 w-full ${isMobile ? 'h-[60vh] z-20' : 'h-[100vh]'}`}>
            {isMobile && (
              <div className="w-full h-full flex items-end justify-center">
                <video
                  ref={videoRef}
                  src="/adinn2222.webm[01].webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    width: "100%",
                    height: "auto",
                    maxHeight: "60vh",
                    display: "block",
                    visibility: "visible"
                  }}
                  className="w-full opacity-100"
                />
              </div>
            )}
            
            {!isMobile && (
              <video
                ref={videoRef}
                src="/adinn2222.webm[01].webm"
                muted
                loop
                playsInline
                style={{
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  maxWidth: "100%",
                  width: "100%",
                  height: "auto",
                  maxHeight: "100vh",
                  margin: "0 auto",
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "block",
                  visibility: "visible"
                }}
                className="bottom-image w-full"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHero;
