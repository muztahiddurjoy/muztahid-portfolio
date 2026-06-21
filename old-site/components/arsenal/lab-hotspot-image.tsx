"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Monitor, Cpu, Printer, Wrench, Eye, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Hotspot {
  id: string;
  label: string;
  icon: React.ElementType;
  x: string;
  y: string;
  description: string;
  specs: string[];
}

const hotspots: Hotspot[] = [
  {
    id: "monitor",
    label: "Primary Display",
    icon: Monitor,
    x: "25%",
    y: "20%",
    description: "27\" 4K IPS panel for design work, code review, and real-time debugging dashboards.",
    specs: ["3840 × 2160", "60Hz IPS", "USB-C PD"],
  },
  {
    id: "compute",
    label: "Compute Node",
    icon: Cpu,
    x: "65%",
    y: "35%",
    description: "Custom-built workstation running Ubuntu for ROS2 development and 3D rendering.",
    specs: ["Ryzen 9 7950X", "64GB DDR5", "RTX 4070 Ti"],
  },
  {
    id: "printer",
    label: "3D Printer Station",
    icon: Printer,
    x: "80%",
    y: "65%",
    description: "Modified Ender 3 V2 with direct-drive extruder and BLTouch for precision prototyping.",
    specs: ["220 × 220 × 250mm", "Direct Drive", "Klipper Firmware"],
  },
  {
    id: "workbench",
    label: "Soldering Station",
    icon: Wrench,
    x: "35%",
    y: "75%",
    description: "Temperature-controlled soldering iron, rework station, and component organizer.",
    specs: ["Hakko FX-888D", "Hot Air Rework", "ESD-Safe Mat"],
  },
];

export default function LabHotspotImage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hotspot-container", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hotspot-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".hotspot-dot").forEach((el, i) => {
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          delay: 0.5 + i * 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".hotspot-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = hotspots.find((h) => h.id === activeHotspot);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-background text-foreground">
            <Eye size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Workspace.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-background leading-[0.9]">
              Lab Overview
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-background/50 max-w-xl mb-16">
          An interactive map of the physical workspace where prototypes come to life.
        </p>

        {/* Hotspot area */}
        <div className="hotspot-container relative border-4 border-background bg-background/5 aspect-[16/9] md:aspect-[21/9]">
          {/* CSS art desk representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-background/10 flex items-center justify-center">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-background/20">
                [ lab floor plan ]
              </span>
            </div>
          </div>

          {/* Hotspot dots */}
          {hotspots.map((hotspot) => {
            const HIcon = hotspot.icon;
            return (
              <button
                key={hotspot.id}
                className={`hotspot-dot absolute flex items-center justify-center w-10 h-10 border-4 transition-colors duration-150 z-10 ${
                  activeHotspot === hotspot.id
                    ? "bg-background text-foreground border-background"
                    : "bg-accent border-accent hover:bg-background hover:text-foreground hover:border-background"
                }`}
                style={{ left: hotspot.x, top: hotspot.y, transform: "translate(-50%, -50%)" }}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                aria-label={hotspot.label}
              >
                <HIcon size={16} />
              </button>
            );
          })}

          {/* Active hotspot detail panel */}
          {active && (
            <div className="absolute bottom-0 left-0 right-0 bg-background text-foreground border-t-4 border-foreground p-6 z-20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-foreground text-background">
                    <active.icon size={16} />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-foreground">
                    {active.label}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="flex items-center justify-center w-8 h-8 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-sm text-foreground/60 mb-3">{active.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {active.specs.map((spec) => (
                  <span key={spec} className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-6 border-4 border-background">
          {hotspots.map((hotspot, idx) => {
            const HIcon = hotspot.icon;
            return (
              <button
                key={hotspot.id}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                className={`flex items-center gap-2 px-4 py-3 text-left transition-colors duration-150 ${
                  idx > 0 ? "border-l-2 border-background/20" : ""
                } ${activeHotspot === hotspot.id ? "bg-background/10" : "hover:bg-background/5"}`}
              >
                <HIcon size={14} className="text-background/60 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-background/60">
                  {hotspot.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}