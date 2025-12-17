"use client";

import Image from "next/image";
import React, { useRef } from "react";

export default function VideoImage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
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
  );
}
