import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  Card,
  AdinnLogoFooter,
} from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import ContactFooterImage from "@/public/ContactFooterImage.svg"
import { div } from "framer-motion/client";
const ContactFooter = () => {
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
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-7">
        {/* Left Section */}
        <div className="w-full md:w-[48%]">
  <div className="relative w-full h-full">
    <Image
      src={ContactFooterImage}
      alt="card"
      className="w-full h-full object-cover rounded-[20px] sm:rounded-[28px]"
    />

    {/* Top Text */}
    <div className="absolute top-8 sm:top-12 md:top-15 left-4 sm:left-8 md:left-16">
      <div className="text-white text-[24px] sm:text-[28px] md:text-[35px] font-semibold leading-tight">
        Let&apos;s Work Together
      </div>
    </div>

    {/* Middle Content */}
    <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-16 flex flex-col gap-2 text-white/80 text-[14px] sm:text-[16px]">
      <div>Email: Adin123@gmail.com</div>
      <div>Phone No.: 144 - 23940193</div>
      <div>Address: 123 Innovation Drive, Tech City, TC 12345</div>
    </div>

    {/* Bottom Text */}
    <div className="absolute bottom-8 sm:bottom-12 md:bottom-18 left-4 sm:left-8 md:left-16">
      <div className="text-[12px] sm:text-[14px] md:text-[15px] text-white">
        © designed & developed by TIC GLOBAL
      </div>
    </div>
  </div>
</div>

        {/* Right Section */}
        <div className="w-full md:w-[48%]">
          <Image
            src={AdinnLogoFooter}
            alt="card"
            className="w-full h-full object-cover rounded-[20px] sm:rounded-[28px]"
          />
        </div>
      </div>

      {/* Social Icons Section */}
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
    </div>
  );
}

export default ContactFooter;
