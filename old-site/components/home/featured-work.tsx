"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCase {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: "primary" | "secondary";
}

interface FeaturedWorkProps {
  cases: FeaturedCase[];
}

export default function FeaturedWork({ cases }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aggressive, heavy reveal for the brutalist header blocks
      gsap.from(".work-header-text", {
        y: 50,
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Sharp, mechanical drop-in for cards
      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Heavy Structural Header */}
        <div className="work-header relative mb-16 md:mb-24 max-w-5xl">
          <span className="work-header-text font-script text-3xl md:text-5xl text-primary absolute -top-8 left-0 md:-top-10 md:-left-6 -rotate-3 z-10 drop-shadow-sm">
            Stuff I've built.
          </span>
          
          {/* Brutalist Text Blocks */}
          <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] flex flex-col items-start gap-2 relative z-0 mt-8 md:mt-10">
            <span className="work-header-text text-foreground">Featured</span>
            <span className="work-header-text bg-foreground text-background px-4 pt-4 pb-2 md:px-6 md:pt-6 md:pb-3">
              Projects
            </span>
          </h2>
          
          <p className="work-header-text mt-8 text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide text-foreground/90 leading-snug max-w-3xl border-l-8 border-accent pl-5">
            Select architecture demonstrating end-to-end ownership. From scalable cloud platforms to low-level physical systems.
          </p>
        </div>

        {/* Brutalist Grid System - Strict Compartments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {cases.map((c, index) => (
            <article
              key={c.id}
              className="case-card group flex flex-col border-4 border-foreground bg-background transition-colors duration-300"
            >
              {/* Telemetry Header (Index & Category) */}
              <div className="flex justify-between items-center border-b-4 border-foreground p-4 md:p-6 bg-muted/20">
                <span className="font-black text-3xl md:text-4xl text-foreground/30 tracking-tighter leading-none">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div 
                  className={`px-4 py-1.5 border-2 border-foreground font-black text-xs md:text-sm uppercase tracking-[0.2em] ${
                    c.accent === "primary" 
                      ? "bg-foreground text-background" 
                      : "bg-accent text-foreground"
                  }`}
                >
                  {c.accent === "primary" ? "On Screen" : "In Lab"}
                </div>
              </div>

              {/* Core Content Area */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9] mb-6 group-hover:underline decoration-foreground decoration-4 underline-offset-4">
                  {c.title}
                </h3>
                <p className="text-sm md:text-base font-bold text-foreground/80 leading-snug border-l-4 border-foreground/30 pl-4">
                  {c.description}
                </p>
              </div>

              {/* Data / Footer Bar */}
              <div className="flex justify-between items-end gap-4 border-t-4 border-foreground p-4 md:p-6 bg-background">
                {/* Tech Stack Tags (Invert on hover) */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {c.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 border-2 border-foreground bg-background text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Rigid Action Button */}
                <div className="w-12 h-12 shrink-0 flex items-center justify-center border-4 border-foreground bg-accent transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                  <ArrowRight 
                    className="text-foreground group-hover:text-background transform group-hover:translate-x-1 transition-all duration-300" 
                    size={28} 
                    strokeWidth={3} 
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}