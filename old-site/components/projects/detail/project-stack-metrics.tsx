"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, BarChart3 } from "lucide-react";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectStackMetricsProps {
  project: Project;
}

export default function ProjectStackMetrics({ project }: ProjectStackMetricsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sm-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
        <div className="sm-reveal mb-12">
          <span className="font-script text-accent text-lg">// architecture</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1">
            <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">Stack</span>{" "}
            &amp; Metrics
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Tech Stack */}
          <div className="sm-reveal border-4 border-foreground md:border-r-0">
            <div className="flex items-center gap-3 p-4 border-b-4 border-foreground bg-foreground/5">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">
                Tech Stack
              </h3>
            </div>
            <div className="p-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/70 hover:border-foreground hover:text-foreground transition-colors"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="sm-reveal border-4 border-foreground max-md:border-t-0">
            <div className="flex items-center gap-3 p-4 border-b-4 border-foreground bg-foreground/5">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">
                Key Metrics
              </h3>
            </div>
            <div className="divide-y-4 divide-foreground">
              {project.keyMetrics?.map((m) => (
                <div key={m.label} className="p-4 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.1em] text-foreground/50">
                    {m.label}
                  </span>
                  <span className="text-lg font-black tracking-tight">
                    {m.value}
                  </span>
                </div>
              ))}
              {!project.keyMetrics?.length && (
                <div className="p-6 text-xs font-mono text-foreground/30 uppercase tracking-[0.15em]">
                  No metrics recorded
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}