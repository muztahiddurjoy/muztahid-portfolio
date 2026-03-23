"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, GraduationCap } from "lucide-react";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".about-hero-graphic", {
        scale: 0.9,
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
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      {/* Abstract geometric shapes — brutalist squares, no rounded */}
      <div className="absolute top-20 right-20 w-64 h-64 border-4 border-primary-foreground/10 rotate-12" />
      <div className="absolute bottom-32 left-16 w-40 h-40 border-4 border-primary-foreground/10 -rotate-6" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/10 rotate-45" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text content */}
          <div className="w-full lg:w-3/5 text-primary-foreground">
            <div className="about-hero-text flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-primary-foreground/30 text-primary-foreground/90 text-[11px] font-black uppercase tracking-[0.15em]">
                <MapPin size={12} />
                Dhaka, Bangladesh
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-primary-foreground/30 text-primary-foreground/90 text-[11px] font-black uppercase tracking-[0.15em]">
                <GraduationCap size={12} />
                CS @ BRAC University
              </span>
            </div>

            <h1 className="about-hero-text text-4xl md:text-6xl lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Engineering the Bridge Between{" "}
              <span className="bg-primary-foreground text-primary px-3 pt-3 pb-1 inline-block">
                Digital Logic
              </span>{" "}
              and Physical Mechanics.
            </h1>

            <div className="about-hero-text border-l-8 border-secondary pl-6 mb-6">
              <p className="text-lg md:text-xl max-w-2xl text-primary-foreground/80 leading-relaxed">
                I&apos;m Muztahid Rahman — a Computer Science student at BRAC University and
                a hands-on engineer who builds robust systems that exist both on screens and
                in the real world. From architecting enterprise Next.js platforms to programming
                STM32 microcontrollers for autonomous rovers, my work lives at the
                intersection of software architecture, algorithmic theory, and physical mechanics.
              </p>
            </div>

            <p className="about-hero-text text-sm font-mono max-w-2xl text-primary-foreground/50 leading-relaxed tracking-wide">
              Currently serving as Chief Software Engineer at BOT Engineers and building
              autonomous navigation stacks with the BRACU Mongol-tori team. I founded
              Appbaksho to bring production-grade engineering to local businesses in Bangladesh.
            </p>
          </div>

          {/* Abstract geometric visual — brutalist squares */}
          <div className="about-hero-graphic w-full lg:w-2/5 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 border-4 border-primary-foreground/20 rotate-6" />
              <div className="absolute inset-4 bg-secondary/20" />
              <div className="absolute inset-8 border-4 border-secondary/40 -rotate-3" />
              <div className="absolute inset-12 bg-primary-foreground/5" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-3">
                  Software &times; Hardware
                </span>
                <div className="h-1 w-16 bg-primary-foreground/20 mb-3" />
                <span className="text-[10px] font-mono text-primary-foreground/50 tracking-wide uppercase">
                  Full-Stack &middot; Embedded &middot; Autonomy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}