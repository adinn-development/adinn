import React from 'react'
import { Reliability, Respect, Excellence, Integrity, Innovation, Teamwork } from '@/components/ReUsableComponents/Icons/Icons'
import Image from 'next/image'

const CoreValues = () => {
    const contents = [
        {
            title: 'Reliability',
            description: 'We are committed to delivering on our promises and being a dependable partner for our clients.',
            image: Reliability
        },
        {
            title: 'Respect',
            description: 'We treat our clients, colleagues, and work with the utmost respect, valuing diverse perspectives and fostering  inclusive collaboration.',
            image: Respect
        },
        {   
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, setting high standards for creativity, innovation, and results.',
            image: Excellence
        },
        {
            title: 'Integrity',
            description: 'We conduct ourselves with honesty and transparency, earning trust through ethical practices and accountability.',
            image: Integrity
        },
        {
            title: 'Innovation',
            description: 'We embrace creativity and forward-thinking, constantly seeking new and impactful ways to engage audiences  and drive results.',
            image: Innovation
        },
        {
            title: 'Teamwork',
            description: 'We believe in the power of collaboration, working together seamlessly to achieve success for our clients and  agency.',
            image: Teamwork
        }
    ]
    
    return (
        <div className="px-4 sm:px-6 md:px-8 py-12 mt-30 md:mt-50">
            <div className="flex flex-col items-center p-2 mg-5 md:mb-12">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8">
  {/* This container needs centering in sm/md */}
  <div className="flex flex-row text-center justify-center sm:justify-center md:text-left lg:text-left gap-2 md:gap-3 whitespace-nowrap">
    <div className="text-[24px] sm:text-[96px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold whitespace-nowrap">
      Our Core
    </div>
    <div className="text-[24px] sm:text-[96px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
      Values
    </div>
  </div>
  <div className="hidden sm:block md:block lg:block text-[14px] sm:text-[15px] md:text-[17px] max-w-[400px]">
    Explore the exclusive advantages of partnering <br />
    with Adorn for all your creative needs.
  </div>
</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {contents.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative overflow-hidden flex flex-col justify-end min-h-[320px] sm:min-h-[360px] 
                                 border-[#E7E5E5] rounded-2xl border p-6 sm:p-8
                                  hover:border-[#EC2B45] hover:shadow-sm hover:shadow-[#EC2B45]/20
                                     hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                    >
                        <div className="absolute top-[-27%] right-[-33%] w-[80%] h-[80%]">
                            <Image 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Content at bottom */}
                        <div className="relative z-10">
                            <h3 className="text-[#BE3234] text-[24px] sm:text-[32px] md:text-[40px] 
                                         font-semibold mb-3 sm:mb-4">
                                {item.title}
                            </h3>
                            <p className="text-[#616365] text-[14px] sm:text-[15px] md:text-[17px] 
                                        leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoreValues
