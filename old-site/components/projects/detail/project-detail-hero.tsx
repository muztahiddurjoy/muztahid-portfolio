"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, Github, ExternalLink, Calendar, User, Clock } from "lucide-react";
import type { Project } from "@/lib/types";
import Link from "next/link";

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-foreground text-background py-24 lg:py-32 border-b-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Back nav */}
        <Link href="/projects" className="detail-hero-text inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors mb-8 font-mono text-xs uppercase tracking-[0.15em]">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Category tag */}
        <div className="detail-hero-text mb-4">
          <span className="px-2 py-0.5 border-2 border-background/30 text-[10px] font-black uppercase tracking-[0.1em] text-background/70">
            {project.category === "software"
              ? "Software Architecture"
              : "Robotics & Embedded"}
          </span>
        </div>

        {/* Title */}
        <h1 className="detail-hero-text text-4xl md:text-6xl lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[0.95] mb-4">
          {project.title}
        </h1>

        {/* Subtitle */}
        <p className="detail-hero-text text-lg md:text-xl text-background/60 leading-relaxed max-w-2xl mb-8 border-l-8 border-accent pl-6">
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div className="detail-hero-text flex flex-wrap items-center gap-6 text-xs text-background/40 font-mono uppercase tracking-[0.15em]">
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {project.year}
          </span>
          <span className="flex items-center gap-2">
            <User size={14} />
            {project.role}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} />
            {project.duration}
          </span>
        </div>

        {/* Action buttons */}
        <div className="detail-hero-text flex flex-wrap gap-3 mt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-4 border-background text-background font-black text-xs uppercase tracking-[0.15em] transition-colors hover:bg-background hover:text-foreground"
            >
              <Github size={16} />
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground font-black text-xs uppercase tracking-[0.15em] transition-colors hover:bg-accent hover:text-foreground border-4 border-background"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </section>
  );
}