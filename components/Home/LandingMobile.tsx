"use client";
import React from "react";
import { MobileLogo } from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import Link from "next/link";

const LandingMobile = () => {
  return (
    // <div className="h-screen w-full overflow-hidden flex flex-col">
    //   {/* Main content container with 3 rows */}
    //   <div className="flex flex-col h-full">
    //     {/* Top section with WHAT text */}
    //     <div className="flex-1 flex items-end justify-start pl-[12%] md:pl-[18%] sm:pl-[28%]">
    //       <div className="text-[32px] md:text-[92px] font-bold tracking-tighter">
    //         WHAT
    //       </div>
    //     </div>
        
    //     {/* Middle section with logo */}
    //     <div className="bg-black flex-1 flex items-center justify-center">
    //       <Image
    //         src={MobileLogo}
    //         alt="Mobile Logo"
    //         className="w-[300px] h-[300px] md:w-[634px] md:h-[634px] object-contain" // Ensure logo is above background
    //         priority
    //         draggable="false"
    //       />
    //     </div>
        
    //     {/* Bottom section with WE DO text and buttons */}
    //     <div className="flex-1 flex flex-col items-end justify-start pr-[4%] sm:pr-[15px] md:pr-[15px]">
    //       <div className="text-[32px] md:text-[92px] font-bold leading-none mb-6">
    //         WE DO
    //       </div>
          
    //       {/* Buttons for larger screens */}
    //       <div className="hidden sm:block md:block">
    //         <div className="flex flex-row gap-4 justify-end">
    //           <Link href="/about-us">
    //             <button className="bg-[#EC2B45] px-10 py-3 text-white text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105">
    //               More About Us
    //             </button>
    //           </Link>
    //           <Link href="/projects">
    //             <button className="bg-[#EAEAEA] px-10 py-3 text-gray-700 text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
    //               Our Projects
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
      
    //   {/* Buttons for mobile screens, outside the main flex container */}
    //   <div className="block sm:hidden md:hidden py-6">
    //     <div className="flex flex-row gap-4 justify-center">
    //       <Link href="/about-us">
    //         <button className="bg-[#EC2B45] px-10 py-3 text-white text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105">
    //           More About Us
    //         </button>
    //       </Link>
    //       <Link href="/projects">
    //         <button className="bg-[#EAEAEA] px-10 py-3 text-gray-700 text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
    //           Our Projects
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-full">
  <div>
    What
  </div>
  <div>
    <Image 
      src={MobileLogo} 
      alt="Mobile Logo" 
      className="bg-black"
    />
  </div>
  <div>
    We Do
  </div>
</div>
  );
};

export default LandingMobile;