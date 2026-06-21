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

  return (
    <div
      ref={ref}
      className="sticky top-0 z-40 bg-background border-b-4 border-foreground"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center gap-0 py-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange(tab.value)}
              className={`px-5 py-4 text-xs font-black uppercase tracking-[0.1em] whitespace-nowrap transition-colors duration-200 cursor-pointer border-r-4 border-foreground last:border-r-0 ${
                activeFilter === tab.value
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground/60 hover:bg-foreground hover:text-background"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}