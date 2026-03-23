"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-cta-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-foreground text-background border-t-4 border-background/20"
    >
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 text-center max-w-3xl">
        <span className="about-cta-reveal font-script text-3xl md:text-4xl text-primary -rotate-2 inline-block mb-4">
          Let&apos;s connect.
        </span>

        <h2 className="about-cta-reveal text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.85]">
          Let&apos;s Build Something{" "}
          <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block">
            Robust
          </span>
        </h2>

        <p className="about-cta-reveal text-sm font-mono uppercase tracking-[0.15em] text-background/50 leading-relaxed mb-12 max-w-xl mx-auto">
          Whether you need a scalable web platform, embedded firmware, or an autonomous navigation stack — I&apos;m ready to talk engineering.
        </p>

        <div className="about-cta-reveal flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <a
            href="mailto:muztahid@example.com"
            className="group inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 border-4 border-background font-black uppercase tracking-[0.1em] text-sm hover:bg-transparent hover:text-background transition-colors"
          >
            <Mail size={16} />
            Send an Email
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-transparent text-background px-8 py-4 border-4 border-background font-black uppercase tracking-[0.1em] text-sm hover:bg-background hover:text-foreground transition-colors"
          >
            <Linkedin size={16} />
            Connect on LinkedIn
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}