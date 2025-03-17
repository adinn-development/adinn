"use client";
import React from "react";
import { MobileLogo } from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import Link from "next/link";

const LandingMobile = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-white flex flex-col relative">
      {/* WHAT text - positioned on the left */}
      <div className="absolute top-[40%] left-[12%] md:top-[25%] sm:top-[25%] md:left-[18%] sm:left-[28%] z-10">
        <div className="text-[32px] md:text-[92px] font-bold tracking-tighter">
          WHAT
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <Image
          src={MobileLogo}
          alt="Mobile Logo"
          className="w-[300px] h-[300px] md:w-[634px] md:h-[634px] object-contain"
          priority
          draggable="false"
        />
      </div>

      {/* WE DO text and buttons - positioned on the right */}
      <div className="absolute bottom-[40%] right-[4%] sm:bottom-[28%] sm:right-[15px] md:bottom-[28%] md:right-[15px] text-left z-10">
        <div className="text-[32px] md:text-[92px] font-bold leading-none mb-6">
          WE DO
        </div>
        <div className="hidden sm:block md:block">
          <div className="flex flex-row gap-4 justify-end ">
            <Link href="/about-us">
              <button className="bg-[#EC2B45] px-10 py-3 text-white text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105">
                More About Us
              </button>
            </Link>

            <Link href="/projects">
              <button className="bg-[#EAEAEA] px-10 py-3 text-gray-700 text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
                Our Projects
              </button>
            </Link>
          </div>
        </div>

        
      </div>
      <div className="block sm:hidden md:hidden">
          <div className="flex flex-row gap-4 justify-end ">
            <Link href="/about-us">
              <button className="bg-[#EC2B45] px-10 py-3 text-white text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105">
                More About Us
              </button>
            </Link>

            <Link href="/projects">
              <button className="bg-[#EAEAEA] px-10 py-3 text-gray-700 text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
                Our Projects
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default LandingMobile;
