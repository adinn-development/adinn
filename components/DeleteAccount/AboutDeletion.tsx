import React from "react";
import { AlertTriangle } from "lucide-react";

const AboutDeletion = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          About Account{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Deletion
          </span>
        </h2>

        <p className="mt-6 text-[15px] sm:text-[17px] text-[#444349] leading-relaxed text-center">
          Users who have registered on the Adinn mobile application can
          request permanent deletion of their account and all associated
          personal data. This includes the profile information, preferences,
          and device data linked to your account within the Adinn app.
          Deletion requests are honored in accordance with Google Play&apos;s
          User Data and Account Deletion policy.
        </p>

        <div className="mt-8 flex items-start gap-4 bg-[#FFF4F4] border border-[#F5C6C6] rounded-2xl p-5 sm:p-6">
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#EC2B45] flex items-center justify-center">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <p className="text-[14px] sm:text-[15px] text-[#444349] leading-relaxed">
            <span className="font-semibold text-[#1D1D1F]">
              Account deletion is permanent and irreversible.
            </span>{" "}
            Once your request is processed, your profile and associated
            personal data cannot be recovered under any circumstances. Please
            review the sections below before proceeding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDeletion;
