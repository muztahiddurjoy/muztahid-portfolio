"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Radio } from "lucide-react";

export default function SignalHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".signal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(".signal-bar", {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center bg-foreground text-background overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-3xl">
          <div className="signal-text flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-background text-foreground">
              <Radio size={20} />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-background/50">
              Signal & Routing
            </span>
          </div>

          <span className="signal-text font-script text-3xl text-primary -rotate-2 inline-block mb-2">
            Open channel.
          </span>

          <h1 className="signal-text text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] text-background mb-2">
            Initiate<br />
            <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block mt-2">
              Connection
            </span>
          </h1>

          <p className="signal-text text-sm font-mono text-background/50 uppercase tracking-[0.1em] max-w-lg mt-8">
            Secure routing for architectural consultations, robotics collaborations, and engineering opportunities.
          </p>

          {/* Signal strength bars */}
          <div className="signal-text flex items-end gap-1 mt-10 h-8">
            {[20, 40, 60, 80, 100].map((h, i) => (
              <div
                key={i}
                className="signal-bar w-3 bg-background/80 origin-bottom"
                style={{ height: `${h}%`, transform: "scaleY(0)" }}
              />
            ))}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-background/40 ml-3 pb-0.5">
              Signal: Excellent
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}