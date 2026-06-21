"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

const MATH_SYMBOLS = [
  "∑", "∫", "∂", "∇", "∞", "√", "π", "θ",
  "λ", "Ω", "Δ", "φ", "ε", "σ", "μ", "β",
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function LogHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const symbolsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [, setTick] = useState(0);

  const scrambleText = useCallback(
    (el: HTMLElement, finalText: string, duration = 1200) => {
      const length = finalText.length;
      const interval = duration / (length * 2);
      let frame = 0;
      const totalFrames = length * 2;

      const run = () => {
        if (frame >= totalFrames) {
          el.textContent = finalText;
          return;
        }
        const progress = frame / totalFrames;
        const revealed = Math.floor(progress * length);
        let text = "";
        for (let i = 0; i < length; i++) {
          if (i < revealed) {
            text += finalText[i];
          } else {
            text += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        el.textContent = text;
        frame++;
        setTimeout(run, interval);
      };
      run();
    },
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating math symbols
      if (symbolsRef.current) {
        gsap.utils.toArray<HTMLElement>(".math-sym").forEach((sym, i) => {
          gsap.to(sym, {
            y: `random(-40, 40)`,
            x: `random(-20, 20)`,
            opacity: gsap.utils.random(0.08, 0.25),
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });
      }

      // Blinking cursor
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });
      }

      // Reveal hero text
      gsap.from(".log-hero-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.4,
      });
    }, containerRef);

    // Scramble headline
    const timer = setTimeout(() => {
      if (headlineRef.current) {
        scrambleText(headlineRef.current, "SYSTEM LOGS", 1200);
      }
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [scrambleText]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-foreground text-background border-b-4 border-background"
    >
      {/* Floating math symbols */}
      <div
        ref={symbolsRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {MATH_SYMBOLS.slice(0, 16).map((sym, i) => (
          <span
            key={i}
            className="math-sym absolute font-mono text-background text-lg md:text-2xl"
            style={{
              left: `${8 + (i % 8) * 12}%`,
              top: `${10 + Math.floor(i / 8) * 45 + (i % 3) * 12}%`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 py-24">
        {/* Terminal prefix */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-xs tracking-[0.15em] text-background/50 uppercase">
            ~/system-logs
          </span>
          <span className="text-background/30 font-mono text-sm">$</span>
          <span className="text-background/50 font-mono text-xs tracking-[0.15em]">
            cat research.md
          </span>
          <span
            ref={cursorRef}
            className="inline-block w-2.5 h-5 bg-accent ml-1"
          />
        </div>

        {/* Script annotation */}
        <span className="font-script text-accent text-lg md:text-xl mb-3 block log-hero-text">
          research archive
        </span>

        {/* Giant headline with scramble */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.95] text-background mb-8"
        >
          &nbsp;
        </h1>

        <p className="log-hero-text text-lg md:text-xl max-w-2xl text-background/60 leading-relaxed mb-12 border-l-8 border-accent pl-6">
          Documenting algorithmic theory, architectural decisions, and hardware
          mechanics.
        </p>

        {/* Stats row */}
        <div className="log-hero-text flex flex-wrap gap-0 border-t-4 border-background pt-0">
          {[
            { label: "Research Logs", value: "7" },
            { label: "Domains Covered", value: "4" },
            { label: "Avg. Read Time", value: "15 min" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col py-6 px-6 ${i > 0 ? "border-l-4 border-background max-md:border-l-0 max-md:border-t-4" : ""}`}
            >
              <span className="text-3xl md:text-4xl font-black text-accent">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-mono mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}