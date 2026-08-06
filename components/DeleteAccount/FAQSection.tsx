"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "./faqData";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16 bg-[#FBF9FF]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          Frequently Asked{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Questions
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-shadow duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span className="text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#EC2B45] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[14px] sm:text-[15px] text-[#6A6B6D] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
