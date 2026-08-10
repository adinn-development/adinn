import Script from 'next/script'
import Hero from '@/components/service/Hero'
import Content from '@/components/service/Content'
import ServiceOffered from '@/components/service/ServiceOffered'
import Gallery from '@/components/service/Gallery'
import Footer from '@/components/reusable-components/Footer'
import LandingDreamProject from '@/components/Home/DreamProject'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Roadshow, OOH Media, Signage & Event Marketing - Adinn',
  description: "Explore Adinn's advertising services: roadshow campaigns, OOH media, signage, events & activations, digital marketing, and more.",
  alternates: {
    canonical: 'https://www.adinn.com/service',
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.adinn.com/service",
  "name": "Adinn Advertising Services Ltd",
  "alternateName": "Advertising Agency",
  "description": "Adinn Advertising Services Ltd provides end-to-end advertising and branding solutions including Outdoor Advertising, OOH Media, Roadshows, Retail Branding, Digital Marketing, Signage, Events & Activations, Fixtures, POP Printing, Offset Printing and Wall Painting services across South India.",
  "url": "https://www.adinn.com/service",
  "provider": { "@id": "https://www.adinn.com/#localbusiness" },
  "serviceType": [
    "Outdoor Advertising", "OOH Media", "Roadshows", "Digital Marketing",
    "Retail Branding", "Signage", "Events & Activations", "Retail Fixtures",
    "POP Printing", "Offset Printing", "Wall Painting", "Branding Solutions"
  ],
  "category": "Advertising Agency",
  "audience": { "@type": "BusinessAudience", "audienceType": "Businesses" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "State", "name": "Karnataka" },
    { "@type": "State", "name": "Kerala" },
    { "@type": "State", "name": "Andhra Pradesh" },
    { "@type": "State", "name": "Telangana" }
  ]
}


const page = () => {
  return (
    <div>
       <Script
        id="service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
