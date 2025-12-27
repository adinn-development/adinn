
import React from 'react';
import { AboutHero } from '../reusable-components/Icons/Icons';
import TopNav from '../reusable-components/TopNav';

const Hero = () => {
  return (
<div className="relative w-full md:h-screen h-[400px] overflow-hidden">
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="/aboutUsBannerVideo.webm"   // change path
    autoPlay
    muted
    loop
    playsInline
  />

  {/* Optional dark overlay */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Content */}
  <div className="absolute inset-0 flex items-center justify-center -mt-10">
    <div className="flex flex-col items-center text-center max-w-[600px] px-4 relative z-10">
      <div className="text-white">
        {/* <h1 className="md:text-[54px] text-[30px] font-bold leading-tight instrument-font">
          About Us
        </h1> */}
        {/* <p className="md:text-[20px] text-[10px] md:mt-0 mt-2 min-w-min text-white">
          Adinn Advertising is your solution provider, turning ideas into impactful campaigns.
          We understand your brand, craft the right strategy and deliver results that truly connect.
        </p> */}
      </div>
    </div>
  </div>
</div>

  );
};

export default Hero;