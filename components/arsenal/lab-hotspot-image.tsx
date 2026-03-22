"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const hotspots = [
  {
    id: "workstation",
    x: "25%",
    y: "40%",
    title: "High-Performance Workstation",
    description:
      "Custom PC build optimized for deep learning and ROS2 simulation. Runs Gazebo environments, PyTorch training, and multiple Docker containers simultaneously without throttling.",
    specs: [
      "Multi-core CPU for parallel compilation",
      "Dedicated GPU for CUDA-based processing",
      "High-capacity RAM for simulation workloads",
      "NVMe storage for fast dataset access",
    ],
  },
  {
    id: "embedded",
    x: "70%",
    y: "35%",
    title: "Embedded & Soldering Station",
    description:
      "Dedicated workstation for STM32 and ESP32 development. Includes oscilloscope, logic analyzer, and soldering equipment for prototyping and debugging firmware at the hardware level.",
    specs: [
      "STM32 development boards & JTAG debugger",
      "Oscilloscope for signal analysis",
      "Hot air rework station",
      "Component storage & organization system",
    ],
  },
  {
    id: "monitors",
    x: "48%",
    y: "20%",
    title: "Multi-Monitor Development",
    description:
      "Dual monitor setup — one for code (VS Code with Vim bindings), one for documentation, terminal sessions, or real-time telemetry from embedded devices.",
    specs: [
      "Primary: Code editor + terminal",
      "Secondary: Docs / simulation view",
      "Colour-accurate for UI development",
      "Tiled terminal manager (tmux)",
    ],
  },
  {
    id: "printing",
    x: "85%",
    y: "60%",
    title: "3D Printing Bay",
    description:
      "Bambu Lab printer for rapid prototyping of mechanical parts, sensor mounts, and robot chassis components. Prints run overnight for next-morning iteration.",
    specs: [
      "Bambu Lab X1 Carbon",
      "Multi-material AMS system",
      "Dry box for hygroscopic filaments",
      "Post-processing tools",
    ],
  },
];

export default function LabHotspotImage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lab-reveal", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Pulse animation for hotspot dots
      gsap.utils.toArray<HTMLElement>(".hotspot-dot").forEach((el) => {
        gsap.to(el, {
          scale: 1.3,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeData = hotspots.find((h) => h.id === activeHotspot);

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="lab-reveal flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Monitor size={20} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            The Lab Setup
          </h2>
        </div>
        <p className="lab-reveal text-muted-foreground max-w-xl mb-16">
          Engineers love seeing other engineers&apos; setups. Hover on the
          hotspots to explore.
        </p>

        {/* Interactive image container */}
        <div className="lab-reveal relative w-full aspect-21/9 rounded-2xl border-2 border-border overflow-hidden bg-linear-to-br from-[#0a0e17] to-[#001a38]">
          {/* Isometric desk illustration (stylized CSS art) */}
          <div className="absolute inset-0">
            {/* Desk surface */}
            <div className="absolute bottom-[25%] left-[10%] right-[10%] h-1 bg-secondary/30 rounded-full" />
            <div className="absolute bottom-[25%] left-[10%] right-[10%] h-[35%] bg-linear-to-t from-transparent to-white/2 rounded-t-lg" />

            {/* Monitor shapes - decorative */}
            <div className="absolute top-[15%] left-[20%] w-[20%] h-[30%] border border-secondary/20 rounded-sm bg-white/3" />
            <div className="absolute top-[15%] left-[42%] w-[20%] h-[30%] border border-secondary/20 rounded-sm bg-white/3" />

            {/* Keyboard shape */}
            <div className="absolute bottom-[28%] left-[30%] w-[18%] h-[6%] border border-secondary/15 rounded-sm bg-white/2" />

            {/* Side equipment shapes */}
            <div className="absolute top-[25%] right-[12%] w-[12%] h-[20%] border border-secondary/15 rounded-sm bg-white/2" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-secondary"
                  style={{ top: `${(i + 1) * 5}%` }}
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-secondary"
                  style={{ left: `${(i + 1) * 5}%` }}
                />
              ))}
            </div>
          </div>

          {/* Hotspot dots */}
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() =>
                setActiveHotspot(
                  activeHotspot === spot.id ? null : spot.id
                )
              }
              className="absolute z-10 group"
              style={{ left: spot.x, top: spot.y }}
              aria-label={`View details: ${spot.title}`}
            >
              <span className="hotspot-dot relative flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-40 animate-ping" />
                <span className="relative inline-flex h-5 w-5 rounded-full bg-secondary border-2 border-white/20 cursor-pointer" />
              </span>
              {/* Quick label on hover */}
              <span className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-bold text-secondary bg-[#0a0e17]/90 px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-secondary/20">
                {spot.title}
              </span>
            </button>
          ))}

          {/* Detail panel overlay */}
          {activeData && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-95 z-20 rounded-xl border border-secondary/30 bg-[#0a0e17]/95 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-secondary">
                  {activeData.title}
                </h4>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-white/40 hover:text-white/70 transition-colors"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {activeData.description}
              </p>
              <ul className="flex flex-col gap-1.5">
                {activeData.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2 text-[11px] text-white/50"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
