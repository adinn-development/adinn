"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Innovation } from "@/components/ReUsableComponents/Icons/Icons";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable"; // Import Draggable

// Register plugin (only on client side)
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const LandingDreamProject = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blurImageRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const blurImage = blurImageRef.current;
    const icon = iconRef.current;

    if (!container || !blurImage || !icon) return;

    // Random roaming animation for blur image
    const animateToRandomPosition = () => {
      const containerRect = container.getBoundingClientRect();
      const imageRect = blurImage.getBoundingClientRect();
      
      const maxX = containerRect.width - imageRect.width;
      const maxY = containerRect.height - imageRect.height;
      
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      
      gsap.to(blurImage, {
        x: randomX,
        y: randomY,
        duration: 8,
        ease: "power1.inOut",
        onComplete: animateToRandomPosition, // Keep moving
      });
    };

    // Set initial position for blur image
    gsap.set(blurImage, { position: "absolute" });
    animateToRandomPosition();

    // Make IconX draggable with flick effect
    // Draggable.create(icon, {
    //   type: "x,y",            // Allow dragging on both axes
    //   inertia: true,          // Add momentum
    //   bounds: container,      // Stay within container
    //   edgeResistance: 1,   // Resistance at edges
    //   throwProps: true,       // Enable throwing/flicking
    //   onDragStart: function() {
    //     gsap.to(this.target, { 
    //       duration: 0.3, 
    //       scale: 1.05, 
    //       opacity: 0.8,
    //       rotate: "-10deg" 
    //     });
    //   },
    //   onDragEnd: function() {
    //     gsap.to(this.target, { 
    //       duration: 0.5, 
    //       scale: 1, 
    //       opacity: 1,
    //       rotate: "-15deg"
    //     });
    //   }
    // });


    gsap.to(".icon-x", { 
      duration: 8,
      rotation: 360,
      repeat: -1,
      ease: "none" 
    });

    return () => {
      // Clean up animations
      gsap.killTweensOf(blurImage);
      
      // Clean up draggable
      if (Draggable.get(icon)) {
        Draggable.get(icon).kill();
      }
    };
  }, []);

  return (
<div className="flex w-full">

      <div className="flex flex-col w-full max-w-full justify-center p-5 md:h-auto sm:h-auto h-[350px]">
        <div
          ref={containerRef}
          className="rounded-[25px] w-full h-[462px]  relative overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #EC2B45 0%, #BE3234 60%, #790619 100%)",
          }}
        >
          {/* Flickable IconX */}
          <div 
            ref={iconRef}
            className="absolute left-[2.5%] top-[30%] sm:top-[30%] md:top-[30%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] "
          >
            <Image
              src={Innovation}
              alt="icon-x"
              className="icon-x w-[216.99px] h-[232.07px] md:w-[419px] md:h-[473px] sm:w-[419px] sm:h-[473px] lg:w-[419px] lg:h-[473px] xl:w-[419px] xl:h-[473px]"
              priority
            />
          </div>

          {/* Randomly moving blur image */}
          <div ref={blurImageRef} className="absolute">
            <Image
              src={Innovation}
              alt="blur-small-image"
              className="w-[116.99px] h-[132.07px] sm:w-[91px] sm:h-[103px] md:w-[116.99px] md:h-[132.07px] lg:w-[116.99px] lg:h-[132.07px] xl:w-[116.99px] xl:h-[132.07px] blur-[2px]"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="absolute top-[25%] left-25  md:top-[30%] md:left-50  sm:top-[30%] sm:left-50">
            <h2 className="text-[24px] md:text-[40px] lg:text-[80px] text-white leading-none">
              Want to make Your
            </h2>
            <h2 className="text-[24px] md:text-[40px] lg:text-[80px] instrument-font text-white font-serif italic leading-none">
              brand unmissable?
            </h2>
          </div>

          {/* Call to Action */}
          <div className="absolute bottom-8 right-8 text-white">
            <p className="text-[12px] md:text-[17px] sm:text-[17px] opacity-80 text-right">
            Get in touch with Adinn Advertising
Services today!
              <br />
              Email: info@adinn.com
            </p>
            <div className="flex justify-end mt-4">
              <button className="bg-white px-10 py-3 text-[12px] md:text-[16px] text-black rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
</div>
  );
};

export default LandingDreamProject;