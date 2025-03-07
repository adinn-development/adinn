import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  Card,
  AdinnLogoFooter,
} from "./Icons/Icons";
import Image from "next/image";

const Footer = () => {
  const FooterLogos = [
    {
      src: FacebookLogo,
      alt: "Facebook",
    },
    {
      src: InstagramLogo,
      alt: "Instagram",
    },
    {
      src: TwitterLogo,
      alt: "Twitter",
    },
    {
      src: YoutubeLogo,
      alt: "Youtube",
    },
  ];

  return (
    <div className="bg-[#0C0C0C] w-full min-h-auto px-4 sm:px-8 md:px-16 py-6 sm:py-10 md:py-12">
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-7 md:gap-8 mb-7">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start gap-6 sm:gap-7 md:gap-8 w-full md:w-1/2">
          <div className="relative w-full">
            <Image
              src={Card}
              alt="card"
              className="w-full h-auto rounded-[20px] sm:rounded-[28px]"
            />
            <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-8 flex flex-col gap-1.5 sm:gap-2">
              <div className="text-white text-lg sm:text-2xl md:text-[34px] font-semibold leading-tight">
                Let's Work Together
              </div>
              <span className="text-sm sm:text-base md:text-[21px] text-white/80">
                adinn@gmail.com
              </span>
            </div>
          </div>

          <div className="w-full">
            <Image
              src={AdinnLogoFooter}
              className="rounded-[20px] sm:rounded-[28px] w-full h-auto"
              alt="card"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-[#121212] rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 md:p-7.5 w-full md:w-1/2 flex flex-col gap-6 sm:gap-6 md:gap-7">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
              NAME
            </label>
            <input className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white" />
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
              EMAIL
            </label>
            <input className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white" />
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-6 md:gap-8">
            <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                CONTACT NUMBER
              </label>
              <input className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white" />
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                WEBSITE (OPTIONAL)
              </label>
              <input className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white" />
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:space-y-4">
            <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
              MESSAGE
            </label>
            <textarea
              className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full min-h-[60px] resize-none text-white"
              rows={2}
            />
          </div>

          <div className="mt-3 sm:mt-auto pt-1 ">
            <button className="bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white w-full px-4 py-3 rounded-[20px] sm:rounded-[28px] hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base">
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {FooterLogos.map((logo, index) => (
            <div
              key={index}
              className="w-full h-[50px] sm:h-[70px] md:h-[80px] bg-[#121212] rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-white text-[12px] sm:text-sm md:text-[14.53px] text-center mt-6 sm:mt-10 md:mt-12">
        © designed & developed by TIC GLOBAL.
      </div>
    </div>
  );
};

export default Footer;

