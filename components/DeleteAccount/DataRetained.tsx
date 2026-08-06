import React from "react";
import { FileText, Calculator, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";

interface RetainedItem {
  title: string;
  icon: LucideIcon;
}

const items: RetainedItem[] = [
  { title: "Financial Records", icon: FileText },
  { title: "Accounting Records", icon: Calculator },
  { title: "Audit Logs", icon: ScrollText },
  { title: "Legal Compliance Data", icon: ShieldCheck },
];

const DataRetained = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          Data That May Be{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Retained
          </span>
        </h2>
        <p className="mt-4 text-[15px] sm:text-[17px] text-[#444349] text-center leading-relaxed">
          Certain records may be retained even after your account is deleted,
          if required by applicable law or for legitimate business
          compliance, such as:
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-4 bg-[#FFFBF0] border border-[#F0E0B8] rounded-2xl p-5"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#F5A623]/15 flex items-center justify-center">
                  <Icon size={20} className="text-[#B4790A]" />
                </div>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#1D1D1F]">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-[14px] sm:text-[15px] text-[#6A6B6D] text-center leading-relaxed">
          Retained data is stored only for the period legally required, is
          kept strictly for compliance purposes, and is not used for any
          other purpose. Once the retention period expires, this data is
          securely deleted.
        </p>
      </div>
    </section>
  );
};

export default DataRetained;
