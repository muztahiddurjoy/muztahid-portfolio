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
  siteSettings?: SiteSettings | null;
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
    <section ref={ref} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
        {/* Brutalist Header */}
        <div className="relative mb-12 text-center">
          <span className="font-script text-3xl md:text-4xl text-primary -rotate-3 inline-block mb-4">
            How I think.
          </span>
          <h2 className="phil-text text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
            Technical{" "}
            <span className="bg-foreground text-background px-3 pt-3 pb-1 md:px-5 md:pt-4 md:pb-2 inline-block">
              Philosophy
            </span>
          </h2>
        </div>

        <div className="phil-text border-4 border-foreground p-8 md:p-12 bg-muted/10">
          <blockquote className="text-lg md:text-xl lg:text-2xl font-bold text-foreground/85 leading-relaxed border-l-8 border-accent pl-6 md:pl-8">
            &ldquo;{siteSettings?.philosophyQuote ?? "My approach to engineering bridges the gap between digital logic and physical systems. I believe that a deep understanding of algorithmic time/space complexity and discrete mathematics is fundamental—whether I'm writing production web code or optimizing autonomous navigation routines."}&rdquo;
          </blockquote>
        </div>

        <div className="phil-text mt-8 flex items-center justify-center gap-4">
          <span className="h-0.5 w-12 bg-foreground/20" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">
            {siteSettings?.philosophyAttribution ?? siteSettings?.name ?? "Muztahid Rahman"}
          </span>
          <span className="h-0.5 w-12 bg-foreground/20" />
        </div>
      </div>
    </section>
  );
}