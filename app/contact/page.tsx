import Script from 'next/script'
import ContactFooter from '@/components/Contact/ContactFooter'
import Form from '@/components/Contact/Form'
import Message from '@/components/Contact/Message'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Adinn Advertising | Madurai, Chennai, Bangalore, Coimbatore',
  description: 'Get in touch with Adinn Advertising Services. Offices in Madurai, Chennai, Bangalore, and Coimbatore. Call or email us today.',
  alternates: {
    canonical: 'https://www.adinn.com/contact',
  },
}

const locations = [
  {
    id: "madurai",
    streetAddress: "29, 1st Cross Street, Vanamamalai Nagar, Bypass road,",
    addressLocality: "Madurai",
    postalCode: "625010",
  },
]

const page = () => {
  return (
    <div>
      {locations.map((loc) => (
        <Script
          key={loc.id}
          id={`localbusiness-schema-${loc.id}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Adinn Advertising Services Ltd",
              "image": "https://www.adinn.com/_next/static/media/AdinnLogo.80d7c577.svg",
              "@id": `https://www.adinn.com/#localbusiness-${loc.id}`,
              "url": "https://www.adinn.com/",
              "telephone": "+918015806062",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.streetAddress,
                "addressLocality": loc.addressLocality,
                "postalCode": loc.postalCode,
                "addressCountry": "IN",
                "addressRegion": "IN-TN"
              },
              "sameAs": [
                "https://www.facebook.com/AdinnAdvertisingServicesLtd",
                "https://www.instagram.com/adinnadvertising/",
                "https://www.linkedin.com/company/adinn-advertising-service-pvt-ltd-/",
                "https://www.youtube.com/channel/UCAnRMAjYwSv_g90SYa5vdXw"
              ],
              "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                "opens": "09:30",
                "closes": "18:30"
              }]
            }),
          }}
        />
      ))}
      <Form />
      <Message />
    {/* <ContactFooter />  */}
    </div>
  )
}

export default page
