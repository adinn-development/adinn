
import Hero1 from '@/components/service/Hero1'
// import Content from '@/components/service/Content'
import ServiceOffered from '@/components/service/ServiceOffered'
import Gallery from '@/components/service/Gallery'
import Footer from '@/components/reusable-components/Footer'
// import LandingDreamProject from '@/components/Home/DreamProject'
import Careers from "@/components/careers/careers";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Adinn | Join Our Advertising & Marketing Team',
  description: 'Explore career opportunities at Adinn Advertising Services in Madurai. Join a team driving creative advertising across South India.',
  alternates: {
    canonical: 'https://www.adinn.com/careers',
  },
}

const page = () => {
  return (
    <div>
      <Hero1 />
      {/* <Content /> */}
    
      
      <div className='mb-20'>
<Careers />
      </div>
      <Footer />
    </div>
  )
}

export default page
