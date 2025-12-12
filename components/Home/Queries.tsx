'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingQueries = () => {
  const Queries = [
    {
      question: "Why should I choose Adinn over other agencies?",
      answer:
        "With 24+ years of experience, 5000+ campaigns and a skilled in house team, we deliver creativity, reliability and measurable results."
    },
    {
      question: "Can I track the progress of my project?",
      answer:
        "Yes, we provide timely updates, reports and geo tagged visuals for full transparency throughout the campaign."
    },
    {
      question: "Do you offer creative ideas or just execution?",
      answer:
        "Yes, We provide end to end support from brainstorming innovative concepts to flawless execution."
    },
    {
      question: "Can you work with my existing brand guidelines?",
      answer:
        "Absolutely, we strictly follow your brand rules to maintain consistency across all campaigns."
    },
    {
      question: "Can you create completely custom campaigns?",
      answer:
        "Yes, we design unique activations and events tailored to your brand goals."
    },
    {
      question: "Can your team fix on ground issues instantly?",
      answer:
        "Absolutely, our operation teams handle corrections in real time to ensure smooth execution."
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglequeries = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 flex flex-col items-center">
      {/* Heading Section */}
      <div className="text-[32px] sm:text-[60px] lg:text-[90px] md:leading-[80px] lg:leading-[105px] text-[#28334D] font-normal text-center mb-5">
        Clearing Up Common
        <br className="hidden sm:block" />
        <span className="instrument-font text-[#CF1E00] font-serif italic block sm:inline">
          Queries
        </span>
      </div>

      {/* Subheading */}
      <div className="text-[15px] sm:text-[17px] text-center text-[#8693B1] mb-12 md:mb-16 max-w-[90%] md:max-w-[700px]">
        Dive into our FAQ section for insights into our services. We&apos;ve compiled answers
        to common questions to ensure you&apos;re well-informed.
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-[950px] px-4 md:px-8 lg:px-4">
        {Queries.map((queries, index) => (
          <div
            key={index}
            className="border-b border-gray-300/50 pb-4 cursor-pointer mb-6 md:mb-8"
            onClick={() => togglequeries(index)}
          >
            <div className="flex justify-between items-center w-full">
              <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-medium max-w-[90%] text-[#28334D]">
                {queries.question}
              </h2>
              <button className="text-xl md:text-2xl font-bold text-[#CF1E00]">
                {openIndex === index ? "-" : "+"}
              </button>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden w-full"
                >
                  <p className="mt-4 text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed pr-4 md:pr-8">
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
