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
      className="w-full border-y border-border bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 sm:py-5">
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="stat-item flex items-center gap-3 text-sm font-medium text-foreground/80"
            >
              <Icon size={16} className="shrink-0 text-secondary dark:text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
