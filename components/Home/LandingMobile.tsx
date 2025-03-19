"use client";
import React from 'react';
import { MobileLogo } from '../ReUsableComponents/Icons/Icons';
import Image from 'next/image';
import Link from 'next/link';

const LandingMobile = () => {
  return (
    <div className='relative md:h-screen  w-full overflow-hidden flex flex-col justify-between p-4'>
      {/* WHAT text */}
      <div className='absolute top-[43%] left-[9%] sm:top-[25%] sm:left-[10%] md:top-[30%] md:left-[15%]'>
        <div className='text-[32px] sm:text-[72px] md:text-[120px] font-bold tracking-tighter'>
          WHAT
        </div>
      </div>

      {/* Main mobile image - centered */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Image
          src={MobileLogo}
          alt="Mobile Logo"
          className='w-[300px] h-[300px] md:w-[634px] md:h-[634px] object-contain'
          priority
          draggable="false"
        />
      </div>

      {/* WE DO text and buttons - bottom right */}
      <div className='absolute bottom-[40%] right-[5%] sm:bottom-[25%] sm:right-[10%] md:bottom-[30%] md:right-[10%] text-left'>
        <div className='text-[32px] sm:text-[48px] md:text-[92px] font-bold leading-none mb-6'>
          WE DO
        </div>
        <div className='hidden sm:block md:block'>
        <div className='flex flex-row gap-4 justify-end'>
          <Link href="/about-us">
            <button className='bg-[#EC2B45] px-10 py-3 text-white text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105'>
              More About Us
            </button>
          </Link>

          <Link href="/projects">
            <button className='bg-[#EAEAEA] px-10 py-3 text-gray-700 text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105'>
              Our Projects
            </button>
          </Link>
        </div>
        </div>
       

      </div>
      <div className='block sm:hidden md:hidden'>
      <div className='flex flex-row gap-5 mt-[450px] w-full bottom-10 left-1/2  justify-center text-center '>
          <Link href="/about-us">
            <button className='bg-[#EC2B45] w-[113px] h-[40px] text-white text-[12px] rounded-[10px] hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105'>
              More About Us
            </button>
          </Link>

          <Link href="/projects">
            <button className='bg-[#EAEAEA] w-[113px] h-[40px] text-gray-700 text-[12px] rounded-[10px] hover:bg-gray-200 transition-all cursor-pointer hover:scale-105'>
              Our Projects
            </button>
          </Link>
        </div>
      </div>
     
    </div>
  );
};

export default LandingMobile;