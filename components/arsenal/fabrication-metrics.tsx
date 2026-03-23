"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ruler, Printer, PenTool, Wrench, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const specSheets = [
  {
    id: "3d-printing",
    icon: Printer,
    title: "3D Printing & Prototyping",
    description: "FDM and resin-based additive manufacturing for mechanical enclosures, sensor mounts, and custom robot chassis.",
    specs: [
      { label: "Layer Height", value: "0.12 – 0.28mm" },
      { label: "Nozzle Temp", value: "190 – 250 °C" },
      { label: "Bed Temp", value: "50 – 110 °C" },
      { label: "Infill Range", value: "15 – 100%" },
      { label: "Materials", value: "PLA, PETG, TPU, ABS" },
      { label: "Post-Process", value: "Sanding, acetone vapor, heat-set inserts" },
    ],
    tags: ["Cura", "PrusaSlicer", "OctoPrint"],
  },
  {
    id: "cad",
    icon: PenTool,
    title: "CAD & Mechanical Design",
    description: "Parametric 3D modeling for robotics assemblies, enclosures, and custom PCB mounting solutions.",
    specs: [
      { label: "Primary Tool", value: "SolidWorks / Fusion 360" },
      { label: "Tolerance", value: "± 0.1mm standard" },
      { label: "Export Formats", value: "STL, STEP, IGES" },
      { label: "Assembly Size", value: "Up to 200+ parts" },
      { label: "Simulation", value: "FEA stress analysis" },
      { label: "PCB Integration", value: "KiCad footprint alignment" },
    ],
    tags: ["SolidWorks", "Fusion 360", "KiCad"],
  },
  {
    id: "analog",
    icon: Wrench,
    title: "Analog & Mechanical Assembly",
    description: "Hand soldering, wire harness routing, and mechanical assembly for sensor integration and motor mounting.",
    specs: [
      { label: "Soldering", value: "SMD down to 0402 packages" },
      { label: "Crimping", value: "JST, Molex, Dupont connectors" },
      { label: "Wire Gauge", value: "AWG 16 – 30" },
      { label: "Fasteners", value: "M2 – M8 metric hardware" },
      { label: "Adhesives", value: "Epoxy, cyanoacrylate, thermal paste" },
      { label: "Testing", value: "Multimeter, logic analyzer, oscilloscope" },
    ],
    tags: ["Hand Assembly", "Quality Control", "Prototyping"],
  },
];

export default function FabricationMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fab-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fab-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (dir: "prev" | "next") => {
    setActiveIndex((prev) =>
      dir === "next"
        ? (prev + 1) % specSheets.length
        : (prev - 1 + specSheets.length) % specSheets.length
    );
  };

  const sheet = specSheets[activeIndex];
  const Icon = sheet.icon;

  return (
    <section id="section-fabrication" ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="fab-header flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <Ruler size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Fabrication.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Physical Build Specs
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Precision specifications for physical prototyping and assembly.
        </p>

        {/* Carousel navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-foreground">
          <div className="flex items-center gap-3">
            {specSheets.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] border-4 transition-colors duration-150 ${
                  idx === activeIndex
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-foreground/20 hover:border-foreground"
                }`}
              >
                {s.title.split(" ")[0]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goTo("prev")}
              className="flex items-center justify-center w-10 h-10 border-4 border-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo("next")}
              className="flex items-center justify-center w-10 h-10 border-4 border-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Spec sheet card */}
        <div className="border-4 border-foreground">
          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b-4 border-foreground">
            <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                {sheet.title}
              </h3>
              <p className="text-xs text-foreground/50">{sheet.description}</p>
            </div>
          </div>

          {/* Spec rows */}
          <div className="divide-y-2 divide-foreground/10">
            {sheet.specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between px-6 py-4">
                <span className="text-xs font-black uppercase tracking-[0.1em] text-foreground/50">
                  {spec.label}
                </span>
                <span className="text-sm font-mono text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Tags footer */}
          <div className="flex items-center gap-2 px-6 py-3 border-t-4 border-foreground">
            {sheet.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Page indicator */}
        <div className="flex items-center gap-2 mt-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
            {String(activeIndex + 1).padStart(2, "0")} / {String(specSheets.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1 ml-2">
            {specSheets.map((_, idx) => (
              <span
                key={idx}
                className={`w-6 h-1.5 transition-colors duration-150 ${
                  idx === activeIndex ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}