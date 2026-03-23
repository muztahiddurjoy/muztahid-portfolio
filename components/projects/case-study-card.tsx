"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Server,
  Database,
  Globe,
  Cpu,
  Radio,
  Navigation,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/lib/types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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

  const isSoftware = project.category === "software";

  const visual = (
    <div className="case-study-visual flex items-center justify-center p-8 md:p-12 bg-foreground/5">
      <div className="relative w-full max-w-sm aspect-square">
        {/* Blueprint grid */}
        <div className="absolute inset-0 border-4 border-foreground overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
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

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
            {isSoftware ? (
              <>
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Globe size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
                    Next.js Frontend
                  </span>
                </div>
                <div className="w-1 h-6 bg-foreground" />
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Server size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
                    Nest.js API
                  </span>
                </div>
                <div className="w-1 h-6 bg-foreground" />
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Database size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
                    Prisma + PostgreSQL
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Radio size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
                    Sensor Fusion
                  </span>
                </div>
                <div className="w-1 h-6 bg-foreground" />
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Cpu size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
                    ROS2 / SLAM
                  </span>
                </div>
                <div className="w-1 h-6 bg-foreground" />
                <div className="flex items-center gap-3 border-4 border-foreground bg-background px-4 py-2.5">
                  <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
                    <Navigation size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
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
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 font-mono mb-3">
        {project.subtitle}
      </span>
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-4">
        {project.title}
      </h3>
      <p className="text-sm text-foreground/50 leading-relaxed mb-6 border-l-8 border-accent pl-6">
        {project.description}
      </p>

      {/* Challenge */}
      <div className="mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/60 mb-1.5">
          {project.challenge.title}
        </h4>
        <p className="text-sm text-foreground/50 leading-relaxed">
          {project.challenge.description}
        </p>
      </div>

      {/* Solution */}
      <div className="mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/60 mb-1.5">
          {project.solution.title}
        </h4>
        <p className="text-sm text-foreground/50 leading-relaxed">
          {project.solution.description}
        </p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech.name}
            className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/60"
          >
            {tech.name}
          </span>
        ))}
      </div>

      <Link href={`/projects/${project.slug}`}>
        <button className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-accent hover:text-foreground border-4 border-foreground cursor-pointer">
          View Full Case Study
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
    </div>
  );

  return (
    <div
      ref={ref}
      className="border-4 border-foreground overflow-hidden"
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