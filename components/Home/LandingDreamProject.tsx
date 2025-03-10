import React from "react";
import Image from "next/image";
import { Innovation } from "@/components/ReUsableComponents/Icons/Icons";

const LandingDreamProject = () => {
  return (
    <div>
      <div className="flex flex-col mt-10 p-5">
        <div
          className="rounded-[25px] w-full h-[462px]  relative overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #EC2B45 0%, #BE3234 60%, #790619 100%)",
          }}
        >
          <div className="absolute left-[2.5%] top-[30%] sm:top-[30%] md:top-[30%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
            <Image
              src={Innovation}
              alt="Dream Project"
              className="w-[216.99px] h-[232.07px] md:w-[419px] md:h-[473px] sm:w-[419px] sm:h-[473px] lg:w-[419px] lg:h-[473px] xl:w-[419px] xl:h-[473px]"
              priority
            />
          </div>

          <div className="absolute top-10 right-10 md:top-18 md:right-35">
  <Image
    src={Innovation}
    alt="Dream Project"
    className="w-[116.99px] h-[132.07px] sm:w-[91px] sm:h-[103px] md:w-[116.99px] md:h-[132.07px] lg:w-[116.99px] lg:h-[132.07px] xl:w-[116.99px] xl:h-[132.07px] blur-[2px]"
    priority
  />
</div>


          <div className="flex flex-col mt-30 sm:mt-35  md:mt-35 lg:mt-35 pl-25 sm:pl-30  md:pl-50   -space-y-0">
            <h2 className="text-[24px] md:text-[24px] lg:text-[80px] text-white leading-none">
              Let's Build Your
            </h2>
            <h2 className="text-[24px] md:text-[24px] lg:text-[80px] instrument-font text-white font-serif italic leading-none">
              Dream Project
            </h2>
          </div>

          <div className="absolute bottom-8 right-8 text-white">
            <p className="text-[12px] md:text-[17px] sm:text-[17px] opacity-80 text-right">
              Our team is here to help you succeed.
              <br />
              Let's work together to achieve your goals and elevate
              <br />
              your brand to new heights.
            </p>

            <div className="flex justify-end mt-4">
              <button className="bg-white px-10 py-3 text-[12px] md:text-[16px] text-black rounded-full hover:bg-gray-200 transition-all cursor-pointer hover:scale-105">
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDreamProject;
