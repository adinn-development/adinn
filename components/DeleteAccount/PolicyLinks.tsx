import React from "react";
import Link from "next/link";
import { ShieldCheck, FileCheck2, MessageCircle } from "lucide-react";

const links = [
  { label: "Privacy Policy", href: "/#privacy-policy", icon: ShieldCheck },
  { label: "Terms & Conditions", href: "/#terms-conditions", icon: FileCheck2 },
  { label: "Contact Us", href: "/contact", icon: MessageCircle },
];

const PolicyLinks = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1D1D1F]">
          Related Resources
        </h2>
        <p className="mt-3 text-[14px] sm:text-[15px] text-[#6A6B6D]">
          Learn more about how we handle your data and how to reach us.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] shadow-sm hover:shadow-md hover:border-[#EC2B45] hover:text-[#EC2B45] transition-all duration-300"
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PolicyLinks;
