import Hero from '@/components/service/Hero'
import Content from '@/components/service/Content'
import ServiceOffered from '@/components/service/ServiceOffered'
import Gallery from '@/components/service/Gallery'
import Footer from '@/components/ReUsableComponents/Footer'
import LandingDreamProject from '@/components/Home/LandingDreamProject'

const page = () => {
  return (
    <div>
      <Hero />
      <Content />
      <ServiceOffered />
      <Gallery />
      <div className='md:mt-40 md:mb-40'>
        <LandingDreamProject />

      </div>
      <Footer />
    </div>
  )
}

export default page
