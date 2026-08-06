import React from "react";
import {
  User,
  Phone,
  KeyRound,
  SlidersHorizontal,
  Smartphone,
  BellRing,
  type LucideIcon,
} from "lucide-react";

interface DataItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: DataItem[] = [
  {
    title: "User Profile",
    description: "Your name, profile details, and account information.",
    icon: User,
  },
  {
    title: "Mobile Number",
    description: "The mobile number linked to your Adinn account.",
    icon: Phone,
  },
  {
    title: "Login Information",
    description: "Login credentials and authentication records.",
    icon: KeyRound,
  },
  {
    title: "Personal Preferences",
    description: "App preferences and personalization settings.",
    icon: SlidersHorizontal,
  },
  {
    title: "Device Registration",
    description: "Devices registered and linked to your account.",
    icon: Smartphone,
  },
  {
    title: "Notification Preferences",
    description: "Saved notification and communication preferences.",
    icon: BellRing,
  },
];

const DataDeleted = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16 bg-[#FBF9FF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#1D1D1F] text-center">
          Data That Will Be{" "}
          <span className="instrument-font font-serif italic text-[#CF1E00]">
            Deleted
          </span>
        </h2>
        <p className="mt-4 text-[15px] sm:text-[17px] text-[#444349] text-center max-w-2xl mx-auto">
          When your account deletion request is processed, the following
          personal data is permanently removed from our systems.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-6 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF0F0] flex items-center justify-center">
                  <Icon size={22} className="text-[#EC2B45]" />
                </div>
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#1D1D1F]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#6A6B6D] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataDeleted;
