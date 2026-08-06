import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AdinnLogo } from "../reusable-components/Icons/Icons";

const Hero = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-[#861927] via-[#BE3234] to-[#1D1D1F] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-36 sm:pt-40 md:pt-48 lg:pt-52 pb-16 sm:pb-20 md:pb-24">
        {/* Logo + Company name */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <Image
            src={AdinnLogo}
            alt="Adinn Logo"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10"
          />
          <span className="text-white text-[18px] sm:text-[20px] font-semibold tracking-wide">
            Adinn
          </span>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-2 text-[13px] sm:text-[14px] text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2" aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li className="text-white font-medium" aria-current="page">
              Delete Account
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-white font-bold text-[32px] xs:text-[36px] sm:text-[48px] md:text-[58px] leading-tight max-w-3xl">
          Delete Your{" "}
          <span className="instrument-font font-serif italic">Account</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-[15px] sm:text-[18px] md:text-[20px] mt-4 sm:mt-5 max-w-2xl leading-relaxed">
          Request permanent deletion of your Adinn account and associated
          personal information.
        </p>
      </div>
    </div>
  );
};

export default Hero;
