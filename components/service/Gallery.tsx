import React from 'react'
import Image from 'next/image'
import {Gallery1, Gallery2, Gallery3, Gallery4, HandImage} from '@/components/ReUsableComponents/Icons/Icons'

const Gallery = () => {

    const images = [
        {
            image: Gallery1,
            title: '3D & Cut - Out',
            description: 'Dindugal Thalappakatti',
        },
        {
            image: Gallery2,
            title: 'Geo Targeting',
            description: 'Malabar',
        },
        {
            image: Gallery3,
            title: 'Dynamic Lighting',
            description: 'Nippon Paint',
        },
        {
            image: Gallery4,
            title: 'Wall Painting',
            description: 'Nippon Paint',
        },
       
    ]
  return (
    <div>
     <div className="flex flex-col md:flex-row items-center justify-start px-4 sm:px-6 lg:px-20 gap-4 md:gap-3 py-8 md:py-12">
        <div className="text-[40px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold text-[#C6C6CB]">
          Projects
        </div>
        <Image src={HandImage} alt="Hand" className='w-[160px] md:w-[219px] h-auto' />
        <div className="text-[40px] sm:text-[60px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
          Gallery
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1600px] px-4 sm:px-6 lg:px-20">
          {images.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col gap-4 ${
                index === 0 || index === 2 ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-1'
              }`}
            >
              <div className="bg-white shadow-lg w-full h-[300px] sm:h-[400px] lg:h-[465px] rounded-2xl lg:rounded-4xl">
                <div className="w-full h-full relative">
                  <Image
                    src={item.image || ''}
                    alt={item.title || ''}
                    fill
                    className="object-cover rounded-2xl lg:rounded-4xl w-full h-full"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-4">
                <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">{item.title}</h3>
                <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>


    </div>
  )
}

export default Gallery
