import React from "react";
import Image from "next/image";
import { DigitalIcon, EventIcon, FixIcon, OOHIcon, PopIcon, RoadshowIcon, SignIcon, WallIcon } from "../ReUsableComponents/Icons/Icons";

const ServiceOffered = () => {
  const contents = [
    {
      title: "OOH Media",
      description: "Our Outdoor advertising across hoardings, street furniture and transit media delivering visibility across Tamil Nadu.",
      icons: OOHIcon
    },
    {
      title: "Roadshow",
      description:
        "With the largest fleet, we run GPS enabled, RTO-approved roadshows across South India with timely deployment and reliable execution",
      icons: RoadshowIcon

    },
    {
      title: "Signage",
      description:
        "We deliver end to end retail branding, from design and production to installation of in-store displays and outdoor signage solutions",
      icons:SignIcon

    },
    {
      title: "Events & Activation",
      description:
        "We plan and execute events and on-ground activations across South India with in-house creative, fabrication and trained teams",
      icons: EventIcon

    },
    {
      title: "Fixtures",
      description: "We design and manufacture precision retail fixtures and modular shop-in-shop solutions using advanced machinery for consistent branding everywhere.",
      icons: FixIcon

    },
    {
      title: "POPs & Offets",
      description:
        "We print leaflets, posters, brochures  and marketing collaterals with end-to-end handling for quality, accuracy and on time delivery assured.",
      icons:PopIcon

    },
    {
      title: "Wall Painting",
      description:
        "Our team delivers indoor and outdoor wall painting using geo tagging and clear workflows for consistent quality across locations",
      icons: WallIcon

    },
    {
      title: "Digital Marketing",
      description:
        "Our Digital Marketing expertise spans SEO, performance marketing, content and website development.",
      icons:DigitalIcon

    },
  ];
  return (
    <div>
      <div className="flex justify-center p-5 sm:justify-start md:justify-center">
        <div className="text-[24px] sm:text-[96px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-medium">
          Services{" "}
        </div>
        <div className="text-[24px] sm:text-[96px] md:text-[96px] ml-3 instrument-font text-[#CF1E00] font-serif italic">
          Offered
        </div>
      </div>

     <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 place-items-stretch">
    {contents.map((content, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col h-full w-full"
      >
        {/* Image wrapper */}
        <div className="w-full h-40 md:h-48 lg:h-62 overflow-hidden rounded-t-2xl">
          <Image
          unoptimized
            src={content.icons}
            alt={content.title}
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-[#BE3234] text-sm sm:text-lg md:text-xl font-semibold mb-2">
            {content.title}
          </h3>
          <p className="text-[#616365] text-xs sm:text-sm md:text-base leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ServiceOffered;
