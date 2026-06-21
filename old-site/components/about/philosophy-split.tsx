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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Brutalist header */}
        <div className="mb-16">
          <span className="phil-reveal font-script text-2xl md:text-3xl text-primary -rotate-2 inline-block mb-3">
            Core thinking.
          </span>
          <h2 className="phil-reveal text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
            How I Think About{" "}
            <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
              Problems
            </span>
          </h2>
        </div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
          {/* Left - First Principles */}
          <div className="phil-reveal border-4 border-foreground p-8">
            <div className="flex items-center gap-3 mb-6 border-b-4 border-foreground pb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                First Principles
              </h3>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              My academic foundation isn&apos;t decorative — it&apos;s load-bearing. Deep dives
              into discrete mathematics, integral calculus, and electrostatics don&apos;t just
              live in a transcript; they inform every line of code I write. Understanding
              the mathematical axioms behind algorithms gives me the intuition to pick the
              right data structure before writing a single function signature.
            </p>

            <p className="text-sm text-foreground/60 leading-relaxed mb-6">
              This is why I build data structures from scratch in Java — hash tables with
              custom hashing, linked lists with manual pointer management, balanced BSTs
              with rotation logic. Not because libraries don&apos;t exist, but because
              understanding O(n) vs O(log n) in your bones, not just on a whiteboard,
              changes how you architect everything above it.
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-foreground/20">
              {["Discrete Mathematics", "Calculus", "Electrostatics", "Data Structures", "Algorithm Analysis", "Java Internals"].map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right - System Architecture */}
          <div className="phil-reveal border-4 border-foreground border-t-0 md:border-t-4 md:border-l-0 p-8">
            <div className="flex items-center gap-3 mb-6 border-b-4 border-foreground pb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                <Server size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                System Architecture
              </h3>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              Theory without production is academic trivia. The real test is translating
              algorithmic thinking into systems that serve thousands of users without
              breaking a sweat. When I design a Next.js frontend, the component tree
              isn&apos;t random — it mirrors how I think about graph traversal.
            </p>

            <p className="text-sm text-foreground/60 leading-relaxed mb-6">
              At BOT Engineers, this philosophy drives every architecture decision:
              choosing between server components and client components is a caching and
              rendering cost analysis. Designing API routes is about understanding
              amortized complexity across request patterns. CI/CD pipelines are
              dependency graphs. The theoretical foundation doesn&apos;t sit in a separate
              drawer — it&apos;s the scaffolding for every production system I ship.
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-foreground/20">
              {["Next.js Architecture", "Database Design", "API Design", "CI/CD Pipelines", "Cloud Infrastructure", "Cost Optimization"].map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]"
                >
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