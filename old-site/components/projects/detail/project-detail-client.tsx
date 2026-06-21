"use client";

import { notFound } from "next/navigation";
import type { Project } from "@/lib/types";
import ProjectDetailHero from "./project-detail-hero";
import ProjectOverview from "./project-overview";
import ProjectChallengeSolution from "./project-challenge-solution";
import ProjectStackMetrics from "./project-stack-metrics";
import ProjectFeatures from "./project-features";
import ProjectNavigation from "./project-navigation";
import CodeSnippetModal from "../code-snippet-modal";
import Footer from "@/components/layout/footer";

interface ProjectDetailClientProps {
  slug: string;
  projects: Project[];
}

export default function ProjectDetailClient({ slug, projects }: ProjectDetailClientProps) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const currentIndex = projects.indexOf(project);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProjectDetailHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallengeSolution project={project} />
      <ProjectStackMetrics project={project} />
      <ProjectFeatures project={project} />

      {/* Code Preview */}
      {project.codeSnippet && (
        <section className="py-24 md:py-32 bg-background border-t-4 border-foreground">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="mb-12">
              <span className="font-script text-accent text-lg">// source code</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1">
                <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">Code</span>{" "}
                Preview
              </h2>
            </div>
            <CodeSnippetModal snippet={project.codeSnippet} />
          </div>
        </section>
      )}

      <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
      <Footer />
    </main>
  );
}