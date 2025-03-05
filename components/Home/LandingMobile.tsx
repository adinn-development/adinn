import React from 'react';
import { MobileLogo } from '../ReUsableComponents/Icons/Icons';
import Image from 'next/image';

const LandingMobile = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* WHAT text positioned outside */}
      <div className='absolute top-10 md:top-30 left-4 md:left-45 z-10'>
        <div className='text-[72px] md:text-[120px] font-bold tracking-tighter'>
          WHAT
        </div>
      </div>

      {/* Main content container */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {/* Mobile with animation */}
        <div className="relative">
          <div className="hover:animate-spin-slow transition-all duration-700 ease-in-out">
            <Image
              src={MobileLogo}
              alt="Mobile Logo"
              className='w-[300px] h-[300px] md:w-[634px] md:h-[634px] object-contain'
              priority
            />
          </div>

          {/* WE DO and buttons positioned on bottom right */}
          <div className='absolute bottom-0 md:bottom-25 -right-10 transform translate-x-1/3 md:translate-x-1/2'>
            <div className='text-[48px] md:text-[92px] font-bold leading-none mb-4 md:mb-6'>
              WE DO
            </div>
            <div className='flex flex-row gap-3 md:gap-4 items-center justify-end'>
              <button className='bg-[#EC2B45] px-4 md:px-10 py-2 md:py-3 text-white text-[14px] md:text-[16px] rounded-full hover:bg-[#d41c34] duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform whitespace-nowrap'>
                More About Us
              </button>
              <button className='bg-[#EAEAEA] px-4 md:px-10 py-2 md:py-3 text-gray-700 text-[14px] md:text-[16px] rounded-full hover:bg-gray-200 duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform whitespace-nowrap'>
                Our Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMobile;