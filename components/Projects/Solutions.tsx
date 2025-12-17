"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { contents } from "@/data/projects";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ReUsableComponents/Icons/Icons";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const MobileCategorySwiper = ({
  contents,
  activeIndex,
  handleCategoryClick,
}: any) => {
  const swiperRef = React.useRef<any>(null);

  useEffect(() => {
    // When activeIndex changes, slide to the clicked button
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex, 400);
    }
  }, [activeIndex]);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="mySwiper px-4 pb-6"
    >
      {contents.map((content: any, index: number) => (
        <SwiperSlide key={index} style={{ width: "auto" }}>
          <button
            onClick={() => handleCategoryClick(index)}
            className={`cursor-pointer ${
              index === activeIndex
                ? "bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white"
                : "bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white"
            } py-2.5 rounded-full transform hover:-translate-y-1 transition-all duration-300 ease-in-out
            text-[16px] md:text-[16px] whitespace-nowrap px-4
            shadow-sm hover:shadow-md min-w-[150px] text-center`}
          >
            {content.name} {content.lastWord}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load the active category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categoryIndex = contents.findIndex(
        (content) =>
          content.name.toLowerCase().replace(/\s+/g, "-") === categoryParam
      );
      if (categoryIndex !== -1) {
        setActiveIndex(categoryIndex);
      }
    }
  }, [searchParams]);

  // Category click handler
  const handleCategoryClick = (index: number) => {
    setActiveIndex(index);
    const categoryName = contents[index].name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const url = new URL(window.location.href);
    url.searchParams.set("category", categoryName);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  // Reusable category button
  const CategoryButton = (content: any, index: number) => (
    <button
      key={index}
      className={`cursor-pointer ${
        index === activeIndex
          ? "bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white"
          : "bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white"
      }
        py-2.5 rounded-full transform hover:-translate-y-1 transition-all duration-300 ease-in-out
        text-[16px] md:text-[16px] whitespace-nowrap px-4
        shadow-sm hover:shadow-md min-w-[150px] text-center`}
      onClick={() => handleCategoryClick(index)}
    >
      {content.name} {content.lastWord}
    </button>
  );

  return (
    <div>
      {/* --- Category Buttons --- */}
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-16 md:mt-15 mt-20">
        {/* Desktop Grid */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4 max-w-4xl">
          {contents.map((content, index) => CategoryButton(content, index))}
        </div>

       {/* Mobile Carousel (fixed scroll position) */}
<div className="sm:hidden w-full mb-6">
  <MobileCategorySwiper
    contents={contents}
    activeIndex={activeIndex}
    handleCategoryClick={handleCategoryClick}
  />
</div>

      </div>

      {/* --- Category Title & Cards Section --- */}
      {/* Desktop View (Normal Layout) */}
      <div className="hidden sm:block">
        <div className="flex flex-row w-full md:flex-row items-center md:justify-start justify-center sm:px-6 lg:px-20 gap-2 md:gap-3 py-8 md:py-12 mt-5">
          <div className="text-[24px] sm:text-[54px] md:text-[54px] tracking-[-2px] md:tracking-[-4px] font-bold whitespace-nowrap">
            {contents[activeIndex].name}
          </div>
          <div className="text-[24px] sm:text-[54px] md:text-[54px] md:ml-2 instrument-font text-[#CF1E00] font-serif italic">
            {contents[activeIndex].lastWord}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-20">
          {contents[activeIndex].images.map((item, index) => (
            <Link
              href={`/projects/${item.id}`}
              key={item.id}
              className="block group cursor-pointer"
            >
              <div
                className="bg-white shadow-lg w-full h-[300px] rounded-2xl overflow-hidden
                relative transform hover:scale-[1.02] transition-transform duration-300 ease-out"
              >
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
                    <p className="text-[14px] text-[#AFB0B6]">
                      {item.description}
                    </p>
                  </div>
                  <FiArrowRight className="w-5 h-5 text-white group-hover:text-[#CF1E00] transition-colors duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

     {/* Mobile View (Carousel for Title + Cards with dynamic arrows) */}
<div className="sm:hidden mt-20 px-6 relative">
{/* Navigation Buttons (below image cards, bottom-right corner) */}
{/* <div className="flex justify-end mt-3 gap-3">
  <button className="swiper-button-prev-card hidden bg-[#EC2B45] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#CF1E00] transition-all duration-200 text-sm">
    &#8592;
  </button>
  <button className="swiper-button-next-card bg-[#EC2B45] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#CF1E00] transition-all duration-200 text-sm">
    &#8594;
  </button>
</div> */}

  <Swiper
    spaceBetween={20}
    onSwiper={(swiper) => {
    // Run arrow setup *after* Swiper is mounted in the DOM
    setTimeout(() => {
      const prevBtn = document.querySelector(".swiper-button-prev-card") as HTMLElement | null;
      const nextBtn = document.querySelector(".swiper-button-next-card") as HTMLElement | null;

      if (!prevBtn || !nextBtn) return; // safety guard

      // initial arrow visibility
     prevBtn.style.display = "none";
nextBtn.style.display = "flex";

      swiper.on("slideChange", () => {
        if (!prevBtn || !nextBtn) return;
        if (swiper.isBeginning) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "flex";
        } else if (swiper.isEnd) {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }
      });
    }, 0);
  }}
    navigation={{
      nextEl: ".swiper-button-next-card",
      prevEl: ".swiper-button-prev-card",
    }}
    modules={[Pagination, Navigation]}
    className="mySwiper pb-20"
  >
    {contents[activeIndex].images.map((item, index) => (
      <SwiperSlide key={index}>
        {/* Title for each slide */}
        <div className="flex flex-col items-center mb-4 text-center">
          <div className="text-[24px] tracking-tight font-bold">
            {contents[activeIndex].name}
          </div>
          <div className="text-[24px] text-[#CF1E00] font-serif italic">
            {contents[activeIndex].lastWord}
          </div>
        </div>

        {/* Image Card */}
        <Link href={`/projects/${item.id}`} className="block group cursor-pointer">
          <div
            className="bg-white shadow-lg w-full h-[300px] rounded-2xl overflow-hidden
            relative transform hover:scale-[1.02] transition-transform duration-300 ease-out"
          >
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
                <h3 className="text-[20px] font-bold">{item.name}</h3>
                <p className="text-[14px] text-[#AFB0B6]">{item.description}</p>
              </div>

              {/* default right arrow icon in design */}
              <FiArrowRight className="w-5 h-5 text-white group-hover:text-[#CF1E00] transition-colors duration-300" />
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
  {/* Navigation Buttons (below image cards, bottom-right corner) */}
<div className="flex justify-end mt-3 gap-3">
  <button className="swiper-button-prev-card hidden bg-[#d8283f] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#CF1E00] transition-all duration-200">
 <Image src={ChevronLeftIcon} alt="Previous" width={8} height={8} className="invert brightness-0" />
</button>

<button className="swiper-button-next-card bg-[#d8283f] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-[#CF1E00] transition-all duration-200">
     <Image src={ChevronRightIcon} alt="Next" width={8} height={8} className="invert brightness-0" />
</button>
</div>
</div>
    </div>
  );
};

export default React.memo(Solutions);
