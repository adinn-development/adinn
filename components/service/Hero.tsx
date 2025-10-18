import React from 'react';
import { ServiceHero } from '../ReUsableComponents/Icons/Icons';
import Link from 'next/link';
import TopNav from '../ReUsableComponents/TopNav';

const Hero = () => {
  return (
    <div
      className="relative w-full md:h-screen h-[400px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ServiceHero.src})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="text-white">
            <h1 className="text-[30px]  md:text-[54px]  font-bold leading-tight instrument-font">
              Services
            </h1>
            <p className="md:text-[20px] text-[10px] md:w-[580px] md:px-0 px-5 text-white">
            To be the beacon of creativity and innovation in the advertising industry, where every
            brand finds a voice that is not just heard but remembered.
            </p>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link href="/projects">
              <button className="bg-[#000000] cursor-pointer border border-[#000000] text-white text-[12px] md:text-[16px] rounded-full w-[130px] h-[40px] md:w-[180px] md:h-[48px] sm:w-[180px] sm:h-[48px] text-center transition-all hover:bg-[#141414] hover:scale-105 hover:shadow-lg flex items-center justify-center">
                View Projects
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent cursor-pointer border text-[12px] md:text-[16px] border-[#EEEEEE] text-[#EEEEEE] rounded-full w-[118px] h-[40px] md:w-[180px] md:h-[48px] sm:w-[180px] sm:h-[48px] text-center transition-all hover:bg-[#EEEEEE]/10 hover:border-white hover:text-white hover:shadow-lg flex items-center justify-center">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
