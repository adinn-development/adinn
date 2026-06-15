
import { ArrowRight, Users, UsersRound, FileText } from "lucide-react"

const ITEMS = [
  { icon: Users, label: "Board of Directors" },
  { icon: UsersRound, label: "Board Committees" },
  { icon: FileText, label: "Policies" },
]

export function GovernanceSection() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB] sm:p-8">
      <h2 className="text-lg font-bold text-[#1A1A1A] sm:text-xl">
        Corporate Governance{" "}
        <span className="text-sm font-normal text-[#6B7280]">(To be updated)</span>
      </h2>
      <div className="mt-6 grid divide-y divide-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-y-0">
        {ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className="group flex items-center justify-between gap-3 py-4 md:px-8 md:py-2 md:first:pl-0"
          >
            <span className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-[#E11D2A]" />
              <span className="text-sm font-medium text-[#1A1A1A]">{item.label}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-[#E11D2A] transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </div>
    </div>
  )
}