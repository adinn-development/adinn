import React from "react";
import Image from "next/image";
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
      <div className="flex flex-col items-center h-screen p-2">
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
        
        <div className="grid grid-cols-2 gap-8 p-4 w-full max-w-6xl">
          {images.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <div className="w-[300px] h-[400px] relative mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingProjects;