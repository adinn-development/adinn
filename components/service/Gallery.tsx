import React from "react";
import Image from "next/image";
import {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  HandImage,
} from "@/components/ReUsableComponents/Icons/Icons";
import Link from "next/link";
import Gallery5 from "@/public/Frame 192.png";



const Gallery = () => {
  return (
    <div className="flex flex-col items-center mt-30">
      <div className="flex flex-row md:flex-row items-center justify-center gap-4 md:gap-3 py-8 md:py-12">
        <div className="text-[24.5px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold text-[#C6C6CB]">
          Projects
        </div>
        <Image
          src={HandImage}
          alt="Hand"
          width={219}
          height={219}
          className="w-[89.76px] md:w-[219px] h-auto"
        />
        <div className="text-[24px] sm:text-[60px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
          Gallery
        </div>
      </div>

      <div className="grid grid-cols-1 w-full max-w-full mx-auto px-5">
        <div className="flex flex-col gap-4 md:gap-14 justify-center items-center w-full max-w-full mx-auto px-5 space-y-1">
          {/* First Row */}
          <div className="flex flex-row gap-4 w-full">
            <div className="text-center w-[70%] max-w-full h-[20vh] lg:h-[40vh]">
              <div className="w-full h-full overflow-hidden hover:scale-101 transition-transform duration-300">
                <Image
                  src={Gallery1}
                  alt="Gallery1"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="hidden sm:block md:block lg:block text-justify align-center justify-center">
                <div className="flex flex-row justify-between items-center align-center">

                  <h3 className="text-[20px] font-medium mt-2">
                  Digital Marketing Success – Selvaganapathy TVS

                
                  </h3>
                  {/* <p className="text-[16px] text-gray-600">
                    Dindugal Thalappakatti
                  </p> */}
                </div>
              </div>
            </div>

            <div className="text-center w-[30%] max-w-full h-[20vh] lg:h-[40vh]">
              <div className="max-w-full h-full overflow-hidden hover:scale-101 transition-transform duration-300">
                <Image
                  src={Gallery2}
                  alt="Gallery2"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="hidden sm:block md:block lg:block text-justify align-center justify-center">
                <div className="flex flex-row  items-center align-center">
                  <h3 className="text-[20px] font-medium mt-2">
                  Retail Activation for Sathya Electronics

                  </h3>
                  {/* <p className="text-[16px] text-gray-600">Malabar</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-row justify-between w-full">
            <div className="text-center w-[33%] max-w-full h-[20vh] lg:h-[40vh]">
              <div className="w-full h-full overflow-hidden hover:scale-101 transition-transform duration-300">
                <Image
                  src={Gallery3}
                  alt="Gallery3"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="hidden sm:block md:block lg:block text-justify align-center justify-center">
                <div className="flex flex-row justify-between items-center align-center">
                  
                  <h3 className="text-[20px] font-medium mt-2"> 
                  Roadshow Campaign for Reliance Digital
                  </h3>
                  {/* <p className="text-[16px] text-gray-600">Nippon Paint</p> */}
                </div>
              </div>
            </div>

            <div className="text-center w-[32.5%] max-w-full h-[20vh] lg:h-[40vh]">
              <div className="max-w-full h-full overflow-hidden hover:scale-101 transition-transform duration-300">
                <Image
                  src={Gallery5}
                  alt="Gallery4"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="hidden sm:block md:block lg:block text-justify align-center justify-center">
                <div className="flex flex-row items-center align-center">
                  <h3 className="text-[20px] font-medium mt-2 ">
                  Outdoor Advertising for Avantra
                  </h3>
                  {/* <p className="text-[16px] text-gray-600">Nippon Paint</p> */}
                </div>
              </div>
            </div>

            <div className="text-center w-[32.5%] max-w-full h-[20vh] lg:h-[40vh]">
              <div className="max-w-full h-full overflow-hidden hover:scale-101 transition-transform duration-300">
                <Image
                  src={Gallery4}
                  alt="Gallery4"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="hidden sm:block md:block lg:block text-justify align-center justify-center">
                <div className="flex flex-row justify-between items-center align-center">
                  <h3 className="text-[20px] font-medium mt-2">
                  Media Buying for Tamil Nadu Bajaj

                  </h3>
                  {/* <p className="text-[16px] text-gray-600">Nippon Paint</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-20">
        <Link href="/projects">
          <button className="bg-[#EEEFF3] text-black px-4 py-2 rounded-[31px] w-[158px] h-[44px] cursor-pointer hover:bg-[#d7dcee] hover:scale-105 transition-all duration-300">
            View Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
