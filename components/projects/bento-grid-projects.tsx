"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Cpu,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/lib/projects-data";
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
    <section ref={ref} className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
          Focused Systems
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-12">
          Micro-Architecture Grid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = iconMap[project.slug] || Rocket;
            return (
              <div
                key={project.slug}
                className="bento-card rounded-2xl border border-border bg-card p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                      {project.subtitle}
                    </p>
                    <h3 className="text-lg font-extrabold tracking-tight text-foreground leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="text-[10px] tracking-wider uppercase font-semibold"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                {project.keyMetrics && (
                  <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-lg bg-muted/60">
                    {project.keyMetrics.slice(0, 3).map((metric) => (
                      <div key={metric.label} className="text-center">
                        <p className="text-sm font-extrabold text-foreground">
                          {metric.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link href={`/projects/${project.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer font-semibold"
                  >
                    Explore
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
