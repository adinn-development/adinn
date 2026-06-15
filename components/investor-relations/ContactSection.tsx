


import { User, Building2 } from "lucide-react"

const CONTACTS = [
  {
    icon: User,
    title: "Company Secretary & Compliance Officer",
    email: "investor@adinn.com",
    phone: "+91 00000 00000",
  },
  {
    icon: Building2,
    title: "Registrar & Transfer Agent",
    email: "registrar@rta.com",
    phone: "+91 00000 00000",
  },
]

export function ContactSection() {
  return (
    <div id="investor-contact" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB] sm:p-8">
      <h2 className="text-lg font-bold text-[#1A1A1A] sm:text-xl">
        Investor Contact
      </h2>

     
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTACTS.map((c) => (
          <div
            key={c.title}
            className="flex gap-4 rounded-xl border border-[#E5E7EB] p-4 sm:p-5"
          >
          
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FEF2F2] text-[#E11D2A] sm:h-14 sm:w-14">
              <c.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>

         
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="text-sm font-semibold leading-snug text-[#1A1A1A] sm:text-base">
                {c.title}
              </h3>

              <dl className="mt-2 space-y-1.5 text-sm">
              
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="shrink-0 text-[#6B7280]">Email</dt>
                  <span className="shrink-0 text-[#6B7280]">:</span>
                 
                  <dd className="break-all text-[#1A1A1A]">{c.email}</dd>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="shrink-0 text-[#6B7280]">Phone</dt>
                  <span className="shrink-0 text-[#6B7280]">:</span>
                  <dd className="text-[#1A1A1A]">{c.phone}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}