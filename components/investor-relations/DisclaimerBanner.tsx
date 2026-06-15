
import { Info } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#E5E7EB] sm:p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#E11D2A] text-[#E11D2A]">
        <Info className="h-5 w-5" />
      </span>
      <p className="text-sm leading-relaxed text-[#6B7280] sm:text-base">
        The proposed public issue is subject to applicable approvals. Please
        refer to the official offer documents for complete information.
      </p>
    </div>
  )
}