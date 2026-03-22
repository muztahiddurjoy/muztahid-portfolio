"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="phil-reveal text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
            How I Think About Problems
          </h2>
          <div className="phil-reveal flex items-center gap-3">
            <div className="h-px w-10 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Core Philosophy
            </span>
            <div className="h-px w-10 bg-border" />
          </div>
        </div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - First Principles */}
          <div className="phil-reveal rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                <BookOpen size={20} className="text-primary dark:text-primary" />
              </div>
              <h3 className="text-xl font-extrabold text-card-foreground">
                First Principles
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              My academic foundation isn&apos;t decorative — it&apos;s load-bearing. Deep dives
              into discrete mathematics, integral calculus, and electrostatics don&apos;t just
              live in a transcript; they inform every line of code I write. Understanding
              the mathematical axioms behind algorithms gives me the intuition to pick the
              right data structure before writing a single function signature.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              This is why I build data structures from scratch in Java — hash tables with
              custom hashing, linked lists with manual pointer management, balanced BSTs
              with rotation logic. Not because libraries don&apos;t exist, but because
              understanding O(n) vs O(log n) in your bones, not just on a whiteboard,
              changes how you architect everything above it. Time and space complexity
              aren&apos;t abstract concepts to me; they&apos;re design constraints I feel in my code.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Discrete Mathematics",
                "Calculus",
                "Electrostatics",
                "Data Structures",
                "Algorithm Analysis",
                "Java Internals",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-md bg-primary/10 dark:bg-primary/20 px-2.5 py-1 text-[11px] font-semibold text-primary dark:text-primary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right - System Architecture */}
          <div className="phil-reveal rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20 dark:bg-secondary/20">
                <Server size={20} className="text-secondary-foreground dark:text-secondary" />
              </div>
              <h3 className="text-xl font-extrabold text-card-foreground">
                System Architecture
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Theory without production is academic trivia. The real test is translating
              algorithmic thinking into systems that serve thousands of users without
              breaking a sweat. When I design a Next.js frontend, the component tree
              isn&apos;t random — it mirrors how I think about graph traversal. When I
              structure a database schema for a startup like Appbaksho, normalization
              decisions are informed by the same set theory I studied in discrete math.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              At BOT Engineers, this philosophy drives every architecture decision:
              choosing between server components and client components is a caching and
              rendering cost analysis. Designing API routes is about understanding
              amortized complexity across request patterns. CI/CD pipelines are
              dependency graphs. The theoretical foundation doesn&apos;t sit in a separate
              drawer — it&apos;s the scaffolding for every production system I ship.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Next.js Architecture",
                "Database Design",
                "API Design",
                "CI/CD Pipelines",
                "Cloud Infrastructure",
                "Cost Optimization",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-md bg-secondary/20 px-2.5 py-1 text-[11px] font-semibold text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
