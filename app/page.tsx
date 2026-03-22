import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import LogoMarquee from "@/components/home/logo-marquee";
import FeaturedWork from "@/components/home/featured-work";
import ProjectShowcase from "@/components/home/project-showcase";
import ExperienceTimeline from "@/components/home/experience-timeline";
import SkillsGrid from "@/components/home/skills-grid";
import Metrics from "@/components/home/metrics";
import Education from "@/components/home/education";
import Philosophy from "@/components/home/philosophy";
import ContactCTA from "@/components/home/contact-cta";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LogoMarquee />
      <FeaturedWork />
      <ProjectShowcase />
      <ExperienceTimeline />
      <SkillsGrid />
      <Metrics />
      <Education />
      <Philosophy />
      <ContactCTA />
      <Footer />
    </>
  );
}
