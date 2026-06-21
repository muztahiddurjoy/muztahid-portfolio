"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Copy, Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function NetworkBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-node", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("muztahid@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* Mocked commit graph — 7 weeks × 7 days */
  const commitGraph = Array.from({ length: 49 }, () => {
    const intensities = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    return intensities[Math.floor(Math.random() * intensities.length)];
  });

  const intensityClass: Record<number, string> = {
    0: "bg-foreground/5",
    1: "bg-foreground/15",
    2: "bg-foreground/30",
    3: "bg-foreground/50",
    4: "bg-foreground/80",
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <Github size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Nodes.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Network
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Direct links to professional network nodes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* GitHub */}
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-node group border-4 border-foreground p-6 flex flex-col justify-between gap-6 transition-colors duration-150 hover:bg-foreground hover:text-background"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Github size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">GitHub</p>
                  <p className="text-xs text-foreground/50 font-mono group-hover:text-background/50">@muztahiddurjoy</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-foreground/30 group-hover:text-background/60 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {commitGraph.map((intensity, i) => (
                <div key={i} className={`aspect-square ${intensityClass[intensity]} group-hover:bg-background/20`} />
              ))}
            </div>

            <p className="text-xs font-mono text-foreground/40 group-hover:text-background/40">
              365 contributions in the last year
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-node group border-4 border-foreground border-l-0 p-6 flex flex-col justify-between gap-6 transition-colors duration-150 hover:bg-foreground hover:text-background max-md:border-l-4 max-md:border-t-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">LinkedIn</p>
                  <p className="text-xs text-foreground/50 font-mono group-hover:text-background/50">Professional</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-foreground/30 group-hover:text-background/60 group-hover:translate-x-1 transition-all" />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">Muztahid Rahman</p>
              <p className="text-sm text-foreground/50 group-hover:text-background/50">Chief Software Engineer</p>
              <div className="flex items-center gap-2 text-xs text-foreground/40 group-hover:text-background/40 mt-2">
                <span className="w-2 h-2 bg-accent" />
                Open to opportunities
              </div>
            </div>

            <p className="text-xs font-mono text-foreground/40 group-hover:text-background/40">
              500+ connections
            </p>
          </a>

          {/* Email */}
          <button
            onClick={copyEmail}
            className="bento-node group border-4 border-foreground border-l-0 p-6 flex flex-col justify-between gap-6 text-left transition-colors duration-150 hover:bg-foreground hover:text-background cursor-pointer max-md:border-l-4 max-md:border-t-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">Email</p>
                  <p className="text-xs text-foreground/50 font-mono group-hover:text-background/50">Direct Line</p>
                </div>
              </div>
              {copied ? (
                <Check size={14} className="text-accent" />
              ) : (
                <Copy size={14} className="text-foreground/30 group-hover:text-background/60" />
              )}
            </div>

            <p className="font-mono text-sm break-all">muztahid@example.com</p>

            <span className={`text-xs font-mono uppercase tracking-[0.15em] ${copied ? "text-accent" : "text-foreground/40 group-hover:text-background/40"}`}>
              {copied ? "Address Copied" : "Click to copy"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}