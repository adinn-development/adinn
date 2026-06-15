
import { ArrowRight, FileText, BarChart3, ShieldCheck, User } from "lucide-react"

const CARDS = [
  {
    icon: FileText,
    title: "IPO Documents",
    desc: "Offer documents, notices and public issue related files.",
  },
  {
    icon: BarChart3,
    title: "Financial Information",
    desc: "Financial data, statements and reports.",
  },
  {
    icon: ShieldCheck,
    title: "Corporate Governance",
    desc: "Policies, board information and governance framework.",
  },
  {
    icon: User,
    title: "Investor Contact",
    desc: "Get in touch with our investor relations team.",
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => (
        <a
          key={card.title}
          href="#"
          className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB] transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#E11D2A]">
              <card.icon className="h-5 w-5" />
            </span>
            <h3 className="font-semibold text-[#1A1A1A]">{card.title}</h3>
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-[#6B7280]">
            {card.desc}
          </p>
          <ArrowRight className="mt-6 h-5 w-5 text-[#E11D2A] transition-transform group-hover:translate-x-1" />
        </a>
      ))}
    </div>
  )
}