import React from "react";

const Content = () => {
  const content = [
    {
      description: (
        <>
          We have more than{" "}
          <span className="text-[#EC2B45]">
            550 properties in 35 <br /> towns
          </span>{" "}
          across Tamil Nadu.
        </>
      ),
    },
    {
      description: (
        <>
          Our outdoor media covers over <br />{" "}
          <span className="text-[#EC2B45]">3,30,300 square feet</span>.
        </>
      ),
    },
    {
      description: (
        <>
          The <span className="text-[#EC2B45]">only agency</span> to provide
          daily <br />
          photographs.
        </>
      ),
    },
  ];

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {content.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F5F5] px-3 py-15 w-full  rounded-lg hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
          >
            <p className="text-[17px] w-full font-medium leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
