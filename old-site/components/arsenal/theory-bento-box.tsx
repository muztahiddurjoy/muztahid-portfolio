"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Binary, Sigma, Atom, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "dsa",
    icon: Binary,
    title: "Data Structures & Algorithms",
    description: "Algorithmic thinking applied to real engineering — from graph traversal in path planning to hash maps in caching layers.",
    topics: [
      "Graph Theory (BFS, DFS, Dijkstra, A*)",
      "Dynamic Programming & Memoization",
      "Tree Structures (BST, AVL, Tries)",
      "Sorting & Search Optimization",
      "Space-Time Complexity Analysis",
    ],
  },
  {
    id: "math",
    icon: Sigma,
    title: "Discrete Mathematics",
    description: "Formal logic, set theory, combinatorics — the language underneath every algorithm and every proof.",
    topics: [
      "Propositional & Predicate Logic",
      "Set Theory & Relations",
      "Combinatorics & Counting",
      "Graph Theory (Formal)",
      "Number Theory & Modular Arithmetic",
    ],
  },
  {
    id: "physics",
    icon: Atom,
    title: "Physics & Calculus",
    description: "Mechanics, kinematics, and calculus for robotics — from PID control tuning to trajectory optimization.",
    topics: [
      "Newtonian Mechanics & Dynamics",
      "Differential Equations for Control",
      "Linear Algebra & Transformations",
      "Signal Processing Fundamentals",
      "Numerical Methods & Integration",
    ],
  },
];

export default function TheoryBentoBox() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".theory-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-theory" ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Theoretical.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Algorithmic Theory
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          The formal foundations behind every system I build.
        </p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`theory-card border-4 border-foreground ${idx > 0 ? "lg:border-l-0" : ""} ${idx > 0 ? "border-t-0 lg:border-t-4" : ""}`}
              >
                {/* Card header */}
                <div className="px-6 py-4 border-b-4 border-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight text-foreground">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 py-5">
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6 border-l-4 border-accent pl-4">
                    {card.description}
                  </p>

                  <div className="space-y-0">
                    {card.topics.map((topic, tIdx) => (
                      <div
                        key={topic}
                        className={`flex items-start gap-3 py-3 ${
                          tIdx < card.topics.length - 1 ? "border-b border-foreground/10" : ""
                        }`}
                      >
                        <span className="w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0" />
                        <span className="text-sm text-foreground/70">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center gap-2 px-6 py-3 border-t-2 border-foreground/10">
                  <span className="h-2 w-2 bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                    {card.topics.length} topics covered
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complexity callout */}
        <div className="mt-12 border-4 border-foreground p-6">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-foreground/20">
            <ArrowRight size={18} className="text-foreground" />
            <span className="text-sm font-black uppercase tracking-tight text-foreground">
              Complexity Notation
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { notation: "O(1)", label: "Constant" },
              { notation: "O(log n)", label: "Logarithmic" },
              { notation: "O(n)", label: "Linear" },
              { notation: "O(n log n)", label: "Linearithmic" },
            ].map((item, idx) => (
              <div
                key={item.notation}
                className={`p-4 border-2 border-foreground/10 ${idx > 0 ? "border-l-0 md:border-l-2" : ""} ${idx >= 2 ? "border-t-0 md:border-t-2" : ""}`}
              >
                <span className="text-xl font-mono font-bold text-foreground block">{item.notation}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/40">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}