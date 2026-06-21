"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function GitHubCallout() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gh-callout-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="gh-callout-content max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-background text-foreground flex items-center justify-center mx-auto mb-6">
            <Github size={24} />
          </div>
          <span className="font-script text-accent text-lg mb-2 block">source code</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            INSPECT THE SOURCE
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-background/60 mb-8 max-w-xl mx-auto">
            Every architecture has a foundation. Review the raw code, commit
            history, and algorithmic implementations on my GitHub.
          </p>
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-accent hover:text-foreground border-4 border-background"
          >
            <Github size={18} />
            View Repositories
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}