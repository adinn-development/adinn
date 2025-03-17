import React from 'react'
import Hero from '@/components/AboutUs/Hero'
import Content from '@/components/AboutUs/Content'
import CoreValues from '@/components/AboutUs/CoreValues'
import Footer from '@/components/ReUsableComponents/Footer'
import Achievements from '@/components/AboutUs/Achievements'
import ShowCase from '@/components/AboutUs/ShowCase'
import VideoBanner from '@/components/AboutUs/VideoBanner'  

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
