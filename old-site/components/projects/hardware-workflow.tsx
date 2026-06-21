"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Layers, Printer } from "lucide-react";
import type { WorkflowStep } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [PenTool, Layers, Printer];

interface HardwareWorkflowProps {
  steps: WorkflowStep[];
}

export default function HardwareWorkflow({ steps }: HardwareWorkflowProps) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.offsetWidth;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 20%",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".hw-step-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <span className="font-script text-accent text-lg mb-2 block">physical prototyping</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
          HARDWARE WORKFLOW
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-0 pl-6 md:pl-12 lg:pl-20 pr-20 w-max">
        {steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <div
              key={step.step}
              className={`hw-step-card w-[340px] md:w-[420px] flex-shrink-0 border-4 border-foreground p-8 ${i > 0 ? "border-l-0" : ""}`}
            >
              <div className="flex items-center gap-4 mb-6 border-b-4 border-foreground pb-6">
                <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-mono">
                    Step {step.step}
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {step.description}
              </p>

              {/* Progress */}
              <div className="mt-6 flex items-center gap-1">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className={`h-1 flex-1 ${
                      j <= i ? "bg-foreground" : "bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}