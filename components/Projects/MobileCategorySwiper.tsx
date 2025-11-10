import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import React from "react";

const MobileCategorySwiper = React.memo(function MobileCategorySwiper({
  contents,
  activeIndex,
  handleCategoryClick,
}: {
  contents: any[];
  activeIndex: number;
  handleCategoryClick: (i: number) => void;
}) {
  // ✅ Keep a stable swiper ref (but do not call slideTo)
  const swiperRef = React.useRef<any>(null);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      onSwiper={(swiper) => {
        if (!swiperRef.current) swiperRef.current = swiper; // only set once
      }}
      // ✅ prevent reinit / reset position
      allowTouchMove={true}
      observer={false}
      observeParents={false}
      watchSlidesProgress={true}
      className="mySwiper px-4 pb-6"
    >
      {contents.map((content: any, index: number) => (
        <SwiperSlide key={content.name} style={{ width: "auto" }}>
          <button
            onClick={() => handleCategoryClick(index)}
            className={`cursor-pointer ${
              index === activeIndex
                ? "bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white"
                : "bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white"
            } py-2.5 rounded-full transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-[16px] whitespace-nowrap px-4 shadow-sm hover:shadow-md min-w-[150px] text-center`}
          >
            {content.name} {content.lastWord}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default MobileCategorySwiper;
