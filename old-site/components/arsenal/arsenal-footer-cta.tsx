"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MessageSquare, FolderOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ArsenalFooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-block", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="cta-block max-w-3xl">
          <span className="font-script text-2xl text-primary -rotate-2 inline-block mb-2">
            Impressed?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-background leading-[0.9] mb-6">
            Let&apos;s Build<br />
            <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block mt-2">
              Something Real
            </span>
          </h2>
          <p className="text-sm font-mono text-background/50 uppercase tracking-[0.1em] max-w-lg mb-10">
            You&apos;ve seen the toolkit. Now let&apos;s talk about what we can engineer together.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-4 border-4 border-background bg-background text-foreground font-black uppercase tracking-[0.15em] text-sm hover:bg-transparent hover:text-background transition-colors duration-200"
            >
              <MessageSquare size={18} />
              Start a Conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-6 py-4 border-4 border-background text-background font-black uppercase tracking-[0.15em] text-sm hover:bg-background hover:text-foreground transition-colors duration-200"
            >
              <FolderOpen size={18} />
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}