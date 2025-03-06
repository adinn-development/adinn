"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { VideoBannerFrame } from '../ReUsableComponents/Icons/Icons'
import { motion, useInView } from 'framer-motion';

const VideoBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className='flex flex-col items-center justify-center min-h-screen text-black text-center px-6'
    >
      <motion.div
        variants={textVariants}
        className='text-[44px] md:text-[90px] md:whitespace-normal whitespace-nowrap font-normal text-start mb-16'
      >
        Team Expertise
      </motion.div>

      <motion.div variants={imageVariants}>
        <Image src={VideoBannerFrame} alt='video' />
      </motion.div>
    </motion.div>
  );
}

export default VideoBanner;
