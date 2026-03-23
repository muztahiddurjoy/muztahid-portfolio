import type { Metadata } from "next";
import ProjectsHero from "@/components/projects/projects-hero";
import ProjectsGrid from "@/components/projects/projects-grid";
import HardwareWorkflow from "@/components/projects/hardware-workflow";
import GitHubCallout from "@/components/projects/github-callout";
import Footer from "@/components/home/footer";
import { getProjects, getPrototypingSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects | Muztahid Rahman — Software & Robotics Engineer",
  description:
    "A deep dive into production systems — from scalable enterprise e-commerce architectures to autonomous rover navigation and embedded firmware.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const prototypingSteps = getPrototypingSteps();

  return (
    <>
      <ProjectsHero />
      <ProjectsGrid projects={projects} />
      <HardwareWorkflow steps={prototypingSteps} />
      <GitHubCallout />
      <Footer />
    </>
  );
}
