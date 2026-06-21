"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { JournalEntry } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ChronologicalFeedProps {
  entries: JournalEntry[];
}

export default function ChronologicalFeed({ entries }: ChronologicalFeedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feed-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray<HTMLElement>(".feed-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: -30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".feed-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (entries.length === 0) {
    return (
      <section className="py-24 bg-background border-t-4 border-foreground">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-foreground/50 text-lg font-mono uppercase tracking-[0.15em]">
            No logs found for this category.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <span className="font-script text-accent text-lg mb-2 block">archive</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-4">
          CHRONOLOGICAL FEED
        </h2>
        <p className="text-foreground/50 max-w-xl mb-16 font-mono text-xs tracking-[0.15em] uppercase">
          Research entries ordered by publication date — most recent first.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="feed-line absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-foreground" />

          <div className="flex flex-col gap-12">
            {entries.map((entry) => (
              <div key={entry.slug} className="relative flex items-start gap-6 md:gap-10">
                {/* Node */}
                <div className="feed-node relative z-10 flex-shrink-0 flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center border-4 border-foreground bg-background">
                    <span className="h-2.5 w-2.5 bg-accent" />
                  </span>
                </div>

                {/* Card */}
                <div className="feed-card flex-1 border-4 border-foreground p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3 border-b-4 border-foreground pb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 font-mono">
                      {formatDate(entry.date)}
                    </span>
                    <span className="h-3 w-px bg-foreground/30" />
                    <span className="flex items-center gap-1 text-[10px] text-foreground/40 font-mono uppercase tracking-[0.15em]">
                      <Clock size={12} />
                      {entry.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground leading-snug mb-3">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-foreground/50 leading-relaxed mb-5 max-w-2xl">
                    {entry.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/50"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:text-accent">
                    Read Full Log
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}