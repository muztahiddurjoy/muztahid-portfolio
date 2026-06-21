"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  ShoppingCart,
  Navigation,
  Printer,
  Bot,
  Satellite,
  Database,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Navigation,
  Printer,
  Bot,
  Satellite,
  Database,
};

interface ShowcaseProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string;
  span: string; // e.g., "col-span-1", "md:col-span-2"
  metricValue: string;
  metricLabel: string;
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brutalist header slide-in
      gsap.from(".showcase-header-text", {
        y: 40,
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".showcase-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Rigid, mechanical drop-in for the grid items
      gsap.utils.toArray<HTMLElement>(".showcase-card").forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial / Telemetry Header */}
        <div className="showcase-header flex flex-col md:flex-row md:items-end justify-between border-b-4 border-foreground pb-6 mb-12 md:mb-16 gap-8">
          <div className="relative">
            <span className="showcase-header-text font-script text-3xl md:text-4xl text-primary absolute -top-8 left-0 md:-top-10 -rotate-3 z-10">
              The Logbook.
            </span>
            <h2 className="showcase-header-text text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-foreground mt-4 md:mt-0">
              Project Archive
            </h2>
            <p className="showcase-header-text mt-4 text-sm md:text-base font-bold text-foreground/80 uppercase tracking-widest border-l-4 border-accent pl-4 max-w-lg">
              Shipped architecture spanning web platforms, robotics, and physical prototyping.
            </p>
          </div>
          
          {/* Total Deployments Counter */}
          <div className="showcase-header-text flex flex-col md:items-end border-l-4 md:border-l-0 md:border-r-4 border-foreground pl-4 md:pl-0 md:pr-4">
            <span className="text-4xl md:text-6xl font-black text-foreground leading-none tracking-tighter">
              {projects.length.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground/60 mt-1">
              Deployments
            </span>
          </div>
        </div>

        {/* Brutalist Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project) => {
            const Icon = iconMap[project.icon] || Database;
            return (
              <article
                key={project.id}
                className={`showcase-card group relative flex flex-col border-4 border-foreground bg-background transition-colors duration-300 hover:bg-muted/10 ${project.span}`}
              >
                {/* Header Row (Icon + Title) */}
                <div className="flex justify-between items-start border-b-4 border-foreground p-5 md:p-6 bg-foreground/5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Icon size={28} className="text-foreground" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground leading-none mb-2 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-foreground/60">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    size={24}
                    className="shrink-0 text-foreground/20 transition-all duration-300 group-hover:text-foreground transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Body Row (Description) */}
                <div className="p-5 md:p-6 flex-grow flex flex-col justify-center">
                  <p className="text-sm md:text-base font-bold text-foreground/80 leading-snug border-l-4 border-foreground/30 pl-4 transition-colors duration-300 group-hover:border-foreground">
                    {project.description}
                  </p>
                </div>

                {/* Footer Row (Tags + Metric) */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch border-t-4 border-foreground">
                  
                  {/* Tech Tags */}
                  <div className="p-4 md:p-5 flex flex-wrap gap-2 items-center flex-grow">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 border-2 border-foreground bg-background text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metric Box (Snaps to solid color on hover) */}
                  <div className="p-4 md:p-5 border-t-4 sm:border-t-0 sm:border-l-4 border-foreground flex flex-col justify-center items-start sm:items-end min-w-[120px] bg-background transition-colors duration-300 group-hover:bg-accent group-hover:text-foreground">
                    <span className="text-2xl md:text-3xl font-black leading-none tracking-tighter">
                      {project.metricValue}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mt-1">
                      {project.metricLabel}
                    </span>
                  </div>
                  
                </div>
              </article>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}