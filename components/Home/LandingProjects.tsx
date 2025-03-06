import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import {IPLLogo,HaierLogo,MalabarLogo,TVSLogo} from "@/components/ReUsableComponents/Icons/Icons";
const LandingProjects = () => {
    console.log("TVS Logo source:", TVSLogo);
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
    ]

  return (
    <div>
      <div className="flex flex-col items-center p-2">
        <div className="w-full flex flex-row items-center justify-between mb-8">
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="text-[96px] tracking-[-4px] font-bold">OUR</div>
            <div className="text-[96px] instrument-font text-[#CF1E00] font-serif italic">
              Projects
            </div>
          </div>

          <div className="text-[17px]">
            Explore the exclusive advantages of partnering with <br /> Adorn for
            all your creative needs.
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1600px] px-4">
          {images.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="bg-white shadow-lg w-[624px] h-[690px] rounded-4xl">
                <div className="w-full h-full relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-fill rounded-4xl w-full h-full"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-between w-full px-6">
                <h3 className="text-[20px] font-semibold">{item.name}</h3>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#AFB0B6] hover:text-gray-800 transition-colors"
                >
                  Visit Project <GoArrowUpRight className="text-[#AFB0B6] transition-colors group-hover:text-gray-800" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingProjects;