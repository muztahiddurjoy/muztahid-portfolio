"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ArsenalFooterCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".arsenal-cta-reveal", {
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
      className="relative py-28 overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/5 translate-y-1/2 -translate-x-1/4" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-primary-foreground"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 text-center max-w-2xl">
        <div className="arsenal-cta-reveal flex items-center justify-center gap-2 mb-6">
          <Rocket size={20} className="text-secondary" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Ready to Deploy
          </span>
        </div>

        <h2 className="arsenal-cta-reveal text-3xl md:text-5xl font-black tracking-tight mb-5">
          The tools are ready.
          <br />
          Let&apos;s build.
        </h2>
        <p className="arsenal-cta-reveal text-lg text-primary-foreground/60 leading-relaxed mb-10">
          From full-stack web platforms to autonomous systems — the arsenal is
          loaded and the infrastructure is proven.
        </p>

        <div className="arsenal-cta-reveal flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground font-semibold transition-colors duration-300 hover:bg-secondary/80"
            asChild
          >
            <Link href="/projects">
              View Project Universe
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground/20 text-primary-foreground bg-transparent font-semibold transition-colors duration-300 hover:bg-primary-foreground/10"
            asChild
          >
            <a href="mailto:muztahid@example.com">
              <Mail className="mr-2" size={16} />
              Initiate Contact
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
