import React from 'react';
import { ServiceHero } from '../ReUsableComponents/Icons/Icons';
import Link from 'next/link';

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${ServiceHero.src})` }}
    >


      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-white ">
          <h1 className="text-[54px] font-bold leading-tight instrument-font">
            OOH & Outdoor
          </h1>
          <p className="text-[54px] text-white">
            MEDIA SOLUTIONS
          </p>
        </div>
        
      
        <div className="mt-1 flex space-x-4">
  <Link href="/projects">
    <button className="bg-[#000000] text-white px-6 py-3 rounded-full w-[180px] h-[48px] text-center transition-all hover:bg-[#333333] hover:shadow-lg">
      View Projects
    </button>
  </Link>
  <Link href="/contact">
    <button className="bg-transparent border border-[#EEEEEE] text-[#EEEEEE] px-6 py-3 rounded-full w-[180px] h-[48px] text-center transition-all hover:bg-[#EEEEEE]/10 hover:border-white hover:text-white hover:shadow-lg">
      Contact us
    </button>
  </Link>
</div>
      </div>
    </div>
  );
}

export default Hero;
