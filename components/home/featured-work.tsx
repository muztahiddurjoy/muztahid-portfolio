"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCase {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: "primary" | "secondary";
}

interface FeaturedWorkProps {
  cases: FeaturedCase[];
}

export default function FeaturedWork({ cases }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          Featured Case Studies
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Select projects that demonstrate end-to-end ownership across the full stack and physical systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c) => (
            <article
              key={c.id}
              className={`case-card group rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-${c.accent}/40`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    c.accent === "primary" ? "bg-primary" : "bg-secondary"
                  }`}
                />
                <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                  {c.accent === "primary" ? "Enterprise Web" : "Robotics & Autonomy"}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-card-foreground mb-3">
                {c.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {c.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
