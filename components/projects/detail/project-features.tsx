"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import type { Project } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectFeaturesProps {
  project: Project;
}

export default function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".feature-item")
        .forEach((item, i) => {
          gsap.from(item, {
            x: -20,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.06,
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

  if (!project.features || project.features.length === 0) return null;

  return (
    <section ref={ref} className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-10">
            Feature Breakdown
          </h2>

          <div className="space-y-4">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="feature-item flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 dark:bg-primary/20 flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
