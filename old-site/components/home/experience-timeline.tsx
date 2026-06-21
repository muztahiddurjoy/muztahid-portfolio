"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Rocket, Lightbulb, GraduationCap, type LucideIcon } from "lucide-react";
import type { ExperienceEntry } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Rocket,
  Lightbulb,
  GraduationCap,
};

interface ExperienceTimelineProps {
  experiences: ExperienceEntry[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-line", {
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

      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: card.dataset.side === "left" ? -30 : 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Brutalist Header */}
        <div className="relative mb-16 md:mb-20 max-w-4xl">
          <span className="font-script text-3xl md:text-4xl text-primary absolute -top-8 left-0 md:-top-10 -rotate-3 z-10">
            The grind, documented.
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mt-6">
            <span className="text-foreground">Experience</span>{" "}
            <span className="bg-foreground text-background px-3 pt-3 pb-1 md:px-5 md:pt-4 md:pb-2 inline-block">
              &amp; Journey
            </span>
          </h2>
          <p className="mt-6 text-sm md:text-base font-bold uppercase tracking-wide text-foreground/80 leading-snug max-w-2xl border-l-8 border-accent pl-5">
            Key roles that shaped my engineering perspective across software and hardware.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/20 md:-translate-x-px" />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, idx) => {
              const Icon = iconMap[exp.icon] || Briefcase;
              const isLeft = exp.side === "left";

              return (
                <div
                  key={idx}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8"
                >
                  {isLeft ? (
                    <div className="timeline-card ml-12 md:ml-0 md:text-right" data-side="left">
                      <TimelineContent exp={exp} align="right" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  <div className="absolute left-4 md:relative md:left-auto flex items-start justify-center">
                    <span className="timeline-dot relative z-10 flex h-9 w-9 items-center justify-center border-4 border-foreground bg-background">
                      <Icon size={14} className="text-foreground" strokeWidth={2.5} />
                    </span>
                  </div>

                  {!isLeft ? (
                    <div className="timeline-card ml-12 md:ml-0" data-side="right">
                      <TimelineContent exp={exp} align="left" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineContent({
  exp,
  align,
}: {
  exp: ExperienceEntry;
  align: "left" | "right";
}) {
  return (
    <div
      className={`border-4 border-foreground bg-background p-6 ${
        align === "right" ? "md:mr-0" : "md:ml-0"
      }`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 mb-3 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="px-2.5 py-1 border-2 border-foreground text-[10px] font-black uppercase tracking-[0.15em] text-foreground bg-muted/20">
          {exp.period}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground leading-[0.95] mb-1">
        {exp.role}
      </h3>
      <p className="text-sm font-bold text-foreground/60 uppercase tracking-wide mb-4">
        {exp.org}
      </p>
      <p className="text-sm font-bold text-foreground/75 leading-snug border-l-4 border-foreground/20 pl-4 mb-5">
        {exp.description}
      </p>
      <div
        className={`flex flex-wrap gap-1.5 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}