import React from "react";
import Image from "next/image";

const ServiceOffered = () => {
  const contents = [
    {
      title: "OOH Media",
      description: "Our daily photo monitoring ensures maximum transparency.",
      icons:'assets/service/ServiceIcon/ooh.png'
    },
    {
      title: "Roadshow",
      description:
        "Our 250+ custom-built vehicles allow brands to reach audiences directly, covering both urban & rural markets",
      icons:'assets/service/ServiceIcon/road.png'

    },
    {
      title: "Signage",
      description:
        "We bring brands to life online, ensuring their digital presence drives real results.",
      icons:'assets/service/ServiceIcon/sign.png'

    },
    {
      title: "Events & Activation",
      description:
        "From store branding to signage solutions, we create engaging retail experiences.",
      icons:'assets/service/ServiceIcon/events.png'

    },
    {
      title: "Fixtures",
      description: "Our event team provides end-to-end execution.",
      icons:'assets/service/ServiceIcon/fixtures.png'

    },
    {
      title: "POPs & Offets",
      description:
        "We execute high-ROI media strategies across Print, TV, FM & Cinema Ads.",
      icons:'assets/service/ServiceIcon/pop.png'

    },
    {
      title: "Wall Painting",
      description:
        "We execute high-ROI media strategies across Print, TV, FM & Cinema Ads.",
      icons:'assets/service/ServiceIcon/wall.png'

    },
    {
      title: "Digital Marketing",
      description:
        "We execute high-ROI media strategies across Print, TV, FM & Cinema Ads.",
      icons:'assets/service/ServiceIcon/digital.png'

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
