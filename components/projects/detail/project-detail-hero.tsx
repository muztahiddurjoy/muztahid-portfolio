"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Calendar, User, Clock } from "lucide-react";
import type { Project } from "@/lib/keystatic-types";
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
    <section ref={ref} className="bg-primary text-primary-foreground py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Back nav */}
        <Link href="/projects">
          <Button
            variant="ghost"
            className="detail-hero-text cursor-pointer text-primary-foreground/60 hover:text-primary-foreground mb-8 -ml-3"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Category badge */}
        <div className="detail-hero-text mb-4">
          <Badge
            variant="outline"
            className="text-[10px] tracking-widest uppercase font-semibold border-primary-foreground/30 text-primary-foreground/70"
          >
            {project.category === "software"
              ? "Software Architecture"
              : "Robotics & Embedded"}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="detail-hero-text text-4xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[0.95] mb-4">
          {project.title}
        </h1>

        {/* Subtitle */}
        <p className="detail-hero-text text-lg md:text-xl text-primary-foreground/60 leading-relaxed max-w-2xl mb-8">
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div className="detail-hero-text flex flex-wrap items-center gap-6 text-sm text-primary-foreground/50">
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
            >
              <Button
                variant="outline"
                className="cursor-pointer border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Github size={16} className="mr-2" />
                Source Code
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="cursor-pointer bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
