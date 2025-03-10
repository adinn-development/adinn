import LandingHero from "@/components/Home/LandingHero";
import LandingContent from "@/components/Home/LandingContent";
import LandingClients from "@/components/Home/LandingClients";
import LandingService from "@/components/Home/LandingService";
import LandingMobile from "@/components/Home/LandingMobile";
import LandingProjects from "@/components/Home/LandingProjects";
import LandingDreamProject from "@/components/Home/LandingDreamProject";
import LandingQueries from "@/components/Home/LandingQueries";
import Footer from "@/components/ReUsableComponents/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <LandingHero />
      <LandingContent />
      <LandingClients />
      <LandingService />
      <LandingMobile />
      <LandingProjects />
      <div className="mt-50 mb-50">
        <LandingDreamProject />
      </div>
      <LandingQueries />
      <Footer />

    </div>
  );
}
