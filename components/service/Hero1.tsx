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
      className="relative w-full md:h-screen h-[400px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${CareerBanner.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000080]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="text-white">
            <p
              className="
                font-['PlusJakartaSans']
                font-bold
                text-[24px]
                leading-[22.32px]
                tracking-normal
                text-white
                align-middle
                pt-[80px] pb-[20px]
                md:w-[580px] md:px-0 px-5
              "
            >
              Careers at Adinn Advertising ltd
            </p>
            <h1 className="text-center text-white font-['PlusJakartaSans'] font-bold">
              <span className="block text-[63px] leading-tight">
                Build your <span className="text-[#EC2B45]">career</span> with
              </span>
              <span className="block text-[63px] leading-tight">
                Adinn Advertising ltd.
              </span>
            </h1>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              className="
                w-[258px] h-[73px]
                bg-[linear-gradient(90deg,#EC2B45_0%,#861927_100%)]
                rounded-[35px]
                flex items-center justify-center gap-[10px]
                font-['PlusJakartaSans'] font-semibold
                text-[24px] leading-none text-white
                shadow-[0px_4px_10px_0px_#00000026]
                transition-all duration-300
                hover:scale-105
                cursor-pointer
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