"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { contents } from "@/data/projects";

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load the active category from URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryIndex = contents.findIndex(content => 
        content.name.toLowerCase().replace(/\s+/g, '-') === categoryParam
      );
      if (categoryIndex !== -1) {
        setActiveIndex(categoryIndex);
      }
    }
  }, [searchParams]);

  // Function to handle category button clicks
  interface CategoryClickHandler {
    (index: number): void;
  }

    const handleCategoryClick: CategoryClickHandler = (index) => {
      setActiveIndex(index);
      
      // Update URL with the selected category
      const categoryName = contents[index].name.toLowerCase().replace(/\s+/g, '-');
      const url = new URL(window.location.href);
      url.searchParams.set('category', categoryName);
      router.replace(url.pathname + url.search, { scroll: false });
    };

  return (
    <div>
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-16 md:mt-15 mt-20">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl ">
          {contents.map((content, index) => (
            <button
              key={index}
              className={`cursor-pointer ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white'
                  : 'bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white'
              }
              py-2.5 rounded-full
              transform hover:-translate-y-1 transition-all duration-300 ease-in-out
              text-[16px] md:text-[16px] whitespace-nowrap px-4
              shadow-sm hover:shadow-md min-w-[150px] text-center cursor-pointer
              `}
              onClick={() => handleCategoryClick(index)}
            >
              {content.name} {content.lastWord}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-row w-full md:flex-row items-center md:justify-start justify-center sm:px-6 lg:px-20 gap-2 md:gap-3 py-8 md:py-12 mt-5 ">
        <div className="text-[24px] sm:text-[54px] md:text-[54px] tracking-[-2px] md:tracking-[-4px] font-bold whitespace-nowrap ">
          {contents[activeIndex].name}
        </div>
        <div className="text-[24px] sm:text-[54px] md:text-[54px] md:ml-2 instrument-font text-[#CF1E00] font-serif italic">
          {contents[activeIndex].lastWord}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-20 ">
        {contents[activeIndex].images.map((item, index) => (
          <Link
            href={`/projects/${item.id}`}
            key={item.id}
            className="block group cursor-pointer"
          >
            <div className="bg-white shadow-lg w-full h-[300px] rounded-2xl overflow-hidden
                         relative transform hover:scale-[1.02] transition-transform duration-300 ease-out">
              <Image
                src={item.image}
                alt={item.alt}
                className="w-full h-full rounded-2xl object-cover"
                priority={index < 3}
                loading={index >= 3 ? "lazy" : "eager"}
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-[24px] font-bold">{item.name}</h3>
                  <p className="text-[14px] text-[#AFB0B6]">{item.description}</p>
                </div>
                <div>
                  <FiArrowRight className="w-5 h-5 text-white group-hover:text-[#CF1E00] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Solutions);