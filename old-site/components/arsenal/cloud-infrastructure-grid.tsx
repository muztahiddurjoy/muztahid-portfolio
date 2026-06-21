"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Server, Database, Shield, Palette, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "frontend",
    title: "Frontend Layer",
    icon: Palette,
    description: "Component-driven UI architecture with server-side rendering, static generation, and edge-optimized delivery.",
    technologies: [
      { name: "Next.js", detail: "App Router, RSC, ISR" },
      { name: "React 19", detail: "Server Components, Suspense" },
      { name: "Tailwind CSS", detail: "Utility-first design system" },
      { name: "Shadcn UI", detail: "Accessible component primitives" },
    ],
  },
  {
    id: "backend",
    title: "Backend & API Layer",
    icon: Server,
    description: "Modular, type-safe API services with robust auth pipelines.",
    technologies: [
      { name: "NestJS", detail: "Modular service architecture" },
      { name: "REST APIs", detail: "Versioned endpoints, DTO validation" },
      { name: "Auth Flows", detail: "JWT, OAuth2, session management" },
      { name: "TypeScript", detail: "End-to-end type safety" },
    ],
  },
  {
    id: "data",
    title: "Data & DevOps Layer",
    icon: Database,
    description: "Persistent storage, ORM abstractions, cloud services, and infrastructure as code.",
    technologies: [
      { name: "Prisma ORM", detail: "Type-safe DB queries, migrations" },
      { name: "PostgreSQL", detail: "Relational data modeling" },
      { name: "AWS SES", detail: "Transactional email delivery" },
      { name: "Custom DNS", detail: "Domain routing, SSL provisioning" },
    ],
  },
];

export default function CloudInfrastructureGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".infra-node").forEach((el, i) => {
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

      gsap.utils.toArray<HTMLElement>(".flow-connector").forEach((el) => {
        gsap.fromTo(el, { scaleY: 0 }, {
          scaleY: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-web" ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <Globe size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Blueprint.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Web Architecture
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          A schematic view of the full-stack systems I architect.
        </p>

        {/* Architecture diagram */}
        <div className="relative flex flex-col gap-0">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={node.id}>
                {idx > 0 && (
                  <div className="flow-connector flex items-center justify-center py-4 origin-top">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-1 h-8 bg-foreground/20" />
                      <div className="flex items-center justify-center w-8 h-8 border-4 border-foreground/20 bg-background">
                        <ArrowRight size={12} className="text-foreground/40 rotate-90" />
                      </div>
                      <div className="w-1 h-8 bg-foreground/20" />
                    </div>
                  </div>
                )}

                <div className="infra-node border-4 border-foreground bg-background p-8">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b-4 border-foreground">
                    <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                        {node.title}
                      </h3>
                      <p className="text-xs text-foreground/50">{node.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    {node.technologies.map((tech, tIdx) => (
                      <div
                        key={tech.name}
                        className={`flex items-start gap-3 p-4 border-2 border-foreground/10 ${
                          tIdx % 2 === 0 ? "sm:border-r-0" : ""
                        } ${tIdx < 2 ? "border-b-0 sm:border-b-2" : ""}`}
                      >
                        <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                        <div>
                          <span className="text-sm font-black text-foreground">{tech.name}</span>
                          <p className="text-xs text-foreground/40 mt-0.5">{tech.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-foreground/10">
                    <span className="h-2 w-2 bg-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Active in production
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration callout */}
        <div className="mt-12 border-4 border-foreground p-6">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-foreground/20">
            <Shield size={18} className="text-foreground" />
            <span className="text-sm font-black uppercase tracking-tight text-foreground">
              Integration Pattern
            </span>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl mb-4">
            Every layer communicates through typed interfaces. Frontend calls NestJS API endpoints with auto-generated TypeScript types. Prisma schemas define the single source of truth.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Type-Safe APIs", "Auto Migrations", "CI/CD Pipeline", "Edge Deployment"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}