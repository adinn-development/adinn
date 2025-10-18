
import LandingContent from "@/components/Home/Content";
import LandingService from "@/components/Home/Services";
import LandingMobile from "@/components/Home/Mobile";
import LandingProjects from "@/components/Home/Projects";
import LandingDreamProject from "@/components/Home/DreamProject";
import LandingQueries from "@/components/Home/Queries";
import Footer from "@/components/ReUsableComponents/Footer";
import Hero from "@/components/Home/Hero";
import LandingClients from "@/components/Home/Clients";






export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <LandingContent />
      <LandingClients />
      <LandingService />
      <LandingMobile />
      <LandingProjects />
      <div className="lg:mt-50 lg:mb-50">
        <LandingDreamProject />
      </div>
      <LandingQueries />
      <Footer />

    </div>
  );
}
