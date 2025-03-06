'use client';

import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingQueries = () => {
    const Queries = [
      {
        question: "How long does it take to complete a project?",
        answer:
         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
      {
        question:
        "What is your design process like?",
        answer:
         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
      {
        question:
          "Can I request revisions to the design?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
      {
        question: "Do you provide support after project completion?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
      {
        question: "Can I see examples of your previous work?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
    ];
  
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    const togglequeries = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="py-20 flex flex-col items-center">
        <div className="text-[40px] leading-[105px] md:text-[90px] md:whitespace-normal whitespace-nowrap font-normal text-center mb-16">
          Clearing Up Common  <br className=''/> <span className="text-[#CF1E00] font-serif italic">Queries</span>
        </div>
        <div className="text-[17px] text-center text-[#8693B1] mb-16">
          Dive into our FAQ section for insights into our services. We've compiled answers <br className=''/> to common questions to ensure you're well-informed.
        </div>
        <div className="w-full max-w-[800px] px-4">
          {Queries.map((queries, index) => (
            <div
              key={index}
              className="border-b border-gray-300/50 pb-4 cursor-pointer mb-8"
              onClick={() => togglequeries(index)}
            >
              <div className="flex justify-between items-center w-full">
                <h2 className="text-[22px] font-medium max-w-[90%]">{queries.question}</h2>
                <button className="text-2xl font-bold text-[#CF1E00]">
                  {openIndex === index ? "-" : "+"}
                </button>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "90px", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden w-full"
                  >
                    <p className="mt-4 text-gray-600 text-base leading-relaxed pr-8">
                      {queries.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default LandingQueries;