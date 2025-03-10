// "use client";
// import React from "react";
// import { AboutHero } from "../ReUsableComponents/Icons/Icons";
// import TopNav from "../ReUsableComponents/TopNav";

// const Hero = () => {
//   return (
//     <div className="relative w-full h-screen">
//       {/* Background image */}
//       <div 
//         className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${AboutHero.src})` }}
//       />
      
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>
      
//       {/* TopNav with higher z-index to ensure it's fully interactive */}
//       <div className="relative z-50">
//         <TopNav />
//       </div>
      
//       {/* Centered content */}
//       <div className="absolute inset-0 flex items-center justify-center z-10 -mt-10">
//         <div className="flex flex-col items-center text-center px-4">
//           <div className="text-white">
//             <h1 className="text-[54px] font-bold leading-tight instrument-font">
//               About Us
//             </h1>
//             <p className="text-[24px] md:text-[32px] text-white mt-4">
//               Lorem ipsum dolor
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
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
      {/* <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white max-w-lg">
        <h1 className="text-[54px] font-bold leading-tight drop-shadow-[0_0_10px_rgba(207,30,0,0.5)]">
          Projects
        </h1>
        <p className="text-[#E1E1E1] text-[20px] leading-tight">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div> */}
                  <div className="absolute inset-0 flex items-center justify-center -mt-10">
        <div className="flex flex-col items-center text-center">
          <div className="text-white">
            <h1 className="text-[54px] font-bold leading-tight instrument-font">
              Projects
            </h1>
            <p className="text-[54px] text-white">
            Lorem ipsum dolor
            </p>
          </div>
{/* 
          <div className="mt-6 flex space-x-4">
            <Link href="/projects">
              <button className="bg-[#000000] cursor-pointer text-white px-6 py-3 rounded-full w-[180px] h-[48px] text-center transition-all hover:bg-[#333333] hover:shadow-lg">
                View Projects
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent cursor-pointer border border-[#EEEEEE] text-[#EEEEEE] px-6 py-3 rounded-full w-[180px] h-[48px] text-center transition-all hover:bg-[#EEEEEE]/10 hover:border-white hover:text-white hover:shadow-lg">
                Contact us
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;