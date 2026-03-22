"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Server,
  Database,
  Layers,
  Shield,
  Palette,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "frontend",
    title: "Frontend Layer",
    icon: Palette,
    description:
      "Component-driven UI architecture with server-side rendering, static generation, and edge-optimized delivery.",
    technologies: [
      { name: "Next.js", detail: "App Router, RSC, ISR" },
      { name: "React 19", detail: "Server Components, Suspense" },
      { name: "Tailwind CSS", detail: "Utility-first design system" },
      { name: "Shadcn UI", detail: "Accessible component primitives" },
    ],
    accent: "border-secondary/60",
    glow: "shadow-[0_0_20px_rgba(210,180,140,0.08)]",
  },
  {
    id: "backend",
    title: "Backend & API Layer",
    icon: Server,
    description:
      "Modular, type-safe API services with robust authentication and authorization pipelines.",
    technologies: [
      { name: "NestJS", detail: "Modular service architecture" },
      { name: "REST APIs", detail: "Versioned endpoints, DTO validation" },
      { name: "Auth Flows", detail: "JWT, OAuth2, session management" },
      { name: "TypeScript", detail: "End-to-end type safety" },
    ],
    accent: "border-secondary/60",
    glow: "shadow-[0_0_20px_rgba(210,180,140,0.08)]",
  },
  {
    id: "data",
    title: "Data & DevOps Layer",
    icon: Database,
    description:
      "Persistent storage, ORM abstractions, cloud services, and infrastructure as code.",
    technologies: [
      { name: "Prisma ORM", detail: "Type-safe DB queries, migrations" },
      { name: "PostgreSQL", detail: "Relational data modeling" },
      { name: "AWS SES", detail: "Transactional email delivery" },
      { name: "Custom DNS", detail: "Domain routing, SSL provisioning" },
    ],
    accent: "border-secondary/60",
    glow: "shadow-[0_0_20px_rgba(210,180,140,0.08)]",
  },
];

export default function CloudInfrastructureGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate nodes staggered
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

      // Animate data flow connectors
      gsap.utils.toArray<HTMLElement>(".flow-connector").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Pulsing border animation
      gsap.utils.toArray<HTMLElement>(".pulse-border").forEach((el) => {
        gsap.to(el, {
          boxShadow: "0 0 30px rgba(210,180,140,0.15)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-web"
      ref={sectionRef}
      className="py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Globe size={20} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Web Architecture Blueprint
          </h2>
        </div>
        <p className="text-muted-foreground max-w-xl mb-16">
          A schematic view of the full-stack systems I architect — from
          pixel-perfect UI to database-level infrastructure.
        </p>

        {/* Architecture diagram grid */}
        <div className="relative flex flex-col gap-0">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={node.id}>
                {/* Flow connector between nodes */}
                {idx > 0 && (
                  <div className="flow-connector flex items-center justify-center py-4 origin-top">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-8 bg-secondary/40" />
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-secondary/40 bg-background">
                        <ArrowRight
                          size={12}
                          className="text-secondary rotate-90"
                        />
                      </div>
                      <div className="w-px h-8 bg-secondary/40" />
                    </div>
                  </div>
                )}

                {/* Node card */}
                <div
                  className={`infra-node pulse-border rounded-xl border-2 ${node.accent} ${node.glow} bg-card p-8`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
                      <Icon size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-card-foreground">
                        {node.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  {/* Technology items grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {node.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <div>
                          <span className="text-sm font-bold text-foreground">
                            {tech.name}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {tech.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Active in production
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key integration callout */}
        <div className="mt-12 rounded-xl border border-border bg-muted/40 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield size={18} className="text-primary" />
            <span className="text-sm font-extrabold text-foreground">
              Integration Pattern
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Every layer communicates through typed interfaces. Frontend calls
            NestJS API endpoints with auto-generated TypeScript types. Prisma
            schemas define the single source of truth, and migrations propagate
            changes safely across environments.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {["Type-Safe APIs", "Auto Migrations", "CI/CD Pipeline", "Edge Deployment"].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
