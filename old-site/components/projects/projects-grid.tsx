"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project, ProjectCategory } from "@/lib/types";
import ProjectFilterNav from "@/components/projects/project-filter-nav";
import CaseStudyCard from "@/components/projects/case-study-card";
import BentoGridProjects from "@/components/projects/bento-grid-projects";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const spotlights = projects.filter((p) => p.type === "spotlight");
  const bentos = projects.filter((p) => p.type === "bento");

  const filteredSpotlights =
    filter === "all"
      ? spotlights
      : spotlights.filter((p) => p.category === filter);

  const filteredBentos =
    filter === "all" ? bentos : bentos.filter((p) => p.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".filtered-section", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "power2.out",
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <>
      <ProjectFilterNav activeFilter={filter} onFilterChange={setFilter} />

      <div ref={gridRef}>
        {filteredSpotlights.length > 0 && (
          <section className="filtered-section py-24 md:py-32 bg-background border-t-4 border-foreground">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-12">
              <div>
                <span className="font-script text-accent text-lg mb-2 block">deep dives</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                  <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
                    FLAGSHIP SYSTEMS
                  </span>
                </h2>
              </div>
              {filteredSpotlights.map((project, i) => (
                <CaseStudyCard
                  key={project.slug}
                  project={project}
                  reversed={i % 2 !== 0}
                />
              ))}
            </div>
          </section>
        )}

        {filteredBentos.length > 0 && (
          <div className="filtered-section">
            <BentoGridProjects projects={filteredBentos} />
          </div>
        )}
      </div>
    </>
  );
}