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
      // Crisp, staggered reveal for the section header
      gsap.from(".work-header-text", {
        y: 40,
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Sharp slide-up and fade for the case cards
      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          delay: index * 0.1, // Stagger based on index
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background overflow-hidden border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Refined Editorial Header */}
        <div className="work-header relative mb-12 md:mb-16 max-w-4xl">
          <span className="work-header-text font-script text-3xl md:text-4xl text-primary absolute -top-6 left-0 md:-top-8 md:-left-4 -rotate-3 z-10 drop-shadow-sm">
            Stuff I've built.
          </span>
          <h2 className="work-header-text text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] text-foreground relative z-0 mt-4 md:mt-6">
            Featured Projects
          </h2>
          <p className="work-header-text mt-6 text-base md:text-lg font-medium text-foreground/80 leading-relaxed max-w-2xl border-l-4 border-accent pl-4">
            Select architecture that demonstrates end-to-end ownership. From scalable cloud platforms to low-level physical systems.
          </p>
        </div>

        {/* Brutalist Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {cases.map((c) => (
            <article
              key={c.id}
              className="case-card group relative flex flex-col border-4 border-foreground bg-background p-8 transition-colors duration-300 hover:bg-muted/30"
            >
              {/* Category Badge & Arrow */}
              <div className="flex justify-between items-start mb-6">
                <div 
                  className={`px-3 py-1.5 border-2 border-foreground font-black text-xs uppercase tracking-widest ${
                    c.accent === "primary" 
                      ? "bg-foreground text-background" 
                      : "bg-accent text-foreground"
                  }`}
                >
                  {c.accent === "primary" ? "On Screen" : "In Lab"}
                </div>
                {/* Arrow slides right, strictly NO moving up/scaling */}
                <div className="w-10 h-10 flex items-center justify-center border-2 border-transparent group-hover:border-foreground transition-colors duration-300 rounded-full">
                  <ArrowRight 
                    className="text-foreground transform group-hover:translate-x-1 transition-transform duration-300" 
                    size={24} 
                    strokeWidth={2.5} 
                  />
                </div>
              </div>

              {/* Core Content */}
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-3">
                {c.title}
              </h3>

              <p className="text-sm md:text-base font-medium text-foreground/80 leading-relaxed border-l-4 border-foreground/30 pl-4 mb-8 flex-grow group-hover:border-foreground transition-colors duration-300">
                {c.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {c.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-1 border-2 border-foreground/20 bg-foreground/5 text-[10px] md:text-xs font-black uppercase text-foreground tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mechanical Hover Accent (Grows from bottom, doesn't shift layout) */}
              <div className="absolute bottom-0 left-0 w-full h-0 bg-foreground transition-all duration-300 ease-out group-hover:h-2 z-20" />
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}