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
        className="w-full text-[16px] md:text-[48px] sm:text-[48px] md:leading-[60.4px] sm:mb-10 md:mb-10 mb-1"
        variants={containerVariants}
      >

        <motion.span variants={textVariants} className='text-[#C1C1C1]'>We specialize in leading full-service</motion.span>
        <motion.span variants={textVariants}>
        {' '}  advertising agency{' '}
        </motion.span>
        {/* <motion.span variants={textVariants}>
          <span className="text-[#C1C1C1]">with
          over</span>
        </motion.span> */}
        <motion.span variants={textVariants}>
          {/* <br className="hidden sm:block md:block" /> */}
          {' '}activation, outreach programs, outdoor advertising, digital
          marketing, and retail branding,{' '}
        </motion.span>
        <motion.span className="text-[#C1C1C1]" variants={textVariants}>
        delivering{' '}
        </motion.span>
        <motion.span variants={textVariants}>
          {/* <br className="hidden sm:block md:block" /> */}
          {' '}  ROI-driven solutions {' '}
        </motion.span>
        <motion.span variants={textVariants}>
          <span className="text-[#C1C1C1]">with an</span>
        </motion.span>
        <motion.span variants={textVariants}>
          {/* <br className="hidden sm:block md:block" /> */}
          {' '} integrated
          infrastructure {' '}
        </motion.span>
        <motion.span variants={textVariants}>
          <span className="text-[#C1C1C1]">that ensures seamless execution. </span>
        </motion.span>

        {/* <motion.span variants={textVariants}>clients across South India.</motion.span> */}

      </motion.p>


      </motion.div>
  )
}

export default Content;
