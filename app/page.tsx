import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import FeaturedWork from "@/components/home/featured-work";
import SkillsGrid from "@/components/home/skills-grid";
import Philosophy from "@/components/home/philosophy";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedWork />
      <SkillsGrid />
      <Philosophy />
      <Footer />
    </>
  );
}
