"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Copy, Check, ExternalLink } from "lucide-react";

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

  // Mocked commit graph — 7 weeks x 7 days
  const commitGraph = Array.from({ length: 49 }, (_, i) => {
    const intensities = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    return intensities[Math.floor(Math.random() * intensities.length)];
  });

  const intensityColors: Record<number, string> = {
    0: "bg-muted",
    1: "bg-green-900/40",
    2: "bg-green-700/60",
    3: "bg-green-500/80",
    4: "bg-green-400",
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-10 bg-foreground/20" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Network Nodes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* GitHub Node */}
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-node group rounded-xl border border-border bg-card p-6 flex flex-col justify-between gap-6 transition-colors duration-300 hover:border-foreground/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github size={24} />
                <div>
                  <p className="font-bold text-sm">GitHub</p>
                  <p className="text-xs text-muted-foreground">
                    @muztahiddurjoy
                  </p>
                </div>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </div>

            {/* Commit graph */}
            <div className="grid grid-cols-7 gap-1">
              {commitGraph.map((intensity, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${intensityColors[intensity]}`}
                />
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              365 contributions in the last year
            </p>
          </a>

          {/* LinkedIn Node */}
          <a
            href="https://linkedin.com/in/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-node group rounded-xl border border-border bg-card p-6 flex flex-col justify-between gap-6 transition-colors duration-300 hover:border-foreground/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Linkedin size={24} />
                <div>
                  <p className="font-bold text-sm">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">
                    Professional Network
                  </p>
                </div>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-lg font-black tracking-tight">
                  Muztahid Rahman
                </p>
                <p className="text-sm text-muted-foreground">
                  Chief Software Engineer
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                Open to opportunities
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              500+ connections
            </p>
          </a>

          {/* Email Protocol */}
          <button
            onClick={copyEmail}
            className="bento-node group rounded-xl border border-border bg-card p-6 flex flex-col justify-between gap-6 text-left transition-colors duration-300 hover:border-foreground/20 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={24} />
                <div>
                  <p className="font-bold text-sm">Email Protocol</p>
                  <p className="text-xs text-muted-foreground">Direct Line</p>
                </div>
              </div>
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy
                  size={14}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              )}
            </div>

            <div>
              <p className="font-mono text-sm break-all">
                muztahid@example.com
              </p>
            </div>

            <div
              className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${
                copied ? "text-green-500" : "text-muted-foreground"
              }`}
            >
              {copied ? "Address Copied" : "Click to copy"}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
