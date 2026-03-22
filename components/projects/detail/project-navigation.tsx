"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/keystatic-types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

export default function ProjectNavigation({
  prev,
  next,
}: ProjectNavigationProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-nav-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="proj-nav-item group">
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                Previous Project
              </p>
              <div className="flex items-center gap-2">
                <ArrowLeft
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
                <span className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  {prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link href="/projects" className="proj-nav-item">
            <Button variant="outline" size="sm" className="cursor-pointer font-semibold">
              All Projects
            </Button>
          </Link>

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="proj-nav-item group text-right"
            >
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                Next Project
              </p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  {next.title}
                </span>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
