
import React from 'react';
import { AboutHero } from '../ReUsableComponents/Icons/Icons';
import TopNav from '../ReUsableComponents/TopNav';

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AboutHero.src})` }}
    >
      <div className="relative z-10">
        <TopNav />
      </div>

      <div className="absolute inset-0 flex items-center justify-center -mt-10">
        <div className="flex flex-col items-center text-center max-w-[600px] px-4">
          <div className="text-white">
            <h1 className="text-[54px] font-bold leading-tight instrument-font">
              About Us
            </h1>
            <p className="text-[34px] min-w-min text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;