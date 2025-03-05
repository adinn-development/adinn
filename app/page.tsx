import LandingHero from "@/components/Home/LandingHero";
import LandingContent from "@/components/Home/LandingContent";
import LandingClients from "@/components/Home/LandingClients";
import LandingService from "@/components/Home/LandingService";
import LandingMobile from "@/components/Home/LandingMobile";
import LandingProjects from "@/components/Home/LandingProjects";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <LandingContent />
      <LandingClients />
      <LandingService />
      <LandingMobile />
      <LandingProjects />
    </div>
  );
}
