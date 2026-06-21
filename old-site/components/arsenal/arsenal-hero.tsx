"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

export default function ArsenalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const scrambleText = useCallback((el: HTMLElement, finalText: string) => {
    let iteration = 0;
    const totalIterations = finalText.length * 3;
    const interval = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((char, index) => {
          if (index < iteration / 3) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      iteration++;
      if (iteration > totalIterations) {
        clearInterval(interval);
        el.textContent = finalText;
      }
    }, 30);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      gsap.from(".arsenal-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".arsenal-detail", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.6,
      });
    }, containerRef);

    const timer = setTimeout(() => {
      if (headlineRef.current) {
        scrambleText(headlineRef.current, "INFRASTRUCTURE & CAPABILITIES.");
      }
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [scrambleText]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-primary-foreground"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 py-24">
        {/* Terminal-style prefix */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-secondary font-mono text-sm tracking-wider">~/arsenal</span>
          <span className="text-primary-foreground/40 font-mono text-sm">$</span>
          <span className="text-primary-foreground/60 font-mono text-sm">cat capabilities.md</span>
          <span ref={cursorRef} className="inline-block w-2.5 h-5 bg-secondary ml-1" />
        </div>

        {/* Main headline with scramble */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] text-primary-foreground mb-8"
        >
          &nbsp;
        </h1>

        <p className="arsenal-subtitle text-sm md:text-base font-mono uppercase tracking-[0.15em] max-w-2xl text-primary-foreground/50 leading-relaxed mb-12">
          The languages, frameworks, and physical tooling I use to push logic into production.
        </p>

        {/* Quick stats row */}
        <div className="arsenal-detail flex flex-wrap gap-8 border-t-4 border-primary-foreground/10 pt-8">
          {[
            { label: "Domains", value: "4" },
            { label: "Technologies", value: "20+" },
            { label: "Years Building", value: "4+" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-secondary">
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}