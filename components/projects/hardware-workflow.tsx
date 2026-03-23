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

      // Horizontal scroll
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

      // Fade-in each card
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
    <section ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
          Physical Prototyping
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          Hardware Workflow
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-8 pl-6 md:pl-12 lg:pl-20 pr-20 w-max">
        {steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <div
              key={step.step}
              className="hw-step-card w-[340px] md:w-[420px] flex-shrink-0 rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                    Step {step.step}
                  </p>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className={`h-1 flex-1 rounded-full ${
                      j <= i ? "bg-primary" : "bg-border"
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
