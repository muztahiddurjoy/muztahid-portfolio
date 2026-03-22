"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Printer, Cog, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const specSheets = [
  {
    icon: Printer,
    title: "3D Printing & Additive Manufacturing",
    specs: [
      { label: "Platform", value: "Bambu Lab X1 Carbon" },
      { label: "Slicer", value: "Bambu Studio / OrcaSlicer" },
      { label: "Materials", value: "PLA, PETG, TPU, ABS" },
      { label: "Layer Height", value: "0.08–0.28mm adaptive" },
      { label: "Infill Strategy", value: "Gyroid / adaptive cubic" },
      { label: "Tolerance", value: "±0.1mm on precision parts" },
    ],
    description:
      "From concept to physical part in hours. Custom mounting brackets for LiDAR sensors, protective housings for electronics bays, and structural chassis components are designed with manufacturability in mind from the start. Multi-material prints allow functional prototypes with embedded wiring channels and snap-fit assemblies.",
  },
  {
    icon: Cog,
    title: "Mechanical Design & CAD",
    specs: [
      { label: "CAD Tools", value: "SolidWorks / Fusion 360" },
      { label: "Analysis", value: "FEA stress simulation" },
      { label: "Output", value: "STL, STEP, DXF" },
      { label: "Tolerance Stack", value: "GD&T fundamentals" },
      { label: "Assembly", value: "Press-fit, heat-set inserts" },
      { label: "Fasteners", value: "M2–M6 metric hardware" },
    ],
    description:
      "Parametric modeling with full constraint trees ensures parts can be iterated rapidly. Designs account for thermal expansion, material creep, and assembly sequence from the first sketch. Every part has a purpose, every tolerance is justified.",
  },
  {
    icon: Wrench,
    title: "Analog Mechanical Inspiration",
    specs: [
      { label: "Philosophy", value: "Over-engineer, then simplify" },
      { label: "Reference", value: "Mercedes W123, Honda CB series" },
      { label: "Principle", value: "Mechanical redundancy" },
      { label: "Material Feel", value: "Metal > Plastic when possible" },
      { label: "Maintenance", value: "Design for serviceability" },
      { label: "Longevity", value: "30+ year lifecycle target" },
    ],
    description:
      "Classic Japanese motorcycles and vintage Mercedes diesels share a design philosophy: build it right, build it once, make it serviceable. This informs modern hardware builds — every cable has a strain relief, every connector has a locking mechanism, and every enclosure opens without destroying itself.",
  },
];

export default function FabricationMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fab-header", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, specSheets.length - 1));
      setActiveIndex(clamped);
      if (carouselRef.current) {
        const cards = carouselRef.current.children;
        if (cards[clamped]) {
          (cards[clamped] as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    },
    []
  );

  return (
    <section
      id="section-prototyping"
      ref={sectionRef}
      className="py-24 bg-card overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="fab-header flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Wrench size={20} className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                The Prototyping Deck
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Physical fabrication capabilities — from 3D printing to mechanical
              design philosophy.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground/70 hover:text-foreground disabled:opacity-30 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === specSheets.length - 1}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground/70 hover:text-foreground disabled:opacity-30 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
        >
          {specSheets.map((sheet, idx) => {
            const Icon = sheet.icon;
            return (
              <div
                key={sheet.title}
                className={`snap-center shrink-0 w-85 md:w-105 rounded-2xl border-2 bg-background p-8 transition-all duration-300 ${
                  activeIndex === idx
                    ? "border-secondary/60 shadow-[0_0_25px_rgba(210,180,140,0.1)]"
                    : "border-border"
                }`}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-base font-extrabold text-foreground leading-tight">
                    {sheet.title}
                  </h3>
                </div>

                {/* Spec table */}
                <div className="rounded-lg border border-border overflow-hidden mb-6">
                  {sheet.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs ${
                        i % 2 === 0 ? "bg-muted/40" : "bg-background"
                      }`}
                    >
                      <span className="font-bold text-foreground/70">
                        {spec.label}
                      </span>
                      <span className="text-muted-foreground text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sheet.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {specSheets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-secondary"
                  : "bg-border hover:bg-muted-foreground/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
