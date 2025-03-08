import React from 'react'
import Image from 'next/image'
import {Innovation} from '@/components/ReUsableComponents/Icons/Icons'

const LandingDreamProject = () => {
  return (
    <div>
      <div className="flex flex-col mt-10 p-10">
        <div className="rounded-[25px] w-full h-[462px] relative overflow-hidden"
         style={{
          background: 'linear-gradient(155deg, #EC2B45 0%, #BE3234 60%, #790619 100%)'
        }}>
          <div className="absolute left-[2.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
            <Image 
              src={Innovation} 
              alt="Dream Project"
              className="w-[419px] h-[473px]"
              priority
            />
          </div>
          <div className="absolute top-18 right-35">
            <Image 
              src={Innovation} 
              alt="Dream Project"
              className="w-[91px] h-[103px] blur-[3px]"
              priority
            />
          </div>
          <div className="flex flex-col mt-30 pl-50 -space-y-0">
            <h2 className="text-[80px] text-white leading-none">Let's Build Your </h2>
            <h2 className="text-[80px] instrument-font text-white font-serif italic leading-none">Dream Project</h2>
          </div>

          <div className="absolute bottom-8 right-8 text-white">
            <p className="text-[17px] opacity-80 text-right">
              Our team is here to help you succeed.<br />
              Let's work together to achieve your goals and elevate<br />
              your brand to new heights.
            </p>
            <div className="flex justify-end mt-4">
              <button className='bg-white px-10 py-3 text-black text-[16px] rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105'>
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingDreamProject
