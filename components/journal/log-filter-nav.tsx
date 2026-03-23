"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { categories, type LogCategory } from "@/lib/types";
import {
  Layers,
  BookOpen,
  Cloud,
  Cpu,
  Wrench,
} from "lucide-react";

const categoryIcons: Record<LogCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  all: Layers,
  "cs-algorithms": BookOpen,
  "cloud-architecture": Cloud,
  "autonomy-ros2": Cpu,
  "analog-mechanics": Wrench,
};

interface LogFilterNavProps {
  active: LogCategory;
  onChange: (cat: LogCategory) => void;
}

export default function LogFilterNav({ active, onChange }: LogFilterNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const ctx = gsap.context(() => {
      gsap.from(".filter-btn", {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, navRef);
    setHasAnimated(true);
    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-50 bg-background border-b-4 border-foreground"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-0 overflow-x-auto py-0 scrollbar-hide">
          {categories.map(({ id, label }) => {
            const Icon = categoryIcons[id];
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`filter-btn flex items-center gap-2 px-5 py-4 text-xs font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-200 border-r-4 border-foreground last:border-r-0 ${
                  active === id
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground/60 hover:bg-foreground hover:text-background"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}