


import { FileText } from "lucide-react"
import documentsData from "../../data/document.json"

type DocItem = { title: string; status: string; url: string }

function DocRow({ item }: { item: DocItem }) {
  const hasUrl = item.url && item.url.trim() !== ""

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] py-4 last:border-0">
      <div className="flex min-w-0 items-center gap-3">
        <FileText className="h-5 w-5 shrink-0 text-[#E11D2A]" />
        <span className="text-sm font-medium text-[#1A1A1A]">{item.title}</span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden text-xs text-[#6B7280] sm:inline">{item.status}</span>

        {hasUrl ? (
        
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#E11D2A] bg-[#E11D2A] px-3 py-1 text-xs font-semibold text-white hover:bg-[#c01020] transition-colors"
          >
            PDF
          </a>
        ) : (
       
          <span className="rounded-md border border-[#E11D2A]/40 px-3 py-1 text-xs font-semibold text-[#E11D2A] opacity-50 cursor-not-allowed">
            PDF
          </span>
        )}
      </div>
    </div>
  )
}

function DocCard({
  title,
  items,
  footer,
}: {
  title: string
  items: DocItem[]
  footer: string
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB] sm:p-8">
      <h2 className="text-lg font-bold text-[#1A1A1A] sm:text-xl">
        {title}{" "}
        <span className="text-sm font-normal text-[#6B7280]">(To be updated)</span>
      </h2>
      <span className="mt-3 block h-1 w-10 rounded-full bg-[#E11D2A]" />
      <div className="mt-2 flex-1">
        {items.map((item) => (
          <DocRow key={item.title} item={item} />
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[#6B7280]">{footer}</p>
    </div>
  )
}

export function DocumentsSection() {
  return (
    <div id="offer-documents" className="grid gap-4 lg:grid-cols-2">
      <DocCard
        title={documentsData.offerDocuments.title}
        items={documentsData.offerDocuments.items}
        footer={documentsData.offerDocuments.footer}
      />
      <DocCard
        title={documentsData.financialInformation.title}
        items={documentsData.financialInformation.items}
        footer={documentsData.financialInformation.footer}
      />
    </div>
  )
}
