"use client";
import React, { useState } from 'react';

const Contents = () => {
  const contents = [
    { name: "Outdoor Media Solutions" },
    { name: "RoadShow" },
    { name: "Retail Branding & Signage Solutions" },
    { name: "Exhibition Design Services" },
    { name: "Events & Activate Solutions" },
    { name: "Digital Marketing" },
    { name: "Media Buying & Planning" },
    { name: "Rural Engagement Solutions" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-16 py-12 mt-50 mb-50 ">
      <div className="flex flex-wrap justify-center gap-4 max-w-7xl ">
        {contents.map((content, index) => (
          <button
            key={index}
            className={`${
              index === activeIndex 
                ? 'bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white'
                : 'bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white'
            }
            py-2.5 rounded-full
            transform hover:-translate-y-1 transition-all duration-300 ease-in-out
            text-[16px] md:text-[16px] whitespace-nowrap px-4
            shadow-sm hover:shadow-md min-w-[150px] text-center
            `}
            onClick={() => setActiveIndex(index)}
          >
            {content.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Contents;
