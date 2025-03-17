import React from 'react'

const ServiceOffered = () => {
  const contents = [
    {
      title: "Hoarding Services",
      description: " Large, impactful stationary boards  with messages or images.  Captivating visuals for effective  brand communication.",
    },
    {
      title: "Transit Advertising",
      description: " Placing ads strategically on buses,  trains, taxis, and various vehicles.  Mobile visibility for maximum reach  and brand exposure.",
    },  
    {
      title: "Street Furniture Advertising",
      description: " Placing ads strategically on buses,  trains, taxis, and various vehicles.  Mobile visibility for maximum reach  and brand exposure.",
    },  
    {
      title: "Point of Sale Advertising",
      description: " Displays and signs in retail locations,  promoting specific products or  promotions. Strategic placement for  enhanced product visibility and  consumer engagement.",
    },  
    
    
    
  ];
  return (
    <div>
<div className="flex justify-center p-5 sm:justify-start md:justify-start">
  <div className="text-[24px] sm:text-[96px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold">
    Services{' '}
  </div>
  <div className="text-[24px] sm:text-[96px] md:text-[96px] ml-3 instrument-font text-[#CF1E00] font-serif italic">
    Offered
  </div>
</div>

<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 place-items-center">
    {contents.map((content, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl hover:shadow-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 w-full max-w-[540px] h-[250px] flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12"
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
