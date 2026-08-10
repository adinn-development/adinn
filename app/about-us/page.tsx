import React from 'react'
import Hero from '@/components/AboutUs/Hero'
import Content from '@/components/AboutUs/Content'
import CoreValues from '@/components/AboutUs/CoreValues'
import Footer from '@/components/reusable-components/Footer'
import Achievements from '@/components/AboutUs/Achievements'
import ShowCase from '@/components/AboutUs/ShowCase'
import VideoBanner from '@/components/AboutUs/VideoBanner'  
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Adinn | 24+ Years of Advertising Excellence in Madurai, Tamil Nadu',
  description: 'Learn about Adinn Advertising Services — a full-service marketing agency with 24+ years of experience serving brands across South India.',
  alternates: {
    canonical: 'https://www.adinn.com/about-us',
  },
}


const page = () => {
  return (
    <div className='overflow-x-hidden'>
     <Hero />
     <Content />
     <Achievements />
     <VideoBanner />
     <CoreValues />
     <ShowCase />
     <div className='mt-10 md:mt-50'>
    
     <Footer />  

     </div>
    </div>
  )
}

export default page
