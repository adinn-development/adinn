import React from "react";
import { Send, ShieldCheck, Search, Trash2, type LucideIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: "Request Submitted",
    description: "You submit a deletion request via the app or email.",
    icon: Send,
  },
  {
    title: "Verification",
    description: "We verify your identity and ownership of the account.",
    icon: ShieldCheck,
  },
  {
    title: "Account Review",
    description: "Your account and linked data are reviewed for deletion.",
    icon: Search,
  },
  {
    title: "Account Deleted",
    description: "Your account and personal data are permanently removed.",
    icon: Trash2,
  },
];

const ProcessTimeline = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          What Happens After Your{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Request?
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.title} className="relative flex md:flex-col gap-4 md:gap-0 md:items-center md:text-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#EC2B45] shadow-md flex items-center justify-center shrink-0 z-10">
                    <Icon size={22} className="text-[#EC2B45]" />
                  </div>
                  {!isLast && (
                    <>
                      <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-28px)] h-px bg-[#EC2B45]/25" />
                      <div className="md:hidden w-px flex-1 min-h-[32px] bg-[#EC2B45]/25 mt-1" />
                    </>
                  )}
                </div>
                <div className="pt-1 md:pt-4">
                  <p className="text-[12px] font-semibold text-[#EC2B45] mb-1">
                    Step {index + 1}
                  </p>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#6A6B6D] leading-relaxed md:max-w-[200px] md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-[14px] sm:text-[15px] text-[#444349]">
          Estimated processing time:{" "}
          <span className="font-semibold text-[#1D1D1F]">
            within 7 business days
          </span>{" "}
          from the date of verification.
        </p>
      </div>
    </section>
  );
};

export default ProcessTimeline;
