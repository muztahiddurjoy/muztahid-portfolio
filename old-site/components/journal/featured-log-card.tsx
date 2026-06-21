"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { JournalEntry } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedLogCardProps {
  entry: JournalEntry;
}

export default function FeaturedLogCard({ entry }: FeaturedLogCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-inner", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={cardRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <span className="font-script text-accent text-lg mb-2 block">pinned</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-12">
          <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
            FEATURED LOG
          </span>
        </h2>

        <div className="featured-inner border-4 border-foreground">
          <div className="flex flex-col lg:flex-row">
            {/* Left decorative panel */}
            <div className="hidden lg:flex lg:w-1/3 bg-foreground text-background items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div className="text-6xl font-black uppercase tracking-tighter leading-none">
                  Featured
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-background/50 font-mono">
                  Research Paper
                </div>
                <div className="mx-auto h-1 w-16 bg-accent" />
                <div className="font-mono text-xs text-background/40">
                  {entry.date}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-0.5 border-2 border-accent text-[10px] font-black uppercase tracking-[0.1em] text-accent">
                  Featured Log
                </span>
                <span className="flex items-center gap-1.5 text-xs text-foreground/50 font-mono">
                  <Clock size={12} />
                  {entry.readTime} read
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground leading-tight mb-6">
                {entry.title}
              </h3>

              <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl border-l-8 border-accent pl-6">
                {entry.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/60"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-accent hover:text-foreground border-4 border-foreground">
                Read Documentation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}