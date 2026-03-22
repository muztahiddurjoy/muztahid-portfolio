"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ShoppingCart,
  Navigation,
  Printer,
  Bot,
  Satellite,
  Database,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "zf-emart",
    title: "zf-emart & zf-foods",
    subtitle: "Enterprise E-Commerce",
    description:
      "Multi-tenant e-commerce platform handling complex product catalogs, role-based admin dashboards, and transactional email pipelines via AWS SES. Designed a normalized Prisma schema supporting 50+ relational models.",
    tags: ["Next.js", "NestJS", "Prisma", "AWS SES", "PostgreSQL"],
    icon: ShoppingCart,
    span: "md:col-span-2", // wide card
    metric: { value: "50+", label: "DB Models" },
  },
  {
    id: "autonomous-nav",
    title: "Autonomous Navigation",
    subtitle: "BRACU Mongol-tori",
    description:
      "Built a ROS2-based navigation stack with real-time SLAM mapping, LiDAR point-cloud processing, and motor-control firmware on STM32. Tested in unstructured outdoor environments.",
    tags: ["ROS2", "SLAM", "C/C++", "STM32", "LiDAR"],
    icon: Navigation,
    span: "", // normal card
    metric: { value: "< 5cm", label: "Accuracy" },
  },
  {
    id: "3d-prototyping",
    title: "3D Print Prototyping",
    subtitle: "Rapid Manufacturing",
    description:
      "End-to-end physical prototyping — from CAD modeling to slicing and production on Bambu Lab printers. Designed custom enclosures, mounts, and sensor housings for robotic assemblies.",
    tags: ["Bambu Lab", "CAD", "FDM/FFF", "Fusion 360"],
    icon: Printer,
    span: "", // normal card
    metric: { value: "30+", label: "Parts Printed" },
  },
  {
    id: "appbaksho-clients",
    title: "Appbaksho Client Suite",
    subtitle: "Agency Portfolio",
    description:
      "Delivered 5+ production web applications for SMB clients — from restaurant ordering systems to inventory management dashboards. Each project shipped with CI/CD, custom auth, and monitoring.",
    tags: ["Full-Stack", "Vercel", "Prisma", "Stripe"],
    icon: Database,
    span: "md:col-span-2", // wide card
    metric: { value: "5+", label: "Clients Shipped" },
  },
  {
    id: "space-apps",
    title: "NASA Space Apps Project",
    subtitle: "Global Hackathon",
    description:
      "48-hour hackathon project processing satellite telemetry for environmental monitoring. Built interactive data visualizations with real-time streaming graphs.",
    tags: ["Python", "Data Viz", "REST APIs", "Teamwork"],
    icon: Satellite,
    span: "", // normal card
    metric: { value: "48h", label: "Sprint" },
  },
  {
    id: "bot-internal",
    title: "BOT Engineers Internal Tools",
    subtitle: "DevOps & Tooling",
    description:
      "Designed internal dashboards for team management, sprint tracking, and automated deployment notifications. Integrated GitHub webhooks for real-time build status.",
    tags: ["React", "Node.js", "Docker", "GitHub Actions"],
    icon: Bot,
    span: "", // normal card
    metric: { value: "3x", label: "Deploy Speed" },
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".showcase-card").forEach((card, i) => {
        gsap.from(card, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
              Project Showcase
            </h2>
            <p className="text-muted-foreground max-w-xl">
              A deeper look at shipped work across web platforms, robotics, and rapid prototyping.
            </p>
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            {projects.length} Projects
          </span>
        </div>

        {/* Bento-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                className={`showcase-card group relative rounded-2xl border border-border bg-card p-6 flex flex-col justify-between transition-colors duration-300 hover:border-primary/20 ${project.span}`}
              >
                {/* Top row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-card-foreground leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Metric badge */}
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xl font-black text-primary leading-none">
                        {project.metric.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {project.metric.label}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-muted-foreground/40 transition-colors duration-200 group-hover:text-foreground"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
