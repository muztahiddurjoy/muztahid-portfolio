"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Lightbulb } from "lucide-react";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectChallengeSolutionProps {
  project: Project;
}

export default function ProjectChallengeSolution({ project }: ProjectChallengeSolutionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cs-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
        <div className="mb-12">
          <span className="font-script text-accent text-lg">// problem → solution</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1">
            <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">Challenge</span>{" "}
            &amp; Resolution
          </h2>
        </div>

        {/* Two column grid */}
        <div className="grid md:grid-cols-2">
          {/* Challenge */}
          <div className="cs-card border-4 border-foreground md:border-r-0">
            <div className="flex items-center gap-3 p-4 border-b-4 border-foreground bg-foreground/5">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">
                The Challenge
              </h3>
            </div>
            <div className="p-6">
              <h4 className="text-xs font-black uppercase tracking-[0.1em] mb-2">{project.challenge.title}</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {project.challenge.description}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="cs-card border-4 border-foreground max-md:border-t-0">
            <div className="flex items-center gap-3 p-4 border-b-4 border-foreground bg-foreground/5">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">
                The Solution
              </h3>
            </div>
            <div className="p-6">
              <h4 className="text-xs font-black uppercase tracking-[0.1em] mb-2">{project.solution.title}</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {project.solution.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}