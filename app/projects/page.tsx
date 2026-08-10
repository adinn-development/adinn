import { Suspense } from "react";

import Hero from "@/components/Projects/Hero";
import Solutions from "@/components/Projects/Solutions";
import Footer from "@/components/reusable-components/Footer";
import LandingDreamProject from "@/components/Home/DreamProject";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects | Brand Campaigns by Adinn Advertising',
  description: 'See how Adinn has delivered impactful advertising campaigns for brands like SPR India, Dalmia Cement, Hatsun, and Havells.',
  alternates: {
    canonical: 'https://www.adinn.com/projects',
  },
}

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
