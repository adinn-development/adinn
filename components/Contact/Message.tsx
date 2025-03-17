import React from 'react'
import Image from 'next/image'
import CeoImage from '@/public/CeoImage.svg'
const Message = () => {
  return (
    <div>
<div className="md:text-[72px] text-24px   text-[#100F0F] font-bold leading-tight flex flex-row items-center justify-center mt-20 mb-5">
  A Message from&nbsp;
  <span className="text-[#CF1E00] italic instrument-font font-serif">Our CEO</span>
</div>


      <div className='flex flex-col items-center justify-center max-w-[900px] mx-auto'>
        <p className='text-center text-[#838489] text-[12px] md:text-[20px] font-medium '>
          " At Ad inn, we are committed to being the most reputable agency in the advertising<br />
          <span className='block text-center'>sector. Our mission is to consistently deliver reliable and impactful solutions that</span>
          exceed expectations, earning the respect of our clients and peers alike. "
        </p>
      </div>

      <div className='flex flex-row items-center justify-center mt-10 mb-10'>
        <Image src={CeoImage} alt="CEO" width={80} height={100} className='md:w-20 w-15'/>
        <div className='flex flex-col items-start justify-center ml-4'>
          <span className='text-[16px] md:text-[24px] text-[#0B0B0B]'>
            John Doe

          </span>
          <span className='text-[#838489] text-[12px] md:text-[18px]'>CEO, Adinn</span>
        </div>
      </div>
    </div>
  )
}

export default Message
