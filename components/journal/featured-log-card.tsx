"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { JournalEntry } from "@/lib/keystatic-types";

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
    <section ref={cardRef} className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="featured-inner relative rounded-2xl border-2 border-secondary bg-card overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left decorative panel */}
            <div className="hidden lg:flex lg:w-1/3 bg-primary items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div className="text-6xl font-black text-secondary leading-none">
                  Featured
                </div>
                <div className="text-sm uppercase tracking-[0.3em] text-primary-foreground/50">
                  Research Paper
                </div>
                <div className="mx-auto h-px w-16 bg-secondary/30" />
                <div className="font-mono text-xs text-primary-foreground/40">
                  {entry.date}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="border-secondary text-secondary-foreground bg-secondary/10 text-xs tracking-widest uppercase"
                >
                  Featured Log
                </Badge>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {entry.readTime} read
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
                {entry.title}
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {entry.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold text-sm tracking-wide transition-colors duration-300 hover:bg-secondary hover:text-secondary-foreground">
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
