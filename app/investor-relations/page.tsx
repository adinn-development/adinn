
import { AboutSection } from "@/components/investor-relations/AboutSection";
import { ContactSection } from "@/components/investor-relations/ContactSection";
import { DisclaimerBanner } from "@/components/investor-relations/DisclaimerBanner";
import { DocumentsSection } from "@/components/investor-relations/DocumentsSection";
import { FeatureCards } from "@/components/investor-relations/FeatureCards";
import { GovernanceSection } from "@/components/investor-relations/GovernanceSection";
import Hero from "@/components/investor-relations/Hero";
import Footer from "@/components/reusable-components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <main className="flex flex-col gap-6 pb-16">
        <Hero />
     
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <DisclaimerBanner />
          <FeatureCards />
          <AboutSection />
          <DocumentsSection />
          <GovernanceSection />
          <ContactSection />
        
        </div>
      </main>
        <Footer />
    </div>
  )
}