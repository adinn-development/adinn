import Contents from '@/components/Projects/Contents'
import Hero from '@/components/Projects/Hero'
import Solutions from '@/components/Projects/Solutions'
import Footer from '@/components/ReUsableComponents/Footer'
import LandingDreamProject from '@/components/Home/LandingDreamProject'

const page = () => {
  return (
    <div>
      <Hero />
      {/* <Contents /> */}
      <Solutions />
      <div className='md:mt-50 md:mb-50 mt-10 mb-20'>
      <LandingDreamProject />
      </div>
      <Footer />    
    </div>
  )
}

export default page
