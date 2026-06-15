


import Image from "next/image"
import { ArrowRight, User } from "lucide-react"

const IPO_DETAILS = [
  { label: "Proposed Platform", value: "SME Listing" },
  { label: "Issue Type", value: "To be updated" },
  { label: "Face Value", value: "₹10 per share" },
  { label: "Price Band", value: "To be updated" },
  { label: "Lot Size", value: "To be updated" },
  { label: "Registrar", value: "To be updated" },
]

export default function Hero() {
  return (
   
    // <section className="relative overflow-hidden pt-20 lg:pt-24">
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-20 lg:pt-24">

      {/* Billboard image - right side on large screens */}
      {/* <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src="/images/billboard-hero.png"
          alt="Outdoor advertising billboard beside a city highway at sunset"
          fill
          priority
          className="object-cover object-left"
        />
      </div> */}

    
      {/* <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"> */}
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">

        
          <div className="flex flex-col">
            <h1 className="text-pretty text-5xl font-bold tracking-tight text-[#1A1A1A] sm:text-6xl">
              Investor Relations
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#6B7280]">
              Transparent communication, corporate disclosures and investor
              information.
            </p>

            <div className="mt-8 flex flex-col gap-4">
             
              <span className="inline-flex w-fit items-center gap-3 rounded-full bg-[linear-gradient(90deg,#EC2B45_0%,#861927_100%)] px-6 py-3 text-sm font-semibold text-white shadow-sm">
                Proposed SME IPO
                <span className="h-1 w-1 rounded-full bg-white/70" />
                Pre-Listing Stage
              </span>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              
                <a
                  href="#offer-documents"
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-[linear-gradient(90deg,#EC2B45_0%,#861927_100%)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105"
                >
                  View IPO Documents
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#investor-contact"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm transition-colors hover:bg-[#F9FAFB]"
                >
                  <User className="h-4 w-4" />
                  Investor Contact
                </a>
              </div>
            </div>
          </div>

       
          <div className="lg:flex lg:justify-start lg:items-center">
          
            <div className="w-full max-w-xs rounded-lg bg-white p-6 shadow-md border border-[#E5E7EB] sm:p-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                IPO Overview{" "}
                <span className="text-sm font-normal text-[#6B7280]">
                  (To be updated)
                </span>
              </h2>
              <dl className="mt-6 space-y-4">
                {IPO_DETAILS.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-2 text-sm"
                  >
                    <dt className="text-[#6B7280]">{item.label}</dt>
                    <span className="text-[#6B7280]">:</span>
                    <dd className="font-medium text-[#1A1A1A]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

        </div>
      </div>

    
      {/* <div className="relative h-56 w-full sm:h-72 lg:hidden">
        <Image
          src="/images/billboard-hero.png"
          alt="Outdoor advertising billboard beside a city highway at sunset"
          fill
          className="object-cover"
        />
      </div> */}
    </section>
  )
}

