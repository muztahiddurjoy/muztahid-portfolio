"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Binary, Sigma, Atom } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Binary,
    title: "Data Structures & Algorithms",
    subtitle: "Java / C++",
    description:
      "Building Linked Lists, Hash Tables, Binary Trees, and Graphs from scratch — not just using library implementations. Every structure is analyzed for Big-O time and space complexity. Problems are solved with a focus on optimal solutions: amortized analysis for dynamic arrays, collision resolution strategies for hash maps, and balancing factors for AVL trees.",
    topics: [
      "Linked Lists",
      "Hash Tables",
      "Binary Trees",
      "Graph Traversal",
      "Dynamic Programming",
      "Big-O Analysis",
    ],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Sigma,
    title: "Discrete Mathematics",
    subtitle: "Logic & Computation",
    description:
      "Boolean algebra, propositional and predicate logic, proof techniques, set theory, combinatorics, and graph theory. These aren't abstract courses — they directly inform algorithm design, circuit analysis, and formal verification of system behavior.",
    topics: [
      "Boolean Algebra",
      "Logic Gates",
      "Combinatorics",
      "Set Theory",
      "Proof Techniques",
      "Finite Automata",
    ],
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Atom,
    title: "Physics & Calculus",
    subtitle: "Applied Engineering Math",
    description:
      "Electrostatics, magnetism, kinematics, and multi-variable calculus applied to sensor calibration, motor torque calculations, and trajectory planning for autonomous systems. PID controller tuning is fundamentally a calculus problem — understanding derivatives and integrals is non-negotiable.",
    topics: [
      "Electrostatics",
      "Magnetism",
      "Calculus I-III",
      "Kinematics",
      "Differential Equations",
      "Signal Processing",
    ],
    span: "md:col-span-1 md:row-span-1",
  },
];

export default function TheoryBentoBox() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".theory-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
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
    <section
      id="section-theory"
      ref={sectionRef}
      className="py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <BookOpen size={20} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            The Algorithmic Foundation
          </h2>
        </div>
        <p className="text-muted-foreground max-w-xl mb-16">
          Tools change, but math doesn&apos;t. The science behind the code.
        </p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`theory-card rounded-2xl border border-border bg-card p-8 ${card.span}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-card-foreground">
                      {card.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {card.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-6">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {card.topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="text-[11px]"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Complexity notation callout */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { notation: "O(1)", label: "Hash Lookups" },
            { notation: "O(log n)", label: "Binary Search" },
            { notation: "O(n)", label: "Linear Scans" },
            { notation: "O(n log n)", label: "Merge Sort" },
          ].map((item) => (
            <div
              key={item.notation}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <span className="text-2xl font-black font-mono text-secondary">
                {item.notation}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
