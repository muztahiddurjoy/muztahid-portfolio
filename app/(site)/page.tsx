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
import {
  getSiteSettings,
  getMetrics,
  getEducation,
  getFeaturedCases,
  getProjectShowcase,
  getExperiences,
  getSkills,
} from "@/lib/keystatic";

export default async function Home() {
  const [siteSettings, metricsData, educationData, featuredCases, projectShowcase, experiences, skills] =
    await Promise.all([
      getSiteSettings(),
      getMetrics(),
      getEducation(),
      getFeaturedCases(),
      getProjectShowcase(),
      getExperiences(),
      getSkills(),
    ]);

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <StatsBar />
      <LogoMarquee />
      <FeaturedWork cases={(featuredCases?.cases ?? []).map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        tags: [...c.tags],
        accent: c.accent,
      }))} />
      <ProjectShowcase projects={(projectShowcase?.projects ?? []).map(p => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        tags: [...p.tags],
        icon: p.icon,
        span: p.span,
        metricValue: p.metricValue,
        metricLabel: p.metricLabel,
      }))} />
      <ExperienceTimeline experiences={experiences} />
      <SkillsGrid categories={skills} />
      <Metrics items={(metricsData?.items ?? []).map(m => ({
        value: m.value ?? 0,
        suffix: m.suffix,
        label: m.label,
      }))} />
      <Education data={educationData ? {
        degree: educationData.degree,
        university: educationData.university,
        status: educationData.status,
        summary: educationData.degreeDescription,
        coursework: [...educationData.coursework],
        achievements: [...educationData.achievements],
      } : null} />
      <Philosophy siteSettings={siteSettings} />
      <ContactCTA />
    </>
  );
}
