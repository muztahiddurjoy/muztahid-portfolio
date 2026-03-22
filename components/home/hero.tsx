"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Download, Globe, Cpu, Server, Layers, Cog, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(graphicRef.current, {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Split diagonal background */}
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(55% 0, 100% 0, 100% 100%, 40% 100%)",
        }}
      >
        <div className="h-full w-full bg-secondary" />
      </div>
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 w-full py-24 lg:py-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-primary-foreground">
          <Badge variant="outline" className="hero-text w-fit border-primary-foreground/30 text-primary-foreground/90 text-xs tracking-widest uppercase">
            CS Student @ BRAC University
          </Badge>

          <h1 className="hero-text text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95]">
            Muztahid
            <br />
            Rahman
          </h1>

          <p className="hero-text text-lg md:text-xl max-w-lg text-primary-foreground/80 leading-relaxed">
            Architecting Scalable Web Platforms &amp; Autonomous Systems.
          </p>

          <div className="hero-text flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground font-semibold transition-colors duration-300 hover:bg-secondary/80"
            >
              Explore My Work
              <ArrowRight className="ml-1.5" size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent font-semibold transition-colors duration-300 hover:bg-primary-foreground/10"
            >
              <Download className="mr-1.5" size={16} />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Right Graphic Cards */}
        <div
          ref={graphicRef}
          className="w-full lg:w-1/2 flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center lg:justify-end gap-5 mt-8 lg:mt-0"
        >
          {/* Web Architecture Card */}
          <div className="relative w-full max-w-xs rounded-2xl border border-secondary-foreground/10 bg-secondary/90 backdrop-blur-sm p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-foreground/10">
                <Globe size={20} className="text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-black text-secondary-foreground">Web Architecture</h3>
            </div>
            <p className="text-sm text-secondary-foreground/70 mb-5 leading-relaxed">
              Enterprise-grade full-stack platforms with scalable cloud infrastructure.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "NestJS", "AWS"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-md bg-secondary-foreground/10 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  {t === "Next.js" && <Layers size={12} />}
                  {t === "NestJS" && <Server size={12} />}
                  {t === "AWS" && <Globe size={12} />}
                  {t}
                </span>
              ))}
            </div>
            {/* Decorative element */}
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border-2 border-secondary-foreground/10 opacity-50" />
          </div>

          {/* Robotics Card */}
          <div className="relative w-full max-w-xs rounded-2xl border border-primary-foreground/10 bg-primary/90 backdrop-blur-sm p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/10">
                <Cpu size={20} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-black text-primary-foreground">Robotics &amp; Autonomy</h3>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-5 leading-relaxed">
              Autonomous navigation and embedded systems with low-level control.
            </p>
            <div className="flex flex-wrap gap-2">
              {["ROS2", "C/C++", "STM32"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-md bg-primary-foreground/10 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  {t === "ROS2" && <Cog size={12} />}
                  {t === "C/C++" && <Cpu size={12} />}
                  {t === "STM32" && <Wifi size={12} />}
                  {t}
                </span>
              ))}
            </div>
            {/* Decorative SVG arm abstract */}
            <svg className="absolute -bottom-2 -left-2 w-14 h-14 text-primary-foreground/10" viewBox="0 0 60 60" fill="none">
              <path d="M10 50 L30 30 L50 35 L45 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="30" cy="30" r="3" fill="currentColor" />
              <circle cx="50" cy="35" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}