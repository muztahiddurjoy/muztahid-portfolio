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
    <footer ref={footerRef} className="border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="footer-reveal text-center mb-4">
          <p className="text-sm font-semibold tracking-tight">
            Engineered from scratch by Muztahid Rahman. &copy; 2026.
          </p>
        </div>

        <div className="footer-reveal flex items-center justify-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>
            Rendered via Next.js 16 &middot; styled with Tailwind v4 &middot;
            animated by GSAP &middot; components by Shadcn UI
          </span>
        </div>
      </div>
    </footer>
  );
}
