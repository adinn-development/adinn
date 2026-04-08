"use client";  // Add this at the very top

import React from 'react';
import { CareerBanner } from '../reusable-components/Icons/Icons';
import Link from 'next/link';
import TopNav from '../reusable-components/TopNav';

const Hero1 = () => {
  // Add this function to handle scroll to open roles section
  const scrollToOpenRoles = () => {
    const element = document.getElementById('open-roles-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div
      className="relative w-full md:h-screen h-[500px] sm:h-[550px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${CareerBanner.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000080]"></div>
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col items-center text-center w-full max-w-[90%] sm:max-w-[85%] md:max-w-full">
          <div className="text-white w-full">
            {/* Small device text - Careers at Adinn Advertising ltd */}
            <p
              className="
                font-['PlusJakartaSans']
                font-bold
                text-[20px]
                sm:text-[22px]
                md:text-[24px]
                leading-[1.3]
                tracking-normal
                text-white
                text-center
                pt-[60px]
                sm:pt-[70px]
                md:pt-[80px]
                pb-[15px]
                sm:pb-[18px]
                md:pb-[20px]
                px-4
                sm:px-6
                md:px-0
                md:w-[580px]
                mx-auto
              "
            >
              Careers at Adinn Advertising ltd
            </p>
            
            {/* Main heading - responsive text sizes */}
            <h1 className="text-center text-white font-['PlusJakartaSans'] font-bold px-2 sm:px-4">
              <span className="block text-[32px] sm:text-[42px] md:text-[56px] lg:text-[63px] leading-[1.2] sm:leading-[1.25] md:leading-tight">
                Build your <span className="text-[#EC2B45]">career</span> with
              </span>
              <span className="block text-[32px] sm:text-[42px] md:text-[56px] lg:text-[63px] leading-[1.2] sm:leading-[1.25] md:leading-tight mt-2 sm:mt-3 md:mt-0">
                Adinn Advertising ltd.
              </span>
            </h1>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-6 flex justify-center w-full">
            <button
              className="
                w-[200px]
                sm:w-[220px]
                md:w-[258px]
                h-[55px]
                sm:h-[65px]
                md:h-[73px]
                bg-[linear-gradient(90deg,#EC2B45_0%,#861927_100%)]
                rounded-[35px]
                flex
                items-center
                justify-center
                gap-[8px]
                sm:gap-[10px]
                font-['PlusJakartaSans']
                font-semibold
                text-[18px]
                sm:text-[20px]
                md:text-[24px]
                leading-none
                text-white
                shadow-[0px_4px_10px_0px_#00000026]
                transition-all
                duration-300
                hover:scale-105
                cursor-pointer
                px-4
                sm:px-6
                whitespace-nowrap
              "
              onClick={scrollToOpenRoles}
            >
              View Open Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero1;