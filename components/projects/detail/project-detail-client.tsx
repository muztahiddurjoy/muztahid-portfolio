"use client";

import { notFound } from "next/navigation";
import type { Project } from "@/lib/types";
import ProjectDetailHero from "@/components/projects/detail/project-detail-hero";
import ProjectOverview from "@/components/projects/detail/project-overview";
import ProjectChallengeSolution from "@/components/projects/detail/project-challenge-solution";
import ProjectStackMetrics from "@/components/projects/detail/project-stack-metrics";
import ProjectFeatures from "@/components/projects/detail/project-features";
import CodeSnippetBlock from "@/components/projects/code-snippet-modal";
import ProjectNavigation from "@/components/projects/detail/project-navigation";
import Footer from "@/components/home/footer";

interface ProjectDetailClientProps {
  slug: string;
  projects: Project[];
}

export default function ProjectDetailClient({ slug, projects }: ProjectDetailClientProps) {
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallengeSolution project={project} />
      <ProjectStackMetrics project={project} />
      <ProjectFeatures project={project} />

      {/* Code snippet section */}
      {project.codeSnippet && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Under the Hood
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-8">
              Code Preview
            </h2>
            <div className="max-w-3xl">
              <CodeSnippetBlock snippet={project.codeSnippet} />
            </div>
          </div>
        </section>
      )}

      <ProjectNavigation prev={prev} next={next} />
      <Footer />
    </>
  );
}
