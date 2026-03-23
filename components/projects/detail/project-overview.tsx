"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".overview-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="overview-reveal mb-10">
          <span className="font-script text-accent text-lg">// deep dive</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1">
            <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">Project</span>{" "}
            Overview
          </h2>
        </div>

        {/* Description */}
        <div className="overview-reveal max-w-3xl">
          <div className="border-l-8 border-accent pl-6">
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}