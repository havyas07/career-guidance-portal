import LandingNavbar from "../../components/landing/LandingNavbar";
import LandingHero from "../../components/landing/LandingHero";
import LandingHowItWorks from "../../components/landing/LandingHowItWorks";
import LandingFeatures from "../../components/landing/LandingFeatures";
import LandingFooter from "../../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingHowItWorks />
        <LandingFeatures />
      </main>
      <LandingFooter />
    </div>
  );
}