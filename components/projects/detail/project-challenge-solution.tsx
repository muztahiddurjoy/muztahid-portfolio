"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Lightbulb } from "lucide-react";
import type { Project } from "@/lib/keystatic-types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectChallengeProps {
  project: Project;
}

export default function ProjectChallengeSolution({
  project,
}: ProjectChallengeProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".challenge-card")
        .forEach((card, i) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.15,
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
          Problem → Solution
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-12">
          Engineering Decisions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenge */}
          <div className="challenge-card rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                {project.challenge.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.challenge.description}
            </p>
          </div>

          {/* Solution */}
          <div className="challenge-card rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10">
                <Lightbulb size={18} className="text-green-500" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                {project.solution.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.solution.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
