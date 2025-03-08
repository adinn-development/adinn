import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { IPLLogo, HaierLogo, MalabarLogo, TVSLogo } from "@/components/ReUsableComponents/Icons/Icons";

const LandingProjects = () => {
    const images = [
        {
           image: TVSLogo,
           name: "TVS",
           link: "https://www.tvs.com/"
        },
        {
           image: HaierLogo,
           name: "Haier",
           link: "https://www.haier.com/"
        },
        {
            image: IPLLogo,
            name: "IPL",
            link: "https://www.ipl.com/"
        },
        {
            image: MalabarLogo,
            name: "Malabar",
            link: "https://www.malabar.com/"
        }
    ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-8 gap-4 md:gap-0">
        <div className="flex flex-row items-center justify-start space-x-2 md:space-x-3">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold">OUR</div>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
            Projects
          </div>
        </div>

        <div className="text-sm md:text-base lg:text-[17px]">
          Explore the exclusive advantages of partnering with <br className="hidden md:block" /> Adorn for
          all your creative needs.
        </div>
      </div>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12 w-full max-w-[1600px]">
        {images.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 md:gap-4">
            <div className="bg-white shadow-lg w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[690px] rounded-2xl md:rounded-4xl overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover sm:object-fill rounded-2xl md:rounded-4xl w-full h-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 40vw, 624px"
                  priority={index < 2}
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full px-2 sm:px-4 md:px-6">
              <h3 className="text-base sm:text-lg md:text-[20px] font-semibold">{item.name}</h3>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-[#AFB0B6] hover:text-gray-800 transition-colors cursor-pointer z-10 relative p-2"
              >
                <span className="hidden sm:inline">Visit Project</span>
                <span className="sm:hidden">Visit</span>
                <GoArrowUpRight className="text-[#AFB0B6] group-hover:text-gray-800 transition-colors w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingProjects;