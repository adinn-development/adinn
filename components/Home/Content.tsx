"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Animation variants for text
const textVariants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: { 
    opacity: 1, 
    transform: "translateY(0px)", 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

// Staggered container for text animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: "beforeChildren"
    } 
  },
};

// Main container animation
const mainContainerVariants = {
  hidden: { opacity: 0, transform: "translateY(50px)" },
  visible: { 
    opacity: 1, 
    transform: "translateY(0px)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Button animation
const buttonVariants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: { 
    opacity: 1, 
    transform: "translateY(0px)",
    transition: { delay: 0.4, duration: 0.3 }
  }
};

const LandingContent = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center xl:min-h-screen lg:min-h-screen min-h-screen text-black text-center px-6 md:mt-0 mt-20 md:mb-0 mb-[-50px] "
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={mainContainerVariants}
    >
      {/* Text Content */}
    <h4 className="adinn-heading text-black font-bold text-[34px] md:text-[34px] mb-4">
  Welcome to Adinn Advertising, where your vision becomes our mission.
</h4>
{/* <motion.p
  className="w-full text-[16px] md:text-[24px] sm:text-[24px] md:leading-[60.4px] sm:mb-10 md:mb-10 mb-1"
  variants={containerVariants}
>
  <motion.span variants={textVariants}>With 24+ years of experience,</motion.span>{" "}
  <motion.span variants={textVariants}>
    we help brands grow with creative
  </motion.span>{" "}
  <motion.span className="text-[#C1C1C1]" variants={textVariants}>
    and meaningful advertising.
  </motion.span>{" "}
  <motion.span className="text-[#C1C1C1]" variants={textVariants}>
    <br /> We don’t just make ads,
  </motion.span>{" "}
  <motion.span variants={textVariants}>
    we create experiences that lift your brand
  </motion.span>{" "}
  <motion.span variants={textVariants}>
    and connect with your audience.
  </motion.span>{" "}
  <motion.span className="text-[#C1C1C1]" variants={textVariants}>
    <br /> We understand your vision
  </motion.span>{" "}
  <motion.span variants={textVariants}>
    and turn it into something real.
  </motion.span>
</motion.p> */}
<motion.p
  className="w-full text-[16px] md:text-[28px] sm:text-[28px] md:leading-[50.4px] sm:mb-10 md:mb-10 mb-1"
  variants={containerVariants}
>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    With 24+ years of experience,
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}we help brands grow with creative and meaningful advertising.{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    We don’t just make ads,
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}we create experiences that lift your brand and connect with your audience.{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    We understand your vision
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}and turn it into something real.{' '}
  </motion.span>

</motion.p>


      {/* Animated Button */}
      <Link href="/about-us">  
      <motion.button
        className="mt-6 bg-[#FFFFFF] text-[15px] md:text-[19px] text-black px-6 py-3 rounded-full 
        shadow-[0px_0px_10px_#F1606026] transition-all duration-300 hover:bg-gray-50 cursor-pointer"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Discover about us
      </motion.button>
      </Link>
    </motion.div>
  );
});

LandingContent.displayName = "LandingContent";

export default LandingContent;
