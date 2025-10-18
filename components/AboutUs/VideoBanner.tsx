"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VideoBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="flex items-center justify-center mt-20 lg:min-h-screen xl:min-h-screen text-white"
    >
      {/* Wrapper with relative positioning */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Text overlay */}
        <motion.div
          variants={textVariants}
          className="absolute top-8 xl:top-16 lg:top-15 md:top-5 left-1/2 -translate-x-1/2 text-[16px] md:text-[44px] font-medium text-center z-10"
        >
          Team Expertise
        </motion.div>

        {/* Video */}
        <motion.div variants={videoVariants} className="w-full">
          <video
            className="w-full h-full rounded-lg"
            autoPlay
            loop
            muted
          >
            <source src="https://ik.imagekit.io/4o0qshqnhn/Adinn/teamex.MP4?updatedAt=1758805740474" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoBanner;
