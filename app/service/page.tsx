import Hero from '@/components/service/Hero'
import Content from '@/components/service/Content'
import ServiceOffered from '@/components/service/ServiceOffered'
import Gallery from '@/components/service/Gallery'
import Footer from '@/components/ReUsableComponents/Footer'
import LandingDreamProject from '@/components/Home/DreamProject'


const page = () => {
  return (
    <div>
      <Hero />
      {/* <Content /> */}
      <ServiceOffered />
      <Gallery />
      
      <div className='lg:mt-40 lg:mb-40 mt-10 mb-10'>
        <LandingDreamProject />

      </div>
      <Footer />
    </div>
  )
}

export default page
