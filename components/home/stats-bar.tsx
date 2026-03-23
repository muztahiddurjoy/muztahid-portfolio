"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Briefcase, Rocket, Lightbulb, Trophy } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Chief Software Engineer @ BOT Engineers" },
  { icon: Rocket, label: "AI & Autonomy @ BRACU Mongol-tori" },
  { icon: Lightbulb, label: "Founder @ Appbaksho" },
  { icon: Trophy, label: "NASA Space Apps Challenger" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 15,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full border-y-4 border-foreground bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-foreground/20">
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="stat-item flex items-center gap-3 py-5 sm:px-4 lg:px-6 first:pl-0 last:pr-0"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background shrink-0">
                <Icon size={14} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.1em] text-foreground/80 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}