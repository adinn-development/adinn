import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  ImageCenter,
} from "@/components/ReUsableComponents/Icons/Icons";

const ShowCase = () => {
  //   const images = [
  //     {
  //       image: Image1,
  //     },
  //     {
  //       image: Image2,
  //     },
  //     {
  //       image: Image3,
  //     },
  //     {
  //       image: Image4,
  //     },
  //     {
  //       image: Image5,
  //     },
  //     {
  //       image: Image6,
  //     },
  //     {
  //       image: Image7,
  //     },
  //     {
  //       image: Image8,
  //     },
  //     {
  //       image: ImageCenter,
  //     },

  //   ];

  return (
    <div className="flex flex-col items-center justify-start p-8 md:p-12 lg:p-16 mt-50">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-12">
        <div className="text-[40px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold">
          Showcase
        </div>
        <div className="text-[40px] sm:text-[60px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
          Our Work
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 md:gap-6 mb-12 w-full max-w-[1440px] mx-auto">
        <div className="col-span-1 row-span-2">
          <Image 
            src={Image1} 
            alt="Image1" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={274}
            height={479}
          />
        </div>

        <div className="col-span-2 row-span-1">
          <Image 
            src={Image2} 
            alt="Image2" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={361}
            height={214}
          />
        </div>

        <div className="col-span-2 row-span-1">
          <Image 
            src={Image3} 
            alt="Image3" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={361}
            height={214}
          />
        </div>

        <div className="col-span-1 row-span-2">
          <Image 
            src={Image4} 
            alt="Image4" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={274}
            height={465}
          />
        </div>

        <div className="col-start-2 col-span-4 row-span-2">
          <Image 
            src={ImageCenter} 
            alt="ImageCenter" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={746}
            height={479}
          />
        </div>

        <div className="col-start-6 row-start-3 row-span-2">
          <Image 
            src={Image5} 
            alt="Image5" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={274}
            height={465}
          />
        </div>

        <div className="col-span-1 row-span-1">
          <Image 
            src={Image8} 
            alt="Image8" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={274}
            height={214}
          />
        </div>

        <div className="col-span-4 row-span-1">
          <Image 
            src={Image7} 
            alt="Image7" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={744}
            height={214}
          />
        </div>

        <div className="col-span-1 row-span-1">
          <Image 
            src={Image6} 
            alt="Image6" 
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            width={276}
            height={214}
          />
        </div>
      </div>

      <Link href="/projects">
        <button className="bg-[#EEEFF3] text-black px-4 py-2 rounded-[31px] w-[158px] h-[44px] cursor-pointer hover:bg-[#d7dcee] hover:scale-105 transition-all duration-300">
          View Projects
        </button>
      </Link>
    </div>
  );
};

export default ShowCase;
