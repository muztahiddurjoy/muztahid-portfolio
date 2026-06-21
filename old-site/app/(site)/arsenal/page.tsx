import type { Metadata } from "next";
import ArsenalHero from "@/components/arsenal/arsenal-hero";
import SkillDomainNav from "@/components/arsenal/skill-domain-nav";
import CloudInfrastructureGrid from "@/components/arsenal/cloud-infrastructure-grid";
import HardwareTerminal from "@/components/arsenal/hardware-terminal";
import TheoryBentoBox from "@/components/arsenal/theory-bento-box";
import FabricationMetrics from "@/components/arsenal/fabrication-metrics";
import LabHotspotImage from "@/components/arsenal/lab-hotspot-image";
import SkillDataTable from "@/components/arsenal/skill-data-table";
import ArsenalFooterCTA from "@/components/arsenal/arsenal-footer-cta";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Arsenal & Infrastructure | Muztahid Rahman — Software & Robotics Engineer",
  description:
    "A deep dive into my technical capabilities — from full-stack web architecture and cloud infrastructure to embedded systems, autonomous navigation, and algorithmic theory.",
};

export default function ArsenalPage() {
  return (
    <>
      <ArsenalHero />
      <SkillDomainNav />
      <CloudInfrastructureGrid />
      <HardwareTerminal />
      <TheoryBentoBox />
      <FabricationMetrics />
      <LabHotspotImage />
      <SkillDataTable />
      <ArsenalFooterCTA />
      <Footer />
    </>
  );
}
