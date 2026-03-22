"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { projects, type ProjectCategory } from "@/lib/projects-data";
import ProjectFilterNav from "@/components/projects/project-filter-nav";
import CaseStudyCard from "@/components/projects/case-study-card";
import BentoGridProjects from "@/components/projects/bento-grid-projects";

export default function ProjectsGrid() {
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
        {/* Spotlights */}
        {filteredSpotlights.length > 0 && (
          <section className="filtered-section py-24 bg-background">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Deep Dives
                </p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                  Flagship Systems
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

        {/* Bento Grid */}
        {filteredBentos.length > 0 && (
          <div className="filtered-section">
            <BentoGridProjects projects={filteredBentos} />
          </div>
        )}
      </div>
    </>
  );
}
