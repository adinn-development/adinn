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
        <div className='text-[32px] md:text-[72px] xl:text-[120px] lg:text-[80px] font-bold tracking-tighter'>
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
      
      {/* WE DO text, description and buttons - bottom right */}
      <div className='absolute bottom-[35%] right-[5%] sm:bottom-[20%] sm:right-[10%] lg:bottom-[25%] lg:right-[7%] xl:bottom-[25%] xl:right-[12%] text-left items-start justify-start max-w-[85%] sm:max-w-[45%] md:max-w-[40%]'>
        <div className='text-[32px] md:text-[48px] xl:text-[92px] lg:text-[50px] font-bold md:leading-none mb-3 md:mb-4 xl:mb-6 lg:mb-4'>
          WE DO
        </div>
        
        {/* Description - responsive for all screen sizes */}
        <div className='md:block hidden text-[12px] md:text-[14px] xl:text-[16px] lg:text-[15px] text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8 text-left w-[300px]'>
          We create innovative digital solutions that transform ideas into reality. 
        </div>
        
        <div className='hidden sm:block md:block'>
          <div className='flex flex-row gap-4 '>
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
      
      {/* Mobile buttons - moved down to accommodate description */}
      <div className='block sm:hidden md:hidden'>
        <div className='flex flex-row gap-5 mt-[280px] w-full bottom-10 left-1/2 justify-center text-center'>
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