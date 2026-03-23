"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-block", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Previous */}
          <div className="nav-block">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group block border-4 border-foreground p-6 md:border-r-0 transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 group-hover:text-background/40 mb-3 font-mono">
                  <ArrowLeft size={14} />
                  Previous Project
                </span>
                <span className="block text-lg font-black uppercase tracking-tight">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="border-4 border-foreground/20 p-6 md:border-r-0">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 font-mono">
                  No previous project
                </span>
              </div>
            )}
          </div>

          {/* Next */}
          <div className="nav-block">
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group block border-4 border-foreground p-6 max-md:border-t-0 text-right transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 group-hover:text-background/40 mb-3 font-mono">
                  Next Project
                  <ArrowRight size={14} />
                </span>
                <span className="block text-lg font-black uppercase tracking-tight">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div className="border-4 border-foreground/20 p-6 max-md:border-t-0 text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 font-mono">
                  No next project
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Back to all */}
        <div className="nav-block mt-6 text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 border-4 border-foreground font-black text-xs uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
          >
            All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}