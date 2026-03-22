"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { JournalEntry } from "@/lib/keystatic-types";

gsap.registerPlugin(ScrollTrigger);

interface ChronologicalFeedProps {
  entries: JournalEntry[];
}

export default function ChronologicalFeed({ entries }: ChronologicalFeedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical timeline line
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

      // Reveal each feed card
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

      // Pop the date nodes
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-muted-foreground text-lg">
            No logs found for this category.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          Chronological Feed
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          Research entries ordered by publication date — most recent first.
        </p>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div className="feed-line absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-12">
            {entries.map((entry, idx) => (
              <div key={entry.slug} className="relative flex items-start gap-6 md:gap-10">
                {/* Date node */}
                <div className="feed-node relative z-10 flex-shrink-0 flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                  </span>
                </div>

                {/* Card */}
                <div
                  className="feed-card flex-1 rounded-2xl border border-border bg-card p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono">
                      {formatDate(entry.date)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {entry.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-card-foreground leading-snug mb-3">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-2xl">
                    {entry.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors duration-200 hover:text-secondary">
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
