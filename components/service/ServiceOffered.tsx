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
      <div className="flex flex-col md:flex-row items-center justify-start px-5 gap-2 md:gap-3">
        <div className="text-[40px] sm:text-[60px] md:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold">
          Services
        </div>
        <div className="text-[40px] sm:text-[60px] md:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
          Offered
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 ">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 place-items-center">
    {contents.map((content, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl hover:shadow-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 w-full max-w-[540px] h-[250px] flex flex-col items-center justify-center text-center p-6"
      >
        <h3 className="text-[#BE3234] text-[32px] font-semibold mb-4 text-center">
          {content.title}
        </h3>
        <p className="text-[#616365] text-[17px] leading-relaxed text-center max-w-[400px]">
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
