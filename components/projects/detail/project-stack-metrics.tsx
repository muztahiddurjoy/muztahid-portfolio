"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/keystatic-types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectStackMetricsProps {
  project: Project;
}

export default function ProjectStackMetrics({
  project,
}: ProjectStackMetricsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".stack-metric-item")
        .forEach((item, i) => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Tech Stack */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Technology
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-8">
              The Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <div
                  key={tech.name}
                  className="stack-metric-item rounded-xl border border-border bg-card px-5 py-3"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          {project.keyMetrics && (
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Performance
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-8">
                Key Metrics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {project.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="stack-metric-item rounded-xl border border-border bg-card p-5"
                  >
                    <p className="text-2xl font-black text-foreground mb-1">
                      {metric.value}
                    </p>
                    <p className="text-[11px] tracking-widest uppercase text-muted-foreground font-semibold">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
