
import React from 'react';
import { AboutHero } from '../ReUsableComponents/Icons/Icons';
import TopNav from '../ReUsableComponents/TopNav';

const Hero = () => {
  return (
    <div
      className="relative w-full md:h-screen h-[400px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AboutHero.src})` }}
    >
      

      <div className="absolute inset-0 flex items-center justify-center -mt-10">
        <div className="flex flex-col items-center text-center max-w-[600px] px-4">
          <div className="text-white">
            <h1 className="md:text-[54px] text-[30px] font-bold leading-tight instrument-font">
              About Us
            </h1>
            <p className="md:text-[20px] text-[10px] md:mt-0 mt-2 min-w-min text-white">
            Adinn Advertising Services Limited is a leading full-service advertising agency with
over 23 years of industry expertise, headquartered in Madurai with a branch office in
Chennai, catering to clients across South India
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;