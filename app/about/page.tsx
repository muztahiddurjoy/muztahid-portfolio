import type { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import PhilosophySplit from "@/components/about/philosophy-split";
import AboutExperienceTimeline from "@/components/about/about-experience-timeline";
import HardwareBento from "@/components/about/hardware-bento";
import AnalogMechanics from "@/components/about/analog-mechanics";
import CurrentSetup from "@/components/about/current-setup";
import AboutCTA from "@/components/about/about-cta";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "About | Muztahid Rahman — Software & Robotics Engineer",
  description:
    "A deep dive into my engineering DNA — from algorithmic theory and system architecture to embedded firmware, autonomous navigation, and vintage mechanical philosophy.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PhilosophySplit />
      <AboutExperienceTimeline />
      <HardwareBento />
      <AnalogMechanics />
      <CurrentSetup />
      <AboutCTA />
      <Footer />
    </>
  );
}
