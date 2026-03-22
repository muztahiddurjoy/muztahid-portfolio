"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SiteSettings {
  philosophyQuote?: string;
  philosophyAttribution?: string;
  name?: string;
  [key: string]: unknown;
}

interface PhilosophyProps {
  siteSettings: SiteSettings | null;
}

export default function Philosophy({ siteSettings }: PhilosophyProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-text", {
        y: 25,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl text-center">
        <h2 className="phil-text text-3xl md:text-4xl font-black tracking-tight text-foreground mb-8">
          Technical Philosophy
        </h2>
        <blockquote className="phil-text text-lg md:text-xl leading-relaxed text-foreground/80">
          &ldquo;{siteSettings?.philosophyQuote ?? "My approach to engineering bridges the gap between digital logic and physical systems. I believe that a deep understanding of algorithmic time/space complexity and discrete mathematics is fundamental—whether I'm writing production web code or optimizing autonomous navigation routines."}&rdquo;
        </blockquote>

        <div className="phil-text mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {siteSettings?.philosophyAttribution ?? siteSettings?.name ?? "Muztahid Rahman"}
          </span>
          <span className="h-px w-10 bg-border" />
        </div>
      </div>
    </section>
  );
}
