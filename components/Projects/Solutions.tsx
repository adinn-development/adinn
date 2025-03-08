import React from "react";
import {
  ProjectImage1,
  ProjectImage2,
} from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";


const images = [
  {
    id: 1,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 2,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 3,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 4,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 5,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 6,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 7,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  { 
    id: 8,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 9,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
];

const Solutions = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-start px-4 sm:px-6 lg:px-20 gap-4 md:gap-3 py-8 md:py-12 ">
        <div className="text-[40px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold ">
          Outdoor Media
        </div>
        <div className="text-[40px] sm:text-[60px] md:text-[96px] ml-2 instrument-font text-[#CF1E00] font-serif italic">
          Solutions
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-20 mt-[80px]">
        {images.map((item, index) => (
          <Link
            href={`/projects/${item.id}`}
            key={item.id}
            className="block group cursor-pointer"
          >
            <div className="bg-white shadow-lg w-full h-[300px] rounded-2xl overflow-hidden
                         relative transform hover:scale-[1.02] transition-transform duration-300 ease-out">
              <Image
                src={item.image}
                alt={item.alt}
                className="w-full h-full rounded-2xl object-cover"
                priority={index < 3}
                loading={index >= 3 ? "lazy" : "eager"}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-[24px] font-bold">{item.name}</h3>
                  <p className="text-[14px] text-[#AFB0B6]">{item.description}</p>
                </div>
                <div>
                  <FiArrowRight className="w-5 h-5 text-white group-hover:text-[#CF1E00] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Solutions); // Memoize the component to prevent unnecessary re-renders
