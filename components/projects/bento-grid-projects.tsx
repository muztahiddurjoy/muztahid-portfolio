"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  Cpu,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/lib/types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  appbaksho: Rocket,
  "stm32-line-follower": Cpu,
  "java-dsa-engine": BookOpen,
};

interface BentoGridProjectsProps {
  projects: Project[];
}

export default function BentoGridProjects({ projects }: BentoGridProjectsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <span className="font-script text-accent text-lg mb-2 block">focused systems</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-12">
          MICRO-ARCHITECTURE GRID
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {projects.map((project, i) => {
            const Icon = iconMap[project.slug] || Rocket;
            return (
              <div
                key={project.slug}
                className={`bento-card border-4 border-foreground p-6 flex flex-col ${i > 0 ? "md:border-l-0 max-md:border-t-0" : ""}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 border-b-4 border-foreground pb-4">
                  <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-mono">
                      {project.subtitle}
                    </p>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-foreground leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-foreground/50 leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/50"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {project.keyMetrics && (
                  <div className="grid grid-cols-3 gap-0 mb-5 border-4 border-foreground">
                    {project.keyMetrics.slice(0, 3).map((metric, mi) => (
                      <div key={metric.label} className={`text-center p-3 ${mi > 0 ? "border-l-4 border-foreground" : ""}`}>
                        <p className="text-sm font-black text-foreground">
                          {metric.value}
                        </p>
                        <p className="text-[10px] text-foreground/40 uppercase tracking-[0.15em] font-mono">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link href={`/projects/${project.slug}`}>
                  <button className="w-full cursor-pointer bg-foreground text-background py-3 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-200 hover:bg-accent hover:text-foreground border-4 border-foreground flex items-center justify-center gap-2">
                    Explore
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}