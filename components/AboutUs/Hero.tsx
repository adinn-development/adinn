import React from 'react';
import { AboutHero } from '../ReUsableComponents/Icons/Icons';

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AboutHero.src})` }}
    >

      <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white max-w-lg">
        <h1 className="text-[54px] font-bold leading-tight drop-shadow-[0_0_10px_rgba(207,30,0,0.5)]">
          About Us
        </h1>
        <p className="text-[#E1E1E1] text-[20px] leading-tight">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
    </div>
  );
};

export default Hero;