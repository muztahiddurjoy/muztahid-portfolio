"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Cpu, Box, type LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = { Globe, Cpu, Box };

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
    <section ref={ref} className="py-24 md:py-32 bg-muted/20 border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Brutalist Header */}
        <div className="relative mb-16 max-w-4xl">
          <span className="font-script text-3xl md:text-4xl text-primary absolute -top-8 left-0 md:-top-10 -rotate-3 z-10">
            Tools of the trade.
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mt-6">
            <span className="text-foreground">Engineering</span>{" "}
            <span className="bg-foreground text-background px-3 pt-3 pb-1 md:px-5 md:pt-4 md:pb-2 inline-block">
              Arsenal
            </span>
          </h2>
          <p className="mt-6 text-sm md:text-base font-bold uppercase tracking-wide text-foreground/80 leading-snug max-w-2xl border-l-8 border-accent pl-5">
            Tools and technologies across the software-hardware continuum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map(({ icon, title, skills }) => {
            const Icon = iconMap[icon] || Globe;
            return (
              <div
                key={title}
                className="skill-cell group border-4 border-foreground bg-background flex flex-col"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 border-b-4 border-foreground p-5 bg-muted/20">
                  <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background">
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-foreground leading-none">
                    {title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="p-5 flex-grow">
                  <ul className="flex flex-col gap-2.5">
                    {skills.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-3 text-sm font-bold text-foreground/70"
                      >
                        <span className="w-2 h-0.5 bg-foreground/30 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="border-t-4 border-foreground p-4 bg-background">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                    {skills.length} technologies
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}