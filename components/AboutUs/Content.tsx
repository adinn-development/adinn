"use client";
import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";

const Content = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (


    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center  text-black text-center px-6 xl:mt-50 lg:mt-50 md:mt-20 sm:mt-50 mt-20 md:mb-10 "
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className='md:text-[20px] sm:text-[20px] text-[16px] text-[#616065] md:mb-10 sm:mb-10 mb-3'
      >
        Who we are 
      </motion.div> 

      <motion.p
  className="w-full text-[16px] md:text-[28px] sm:text-[28px] md:leading-[50.4px] sm:mb-10 md:mb-10 mb-1"
  variants={containerVariants}
>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    Adinn Advertising is a leading advertising agency in South India.
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}We are a comprehensive solution provider for your brand.{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    Our strength comes from our dedication to quality
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}and focus on real results.{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    We serve clients across Tamil Nadu and beyond
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}with complete advertising services.{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    From Traditional media to Digital platforms,
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}we work to turn ideas into clear and effective campaigns{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    that help your brand grow.
  </motion.span>

  <motion.span variants={textVariants}>
    {' '}Our network allows us to reach a wide audience{' '}
  </motion.span>

  <motion.span variants={textVariants} className="text-[#C1C1C1]">
    and offer support whenever it is needed.
  </motion.span>

</motion.p>



      </motion.div>
  )
}

export default Content;
