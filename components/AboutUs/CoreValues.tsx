import React from 'react'
import { Reliability, Respect, Excellence, Integrity, Innovation, Teamwork } from '@/components/reusable-components/Icons/Icons'
import Image from 'next/image'

const CoreValues = () => {
    const contents = [
        {
            title: 'Reliability',
            description: 'We delivers on our promises and ensure our clients can depend on us to drive results.',
            image: Reliability
        },
        {
            title: 'Respect',
            description: 'We value every client, partner and team member, fostering collaboration and inclusive ideas',
            image: Respect
        },
        {   
            title: 'Excellence',
            description: ' We set high standards in strategy, creativity and execution to achieve measurable success.',
            image: Excellence
        },
        {
            title: 'Integrity',
            description: ' We operate transparently and ethically, building trust through accountability and honesty.',
            image: Integrity
        },
        {
            title: 'Innovation',
            description: ' We leverage creativity and forward thinking solutions to stay ahead in a competitive market.',
            image: Innovation
        },
        {
            title: 'Teamwork',
            description: 'We combine strengths across our team and with clients to achieve optimal business outcomes.',
            image: Teamwork
        }
    ]
    
    return (
        <div className="px-4 sm:px-6 md:px-8 py-12 mt-30">
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
