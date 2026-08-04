import React from "react";
import { UserRound, Settings, Trash2, Mail } from "lucide-react";

const appSteps = [
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings },
  { label: "Delete Account", icon: Trash2 },
];

const MAILTO =
  "mailto:support@adinn.com?subject=" + encodeURIComponent("Delete My Account");

const RequestMethods = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16 bg-[#FBF9FF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          How to Request Account{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Deletion
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Method 1: In-App */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
            <span className="inline-block text-[12px] font-semibold tracking-[1.5px] text-[#EC2B45] uppercase mb-4">
              Method 1
            </span>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1D1D1F] mb-6">
              Inside the Mobile App
            </h3>

            <div className="flex flex-col">
              {appSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === appSteps.length - 1;
                return (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#EC2B45] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[24px] bg-[#EC2B45]/30" />
                      )}
                    </div>
                    <div className={isLast ? "pb-0" : "pb-6"}>
                      <p className="text-[15px] sm:text-[16px] font-medium text-[#1D1D1F] pt-2">
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Method 2: Email */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 flex flex-col">
            <span className="inline-block text-[12px] font-semibold tracking-[1.5px] text-[#EC2B45] uppercase mb-4">
              Method 2
            </span>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1D1D1F] mb-6">
              Send Us an Email
            </h3>

            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#EC2B45] flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div className="text-[14px] sm:text-[15px] text-[#444349] leading-relaxed">
                <p>
                  Send an email to{" "}
                  <a
                    href={MAILTO}
                    className="font-semibold text-[#EC2B45] hover:underline"
                  >
                    srbedev@adinn.co.in
                  </a>
                </p>
                <p className="mt-1">
                  Subject:{" "}
                  <span className="font-semibold text-[#1D1D1F]">
                    Delete My Account
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-auto pt-2">
              <a
                href={MAILTO}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white px-6 py-3 rounded-[28px] font-medium text-[14px] sm:text-[15px] transition-all duration-300 hover:opacity-90"
              >
                <Mail size={16} />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestMethods;
