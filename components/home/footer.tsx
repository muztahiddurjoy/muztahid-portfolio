"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SiteSettings {
  name?: string;
  [key: string]: unknown;
}

interface HomeFooterProps {
  siteSettings?: SiteSettings | null;
}

export default function HomeFooter({ siteSettings }: HomeFooterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hf-el", {
        y: 15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="py-8 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="hf-el flex items-center gap-3">
          <span className="h-2 w-2 bg-accent" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
            &copy; {new Date().getFullYear()} {siteSettings?.name ?? "Muztahid Rahman"}
          </span>
        </div>
        <span className="hf-el text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/30">
          Built with precision.
        </span>
      </div>
    </footer>
  );
}