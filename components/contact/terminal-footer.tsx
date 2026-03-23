"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t-4 border-foreground bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="footer-reveal text-center mb-4">
          <p className="text-sm font-black uppercase tracking-[0.15em]">
            Engineered from scratch by Muztahid Rahman. &copy; 2026.
          </p>
        </div>

        <div className="footer-reveal flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/40">
          <span className="w-2 h-2 bg-accent" />
          <span>
            Next.js 16 &middot; Tailwind v4 &middot; GSAP &middot; Custom Components
          </span>
        </div>
      </div>
    </footer>
  );
}