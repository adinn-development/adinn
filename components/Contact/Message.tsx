"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CeoImage from '@/public/CeoImage.svg'
import { gsap } from 'gsap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Message = () => {
  const contents = [
    {
      name: 'John Doe',
      tag: 'our CEO',
      designation: 'CEO, Adinn',
      message: 'At Adinn, we are committed to being the most reputable agency in the advertising sector. Our mission is to consistently deliver reliable and impactful solutions that exceed expectations, earning the respect of our clients and peers alike.'
    },
    {
      name: 'Mike Ross',
      tag: 'our Director',
      designation: 'Director, Adinn',
      message: 'At Adinn, we are committed to being the most reputable agency in the advertising sector. Our mission is to consistently deliver reliable and impactful solutions that exceed expectations, earning the respect of our clients and peers alike.'
    },
    {
      name: 'Frank',
      tag: 'our Manager',
      designation: 'Manager, Adinn',
      message: 'At Adinn, we are committed to being the most reputable agency in the advertising sector. Our mission is to consistently deliver reliable and impactful solutions that exceed expectations, earning the respect of our clients and peers alike.'
    }
  ]

  const [currentTag, setCurrentTag] = useState(contents[0].tag);
  const messageRef = useRef<(HTMLDivElement | null)[]>([]);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(messageRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const settings = {
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (current: number, next: number) => {
      setCurrentTag(contents[next].tag);
    },
  };

  return (
    <div className="slider-container">
      <div className="flex flex-col items-center">
      <div 
          className="md:text-[72px] text-3xl text-[#100F0F] font-bold leading-tight text-center mt-20 mb-5 mx-auto md:ml-15 ml-15 lg:ml-72 "
          ref={tagContainerRef}
        >
          <div className="relative  inline-block mx-auto justify-center items-center">
            <span>A Message from </span>
            <span className="absolute  text-[#CF1E00] italic instrument-font font-serif min-w-[120px] inline-block text-left whitespace-nowrap pl-2">
              {currentTag}
            </span>
          </div>
        </div>
      </div>
      
      <Slider {...settings}>
        {contents.map((content, index) => (
          <div 
            key={index} 
            className="message-slide" 
            ref={(el) => { messageRef.current[index] = el; }}
          >
            <div className='flex flex-col items-center justify-center max-w-[900px] mx-auto px-4'>
              <p className='text-center text-[#838489] text-sm md:text-xl font-medium'>
                "{content.message}"
              </p>
            </div>

            <div className='flex flex-row items-center justify-center mt-10 mb-10'>
              <Image 
                src={CeoImage} 
                alt={content.name} 
                width={80} 
                height={100} 
                className='w-16 md:w-20'
              />
              <div className='flex flex-col items-start justify-center ml-4'>
                <span className='text-base md:text-2xl text-[#0B0B0B]'>
                  {content.name}
                </span>
                <span className='text-[#838489] text-xs md:text-lg'>
                  {content.designation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Message