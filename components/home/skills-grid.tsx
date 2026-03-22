"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Cpu, Box, type LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/lib/keystatic-types";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Cpu,
  Box,
};

interface SkillsGridProps {
  categories: SkillCategory[];
}

export default function SkillsGrid({ categories }: SkillsGridProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-cell").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
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
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          Engineering Arsenal
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Tools and technologies across the software-hardware continuum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ icon, title, skills }) => {
            const Icon = iconMap[icon] || Globe;
            return (
            <div
              key={title}
              className="skill-cell rounded-2xl border border-border bg-card p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Icon size={18} className="text-primary dark:text-primary" />
                </div>
                <h3 className="text-lg font-extrabold text-card-foreground">{title}</h3>
              </div>

              <ul className="flex flex-col gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
