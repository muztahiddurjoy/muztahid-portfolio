"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Server,
  Database,
  Globe,
  Cpu,
  Radio,
  Navigation,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/lib/keystatic-types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const softwareIcons = [Server, Database, Globe];
const hardwareIcons = [Cpu, Radio, Navigation];

interface CaseStudyCardProps {
  project: Project;
  reversed?: boolean;
}

export default function CaseStudyCard({
  project,
  reversed = false,
}: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-study-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(".case-study-visual", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const icons =
    project.category === "software" ? softwareIcons : hardwareIcons;
  const isSoftware = project.category === "software";

  const visual = (
    <div className="case-study-visual flex items-center justify-center p-8 md:p-12">
      <div className="relative w-full max-w-sm aspect-square">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-border overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={`grid-${project.slug}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-foreground"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
          </svg>

          {/* Architecture diagram nodes */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            {isSoftware ? (
              <>
                {/* Frontend layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Globe size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    Next.js Frontend
                  </span>
                </div>
                {/* Connection line */}
                <div className="w-px h-6 bg-border" />
                {/* API layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Server size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    Nest.js API
                  </span>
                </div>
                {/* Connection line */}
                <div className="w-px h-6 bg-border" />
                {/* Database layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Database size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    Prisma + PostgreSQL
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Sensor layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Radio size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    Sensor Fusion
                  </span>
                </div>
                {/* Connection line */}
                <div className="w-px h-6 bg-border" />
                {/* Processing layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Cpu size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    ROS2 / SLAM
                  </span>
                </div>
                {/* Connection line */}
                <div className="w-px h-6 bg-border" />
                {/* Actuation layer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                  <Navigation size={16} className="text-primary" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-foreground">
                    Path Planning
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const content = (
    <div className="case-study-content flex flex-col justify-center p-8 md:p-12">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
        {project.subtitle}
      </p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Challenge */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/70 mb-1.5">
          {project.challenge.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.challenge.description}
        </p>
      </div>

      {/* Solution */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/70 mb-1.5">
          {project.solution.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.solution.description}
        </p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <Badge
            key={tech.name}
            variant="secondary"
            className="text-[11px] tracking-wider uppercase font-semibold"
          >
            {tech.name}
          </Badge>
        ))}
      </div>

      <Link href={`/projects/${project.slug}`}>
        <Button
          variant="default"
          className="w-fit cursor-pointer font-semibold"
        >
          View Full Case Study
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {visual}
        {content}
      </div>
    </div>
  );
}
