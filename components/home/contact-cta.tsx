"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowRight, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SiteSettings {
  email?: string;
  name?: string;
  [key: string]: unknown;
}

interface ContactCTAProps {
  siteSettings?: SiteSettings | null;
}

export default function ContactCTA({ siteSettings }: ContactCTAProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-el", {
        y: 30,
        opacity: 0,
        duration: 0.9,
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
    <section ref={ref} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl text-center">
        {/* Script accent */}
        <span className="cta-el font-script text-3xl md:text-4xl text-primary -rotate-2 inline-block mb-4">
          Let&apos;s build something.
        </span>

        {/* Heavy heading */}
        <h2 className="cta-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
          Got a Project?
        </h2>

        <p className="cta-el text-sm md:text-base font-mono uppercase tracking-[0.15em] text-background/60 mb-12 max-w-xl mx-auto">
          Drop a line and let&apos;s talk hardware, software, or anything in between.
        </p>

        {/* CTA buttons */}
        <div className="cta-el flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`mailto:${siteSettings?.email ?? "hello@example.com"}`}
            className="group flex items-center gap-3 bg-background text-foreground px-8 py-4 border-4 border-background font-black uppercase tracking-[0.1em] text-sm hover:bg-transparent hover:text-background transition-colors"
          >
            <Mail className="w-5 h-5" />
            Send Email
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-transparent text-background px-8 py-4 border-4 border-background font-black uppercase tracking-[0.1em] text-sm hover:bg-background hover:text-foreground transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Contact Page
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}