"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Download, Globe, Cpu, Server, Layers, Cog, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SiteSettings {
  name?: string;
  heroTagline?: string;
  heroSubtitle?: string;
  [key: string]: unknown;
}

interface HeroProps {
  siteSettings: SiteSettings | null;
}

export default function Hero({ siteSettings }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappy, aggressive entrance for text
      gsap.from(".hero-text", {
        y: 50,
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });

      // Sharp slide-in for the brutalist cards
      gsap.from(graphicRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.4,
      });
      
      // Fade in the marquee
      gsap.from(marqueeRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Razor-sharp diagonal background split */}
      <div
        className="absolute inset-0 bg-secondary"
        style={{
          clipPath: "polygon(45% 0, 100% 0, 100% 100%, 30% 100%)",
        }}
      />
      
      {/* Subtle grain overlay for texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 w-full py-24 lg:py-0">
        
        {/* Left Content: The Heavyweight Typography */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-primary-foreground relative">
          
          {/* Handwritten accent overlapping the main structure */}
          <div className="hero-text absolute -top-12 left-2 md:-top-8 md:left-8 z-20">
            <span className="font-script text-4xl md:text-5xl text-accent -rotate-6 inline-block opacity-90">
              Just call me Muz.
            </span>
          </div>

          <Badge variant="outline" className="hero-text w-fit border-primary-foreground text-primary-foreground text-xs tracking-[0.2em] font-black uppercase rounded-none px-3 py-1 bg-primary">
            CS Student @ BRAC University
          </Badge>

          <h1 className="hero-text text-[4.5rem] md:text-[7rem] lg:text-[8rem] font-black tracking-tighter leading-[0.85] uppercase">
            {(siteSettings?.name ?? "Muztahid Rahman").split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>

          {/* Secondary handwritten accent */}
          <div className="hero-text pl-2 md:pl-4">
            <span className="font-script text-2xl md:text-3xl text-primary-foreground/80 -rotate-2 inline-block">
              Building robots & restoring classics.
            </span>
          </div>

          <p className="hero-text text-lg md:text-xl max-w-md font-medium text-primary-foreground/90 leading-tight border-l-4 border-accent pl-4">
            {siteSettings?.heroTagline ?? "Architecting Scalable Web Platforms & Autonomous Systems."}
          </p>

          <div className="hero-text flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground font-black uppercase tracking-widest rounded-none border-2 border-accent btn-inverse-hover px-8 h-14"
            >
              Explore My Work
              <ArrowRight className="ml-2" size={18} strokeWidth={3} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-primary-foreground font-black uppercase tracking-widest rounded-none border-2 border-primary-foreground btn-inverse-hover px-8 h-14"
            >
              <Download className="mr-2" size={18} strokeWidth={3} />
              Resume
            </Button>
          </div>
        </div>

        {/* Right Graphic Cards: Brutalist & High Contrast */}
        <div
          ref={graphicRef}
          className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-end gap-6 mt-12 lg:mt-0 relative z-10"
        >
          {/* Web Architecture Card */}
          <div className="w-full max-w-sm ml-auto bg-primary border-4 border-primary-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[8px_8px_0px_0px_var(--color-primary-foreground)] transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[4px_4px_0px_0px_var(--color-primary-foreground)]">
            <div className="flex items-center gap-4 mb-4 border-b-2 border-primary-foreground/20 pb-4">
              <Globe size={28} className="text-accent" strokeWidth={2.5} />
              <h3 className="text-xl font-black uppercase tracking-wide text-primary-foreground">Web Architecture</h3>
            </div>
            <p className="text-sm font-medium text-primary-foreground/80 mb-6 leading-relaxed">
              Enterprise-grade full-stack platforms with scalable cloud infrastructure.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "NestJS", "TypeScript"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 border-2 border-primary-foreground/30 bg-primary-foreground/5 px-3 py-1 text-xs font-black uppercase text-primary-foreground">
                  {t === "Next.js" && <Layers size={14} />}
                  {t === "NestJS" && <Server size={14} />}
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Robotics Card (Offset for dynamic layout) */}
          <div className="w-full max-w-sm ml-auto lg:mr-12 bg-secondary border-4 border-secondary-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[8px_8px_0px_0px_var(--color-secondary-foreground)] transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[4px_4px_0px_0px_var(--color-secondary-foreground)]">
            <div className="flex items-center gap-4 mb-4 border-b-2 border-secondary-foreground/20 pb-4">
              <Cpu size={28} className="text-secondary-foreground" strokeWidth={2.5} />
              <h3 className="text-xl font-black uppercase tracking-wide text-secondary-foreground">Robotics & Autonomy</h3>
            </div>
            <p className="text-sm font-medium text-secondary-foreground/80 mb-6 leading-relaxed">
              Autonomous navigation, SLAM, and embedded systems with low-level control.
            </p>
            <div className="flex flex-wrap gap-2">
              {["ROS2", "C/C++", "STM32"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 border-2 border-secondary-foreground/30 bg-secondary-foreground/5 px-3 py-1 text-xs font-black uppercase text-secondary-foreground">
                  {t === "ROS2" && <Cog size={14} />}
                  {t === "C/C++" && <Cpu size={14} />}
                  {t === "STM32" && <Wifi size={14} />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Identity Marquee - Anchored to the bottom */}
      <div ref={marqueeRef} className="absolute bottom-0 left-0 w-full bg-foreground text-background py-3 border-t-4 border-accent z-20">
        <div className="marquee-container">
          <div className="marquee-content font-black text-sm md:text-base tracking-[0.2em] uppercase">
            <span>CHIEF SOFTWARE ENGINEER @ BOT ENGINEERS</span>
            <span className="text-accent">•</span>
            <span>CO-FOUNDER @ APPBAKSHO</span>
            <span className="text-accent">•</span>
            <span>BRACU CS STUDENT</span>
            <span className="text-accent">•</span>
            <span>VINTAGE CAR ENTHUSIAST</span>
            <span className="text-accent">•</span>
            <span>3D PRINTING NERD</span>
            <span className="text-accent">•</span>
            {/* Duplicate for seamless loop */}
            <span>CHIEF SOFTWARE ENGINEER @ BOT ENGINEERS</span>
            <span className="text-accent">•</span>
            <span>CO-FOUNDER @ APPBAKSHO</span>
            <span className="text-accent">•</span>
            <span>BRACU CS STUDENT</span>
            <span className="text-accent">•</span>
            <span>VINTAGE CAR ENTHUSIAST</span>
            <span className="text-accent">•</span>
            <span>3D PRINTING NERD</span>
            <span className="text-accent">•</span>
          </div>
        </div>
      </div>
    </section>
  );
}