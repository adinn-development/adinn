import { Suspense } from "react";

import Hero from "@/components/Projects/Hero";
import Solutions from "@/components/Projects/Solutions";
import Footer from "@/components/ReUsableComponents/Footer";
import LandingDreamProject from "@/components/Home/DreamProject";

const page = () => {
  return (
    <div>
      <Hero />
      {/* <Contents /> */}
      <Suspense>
        <Solutions />
      </Suspense>
      <div className="lg:mt-50 lg:mb-50 mt-20 mb-20">
        <LandingDreamProject />
      </div>
      <Footer />
    </div>
  );
};

export default page;
