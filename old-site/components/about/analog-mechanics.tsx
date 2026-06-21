"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cog, Car, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AnalogMechanics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".analog-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-foreground text-background"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="analog-reveal mb-8">
            <span className="font-script text-2xl md:text-3xl text-primary -rotate-2 inline-block mb-3">
              Beyond the screen.
            </span>
          </div>

          <h2 className="analog-reveal text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            An Appreciation for{" "}
            <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block">
              Analog
            </span>{" "}
            Engineering.
          </h2>

          <div className="analog-reveal border-l-8 border-accent pl-6 mb-6">
            <p className="text-lg text-background/80 leading-relaxed">
              My engineering instinct wasn&apos;t born in a code editor. It started with an
              obsession for how mechanical things work — the kind of curiosity that makes
              you take apart a carburetor just to understand the Venturi effect.
            </p>
          </div>

          <p className="analog-reveal text-sm font-mono text-background/50 leading-relaxed mb-8 tracking-wide">
            There&apos;s an engineering philosophy embedded in machines like the Volkswagen
            Beetle — where every component has exactly one job and the entire system is
            debuggable with hand tools. The Mercedes-Benz W123, so over-engineered for
            durability that specimens from the 1970s are still daily drivers. Write code
            like those engineers built machines: every module with a clear purpose,
            interfaces so clean they&apos;re self-documenting, resilience built into
            the architecture.
          </p>

          {/* Three pillars */}
          <div className="analog-reveal grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                icon: Cog,
                title: "Simplicity as Strength",
                text: "The Beetle principle — systems where every component has exactly one purpose and nothing is superfluous.",
              },
              {
                icon: Car,
                title: "Engineered for Durability",
                text: "The W123 approach — over-engineer the foundation so the system outlasts its expected lifecycle by decades.",
              },
              {
                icon: Wrench,
                title: "Mechanical Purity",
                text: "The vintage Honda/Yamaha ethos — simplicity and reliability as design goals, not compromises.",
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`border-4 border-background/20 p-5 ${idx > 0 ? "border-t-0 md:border-t-4 md:border-l-0" : ""}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-background text-foreground mb-3">
                    <Icon size={16} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-background mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-background/50 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}