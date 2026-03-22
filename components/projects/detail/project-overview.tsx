"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".overview-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="overview-content max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Overview
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6">
            The Full Picture
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.longDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
