"use client";
import React from 'react';
import { MobileLogo } from '../ReUsableComponents/Icons/Icons';
import Image from 'next/image';
import Link from 'next/link';

const LandingMobile = () => {
  return (
    <>
      {/* Mobile and Tablet Version */}
      <div className='lg:hidden  relative w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 h-[70vh] sm:-h-[600px]'>
        {/* WHAT text */}
        <div className='absolute top-[15%] left-4 sm:left-6'>
          <div className='text-2xl sm:text-4xl font-bold tracking-tighter'>
            WHAT
          </div>
        </div>
        
        {/* Main mobile image - centered */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className='w-100 h-100 sm:w-100 sm:h-100 object-cover'
            priority
            draggable="false"
          />
        </div>
        
        {/* WE DO text, description and buttons - bottom section */}
        <div className='absolute bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:right-0 sm:transform sm:translate-y-1/2 w-full sm:w-1/2 p-4 sm:p-6 flex flex-col items-start justify-start'>
          <div className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
            WE DO
          </div>
          
          {/* Description */}
          <div className='text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-xs sm:max-w-sm'>
            We create innovative digital solutions that transform ideas into reality.
          </div>
          
          {/* Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
            <Link href="/about-us">
              <button className='w-full sm:w-auto bg-[#EC2B45] px-8 sm:px-10 py-2.5 sm:py-3 text-white text-sm sm:text-base rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105'>
                More About Us
              </button>
            </Link>
            <Link href="/projects">
              <button className='w-full sm:w-auto bg-[#EAEAEA] px-8 sm:px-10 py-2.5 sm:py-3 text-gray-700 text-sm sm:text-base rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105'>
                Our Projects
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Version - Original */}
      <div className='hidden md:flex relative md:h-[570px] lg:h-screen w-full overflow-hidden flex-col justify-between p-4 md:p-6'>
        {/* WHAT text */}
        <div className='absolute top-[20%] md:top-[20%] md:left-[5%] lg:top-[30%] lg:left-[15%]'>
          <div className='md:text-[72px] lg:text-[80px] xl:text-[120px] font-bold tracking-tighter'>
            WHAT
          </div>
        </div>
        
        {/* Main mobile image - centered */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className='md:w-[450px] md:h-[450px] lg:w-[634px] lg:h-[634px] object-contain'
            priority
            draggable="false"
          />
        </div>

        {/* Desktop version section */}
        <div className='absolute bottom-[35%] right-[5%] md:bottom-[95%] md:right-[8%] lg:bottom-[25%] lg:right-[7%] xl:bottom-[25%] xl:right-[12%] text-left items-start justify-start max-w-[45%] lg:max-w-[40%]'>
          <div className='md:text-[50px] lg:text-[92px] font-bold md:leading-none mb-3 md:mb-4 lg:mb-6'>
            WE DO
          </div>
          
          {/* Description - desktop only */}
          <div className='text-[14px] lg:text-[15px] xl:text-[16px] text-gray-700 leading-relaxed mb-4 md:mb-6 lg:mb-8 text-left w-[300px]'>
            We create innovative digital solutions that transform ideas into reality. 
          </div>
          
          <div className='flex flex-row gap-4 lg:gap-6'>
            <Link href="/about-us">
              <button className='bg-[#EC2B45] px-8 md:px-9 lg:px-10 py-2.5 md:py-3 lg:py-3 text-white text-[14px] md:text-[15px] lg:text-[16px] rounded-full hover:bg-[#d41c34] transition-all cursor-pointer hover:scale-105'>
                More About Us
              </button>
            </Link>

            <Link href="/projects">
              <button className='bg-[#EAEAEA] px-8 md:px-9 lg:px-10 py-2.5 md:py-3 lg:py-3 text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105'>
                Our Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingMobile;