"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
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
    <section ref={ref} className="py-28 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="gh-callout-content max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-foreground/10 mx-auto mb-6">
            <Github size={24} className="text-secondary-foreground" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Inspect the Source.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-70 mb-8">
            Every architecture has a foundation. Review the raw code, commit
            history, and algorithmic implementations on my GitHub.
          </p>
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="cursor-pointer bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 font-semibold px-10 py-6 text-base"
            >
              <Github size={18} className="mr-2" />
              View Repositories
              <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
