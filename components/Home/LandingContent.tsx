"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants for text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Staggered container for text animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.3,
      when: "beforeChildren"
    } 
  },
};

const LandingContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center min-h-screen text-black text-center px-6"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        }
      }}
    >
      {/* Text Content */}
      <motion.p
        className="w-full text-[50px] leading-[60.4px] mb-10"
        variants={containerVariants}
      >
        {/* Animated Words */}
        <motion.span variants={textVariants}>Adinn</motion.span>{" "}
        <motion.span className="text-[#C1C1C1]" variants={textVariants}>
          is a hub of
        </motion.span>{" "}
        <motion.span variants={textVariants}>
          creativity and innovation.
          <span className="text-[#C1C1C1]"> We're</span>
        </motion.span>{" "}
        <motion.span className="text-[#C1C1C1]" variants={textVariants}>
          <br /> dedicated to
        </motion.span>{" "}
        <motion.span variants={textVariants}>
          bringing your brand to life through unique,
        </motion.span>{" "}
        <motion.span variants={textVariants}>
          <br /> impactful design solutions.
        </motion.span>{" "}
        <motion.span className="text-[#C1C1C1]" variants={textVariants}>
          Dive into our world and
        </motion.span>
      </motion.p>

      {/* Animated Button */}
      <motion.button
        className="mt-6 bg-[#FFFFFF] text-[19px] text-black px-6 py-3 rounded-full 
        shadow-[0px_0px_10px_#F1606026] transition-all duration-300 hover:bg-gray-50"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.8, duration: 0.6 }
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Discover about us
      </motion.button>
    </motion.div>
  );
};

export default LandingContent;
