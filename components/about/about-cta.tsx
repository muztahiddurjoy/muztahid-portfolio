"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="relative py-32 overflow-hidden bg-secondary text-secondary-foreground"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary-foreground/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-secondary-foreground/5 translate-y-1/2 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 text-center max-w-2xl">
        <h2 className="about-cta-reveal text-4xl md:text-6xl font-black tracking-tight mb-6">
          Let&apos;s build
          <br />
          something robust.
        </h2>

        <p className="about-cta-reveal text-lg text-secondary-foreground/70 leading-relaxed mb-12">
          Whether you need a scalable web platform, an embedded firmware solution,
          or a full autonomous navigation stack — I&apos;m ready to talk engineering.
        </p>

        <div className="about-cta-reveal flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-secondary-foreground text-secondary font-semibold transition-colors duration-300 hover:bg-secondary-foreground/85"
            asChild
          >
            <a href="mailto:muztahid@example.com">
              <Mail className="mr-2" size={16} />
              Send an Email
            </a>
          </Button>
          <Button
            size="lg"
            className="border-2 border-secondary-foreground/30 bg-transparent text-secondary-foreground font-semibold transition-colors duration-300 hover:bg-oxford hover:text-tan hover:border-secondary-foreground/50"
            asChild
          >
            <a
              href="https://linkedin.com/in/muztahiddurjoy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2" size={16} />
              Connect on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
