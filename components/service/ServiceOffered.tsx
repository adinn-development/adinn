import React from 'react'

const ServiceOffered = () => {
  const contents = [
    {
      title: "OOH & Outdoor Advertising",
      description: "Our daily photo monitoring ensures maximum transparency.",
    },
    {
      title: "Roadshow Van Advertising",
      description: "Our 250+ custom-built vehicles allow brands to reach audiences directly, covering both urban & rural markets",
    },  
    {
      title: "Digital Marketing",
      description: "We bring brands to life online, ensuring their digital presence drives real results.",
    },  
    {
      title: "Retail Branding  Solutions",
      description: "From store branding to signage solutions, we create engaging retail experiences.",
    },  
    {
      title: "Events & Activation",
      description: "Our event team provides end-to-end execution.",
    },  
    {
      title: "Media Planning & Buying",
      description: "We execute high-ROI media strategies across Print, TV, FM & Cinema Ads.",
    },  
 
  ];
  return (
    <div>
<div className="flex justify-center p-5 sm:justify-start md:justify-center">
  <div className="text-[24px] sm:text-[96px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-medium">
    Services{' '}
  </div>
  <div className="text-[24px] sm:text-[96px] md:text-[96px] ml-3 instrument-font text-[#CF1E00] font-serif italic">
    Offered
  </div>
</div>

<div className="px-8 sm:px-16 md:px-18 lg:px-22 xl:px-12 2xl:px-62 py-6 sm:py-8 md:py-12 lg:py-16 ">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 place-items-center">
    {contents.map((content, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl hover:shadow-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 md:w-full md:max-w-[600px] md:h-[350px] h-[150px] flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-8 md:py-10 lg:py-12"
      >
        <h3 className="text-[#BE3234] text-[16px] sm:text-[32px] md:text-[32px] font-semibold mb-4 text-center">
          {content.title}
        </h3>
        <p className="text-[#616365] text-[10px] sm:text-[17px] md:text-[17px] leading-relaxed text-center max-w-[400px]">
          {content.description}
        </p>
      </div>
    ))}
  </div>

</div>
    </div>
  )
}

export default ServiceOffered
