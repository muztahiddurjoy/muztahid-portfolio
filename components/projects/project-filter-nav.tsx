"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectCategory } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const tabs: { label: string; value: ProjectCategory }[] = [
  { label: "All Systems", value: "all" },
  { label: "Software Architecture", value: "software" },
  { label: "Robotics & Embedded", value: "hardware" },
];

interface ProjectFilterNavProps {
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
}

export default function ProjectFilterNav({
  activeFilter,
  onFilterChange,
}: ProjectFilterNavProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        isStuck
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center gap-2 py-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange(tab.value)}
              className={`px-5 py-2.5 text-sm font-semibold tracking-wide uppercase whitespace-nowrap rounded-lg transition-colors duration-200 cursor-pointer ${
                activeFilter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground/70 border border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              [ {tab.label} ]
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
