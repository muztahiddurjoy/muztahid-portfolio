"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-reveal", {
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
      className="relative py-28 overflow-hidden bg-secondary text-secondary-foreground"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary-foreground/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-secondary-foreground/5 translate-y-1/2 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 text-center max-w-2xl">
        <h2 className="cta-reveal text-3xl md:text-5xl font-black tracking-tight mb-5">
          Let&apos;s Build Something
          <br />
          Together.
        </h2>
        <p className="cta-reveal text-lg text-secondary-foreground/70 leading-relaxed mb-10">
          Whether it&apos;s a scalable web platform, an autonomous robot, or anything
          in between — I&apos;m always open to discussing ambitious engineering
          challenges.
        </p>

        <div className="cta-reveal flex flex-wrap justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="bg-secondary-foreground text-secondary font-semibold transition-colors duration-300 hover:bg-secondary-foreground/85"
            asChild
          >
            <a href="mailto:muztahid@example.com">
              <Mail className="mr-2" size={16} />
              Get In Touch
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-secondary-foreground/20 text-secondary-foreground bg-transparent font-semibold transition-colors duration-300 hover:bg-secondary-foreground/10"
          >
            View Resume
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        {/* Social icons */}
        <div className="cta-reveal flex items-center justify-center gap-6">
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary-foreground/50 transition-colors duration-200 hover:text-secondary-foreground"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary-foreground/50 transition-colors duration-200 hover:text-secondary-foreground"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:muztahid@example.com"
            aria-label="Email"
            className="text-secondary-foreground/50 transition-colors duration-200 hover:text-secondary-foreground"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
