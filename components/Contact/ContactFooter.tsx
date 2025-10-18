"use client";
import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  AdinnLogoFooter,
} from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import ContactFooterImage from "@/public/ContactFooterImage.svg";

const ContactFooter = () => {
  const FooterLogos = [
    { src: FacebookLogo, alt: "Facebook" },
    { src: InstagramLogo, alt: "Instagram" },
    { src: TwitterLogo, alt: "Twitter" },
    { src: YoutubeLogo, alt: "Youtube" },
  ];

  return (
    <div className="bg-[#0C0C0C] w-full lg:h-[630px] h-auto px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 mt-10">
      
      {/* Top Section (Image + Logo) */}
      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10">
        
        {/* Left Image Block */}
        <div className="w-full md:w-1/2 relative md:h-[400px] lg:h-auto">
          <Image
            src={ContactFooterImage}
            alt="Contact"
            className="w-full h-auto md:h-full rounded-[20px] sm:rounded-[24px] md:rounded-[28px] object-cover"
            priority
          />

          {/* Top Text */}
          <div className="absolute top-6 sm:top-8 md:top-10 lg:top-12 left-4 sm:left-6 md:left-10 lg:left-16">
            <div className="md:hidden text-white text-[20px] sm:text-[26px] md:text-[30px] lg:text-[35px] font-semibold leading-tight">
              Let&apos;s Work Together
            </div>
          </div>

          {/* Middle Text */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-10 lg:left-16 flex flex-col gap-1 sm:gap-2 md:gap-3 text-white/80 text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px] max-w-[85%] sm:max-w-[75%]">
            <div>Email: webadmin@adinn.co.in</div>
            <div>Phone No.: 144 - 23940193</div>
            <div>Address: 123 Innovation Drive, Tech City, TC 12345</div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 lg:bottom-12 left-4 sm:left-6 md:left-10 lg:left-16">
            <div className="md:hidden text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-white">
              © designed & developed by{" "}
              <a
                href="https://www.theinternetcompany.one/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                TIC GLOBAL
              </a>
            </div>
          </div>
        </div>

        {/* Right Logo Block */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end md:h-[400px] lg:h-auto">
          <Image
            src={AdinnLogoFooter}
            alt="Adinn Logo"
            className="w-[90%] sm:w-[85%] md:w-full md:h-full h-auto object-contain rounded-[20px] sm:rounded-[24px] md:rounded-[28px]"
            priority
          />
        </div>
      </div>

      {/* Social Icons Grid */}
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[700px] mx-auto">
          {FooterLogos.map((logo, index) => (
            <div
              key={index}
              className="w-full h-[48px] sm:h-[60px] md:h-[70px] lg:h-[80px] bg-[#121212] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-white text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-center mt-8 sm:mt-10 md:mt-12">
        © designed & developed by{" "}
        <a
          href="https://www.theinternetcompany.one/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          TIC GLOBAL
        </a>
      </div>
    </div>
  );
};

export default ContactFooter;