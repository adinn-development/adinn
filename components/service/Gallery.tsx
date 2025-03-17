import React from 'react'
import Image from 'next/image'
import { Gallery1, Gallery2, Gallery3, Gallery4, HandImage } from '@/components/ReUsableComponents/Icons/Icons'
import Link from 'next/link'

const Gallery = () => {
  return (
    <div className="flex flex-col items-center mt-30">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 py-8 md:py-12">
        <div className="text-[40px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold text-[#C6C6CB]">
          Projects
        </div>
        <Image src={HandImage} alt="Hand" width={219} height={219} className="w-[160px] md:w-[219px] h-auto" />
        <div className="text-[40px] sm:text-[60px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
          Gallery
        </div>
      </div>

      <div className="bg-black grid grid-cols-1 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          {/* First Row */}
          <div className="flex flex-row gap-4 w-full">
            <div className="text-center w-[70%]">
              <div className="w-full h-[465.5px] aspect-square overflow-hidden">
                <Image 
                  src={Gallery1} 
                  alt="Gallery1" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">3D & Cut - Out</h3>
              <p className="text-sm text-gray-600">Dindugal Thalappakatti</p>
            </div>
            <div className="text-center w-[30%]">
              <div className="max-w-[900px] h-[465.5px]  aspect-square rounded-[16px]">
                <Image 
                  src={Gallery2} 
                  alt="Gallery2" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Malabar</p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-row gap-4 w-full">
            <div className="text-center w-[70%]">
              <div className="w-full h-[465.5px] aspect-square overflow-hidden">
                <Image 
                  src={Gallery3} 
                  alt="Gallery3" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">Dynamic Lighting</h3>
              <p className="text-sm text-gray-600">Nippon Paint</p>
            </div>
            <div className="text-center w-[40%]">
              <div className="w-full h-[465.5px] aspect-square overflow-hidden">
                <Image 
                  src={Gallery4} 
                  alt="Gallery4" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">Wall Painting</h3>
              <p className="text-sm text-gray-600">Nippon Paint</p>
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
  )
}

export default Gallery
