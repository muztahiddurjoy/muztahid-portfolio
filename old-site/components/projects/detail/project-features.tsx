"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectFeaturesProps {
  project: Project;
}

export default function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!project.features?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".feat-item", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [project.features]);

  if (!project.features?.length) return null;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12">
          <span className="font-script text-accent text-lg">// capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1">
            <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block">Key</span>{" "}
            Features
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-background">
          {project.features.map((feature, i) => (
            <div
              key={i}
              className={`feat-item p-5 flex items-start gap-3 border-background ${
                i % 3 !== 2 ? "lg:border-r-4" : ""
              } ${i % 2 !== 1 ? "max-lg:border-r-4 max-sm:border-r-0" : ""} ${
                i >= (project.features!.length > 3 ? 3 : project.features!.length) ? "" : ""
              } ${i < project.features!.length - (project.features!.length % 3 || 3) ? "border-b-4" : "max-lg:border-b-4 last:border-b-0"}`}
            >
              <div className="w-6 h-6 bg-background text-foreground flex-shrink-0 flex items-center justify-center mt-0.5">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-sm text-background/80 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}