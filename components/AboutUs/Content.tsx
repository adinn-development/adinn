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
      className="flex flex-col items-center justify-center  text-black text-center px-6 h-screen"
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
        className='text-[20px] text-[#616065]  mb-10'
      >
        Who we are
      </motion.div>

      <motion.p
        className="w-full text-[50px] leading-[60.4px] mb-10"
        variants={containerVariants}
      >

        <motion.span variants={textVariants} className='text-[#C1C1C1]'>A </motion.span>
        <motion.span variants={textVariants}>
          23-year-old agency
        </motion.span>
        <motion.span variants={textVariants}>
          <span className="text-[#C1C1C1]"> headquatered in</span>
        </motion.span>
        <motion.span variants={textVariants}>
          <br /> Madurai and branch {' '}
        </motion.span>
        <motion.span className="text-[#C1C1C1]" variants={textVariants}>
          office in Chennai, catering to
        </motion.span>
        <motion.span variants={textVariants}>
          <br /> entire South India
        </motion.span>

      </motion.p>


    </motion.div>
  )
}

export default Content;
