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
      className="relative py-28 overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      {/* Decorative elements */}
      <div className="absolute top-12 right-16 w-48 h-48 border border-primary-foreground/10 rounded-full" />
      <div className="absolute bottom-16 left-12 w-32 h-32 border border-primary-foreground/10 rotate-45" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="analog-reveal flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-primary-foreground/20" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Beyond the Screen
            </span>
            <div className="h-px w-10 bg-primary-foreground/20" />
          </div>

          <h2 className="analog-reveal text-3xl md:text-5xl font-black tracking-tight mb-8">
            An Appreciation for
            <br />
            Analog Engineering.
          </h2>

          <p className="analog-reveal text-lg text-primary-foreground/80 leading-relaxed mb-6">
            My engineering instinct wasn&apos;t born in a code editor. It started with an
            obsession for how mechanical things work — the kind of curiosity that makes
            you take apart a carburetor just to understand the Venturi effect, or trace
            the entire cooling circuit of a vintage air-cooled engine.
          </p>

          <p className="analog-reveal text-base text-primary-foreground/70 leading-relaxed mb-8">
            There&apos;s an engineering philosophy embedded in machines like the Volkswagen
            Beetle — where every component has exactly one job and the entire system is
            debuggable with hand tools. Or the Mercedes-Benz W123, a car so
            over-engineered for durability that specimens from the 1970s are still daily
            drivers across continents. The mechanical purity of vintage Japanese
            motorcycles — Honda CB series, Yamaha SR400 — where simplicity and
            reliability weren&apos;t trade-offs, they were design goals.
          </p>

          <p className="analog-reveal text-base text-primary-foreground/70 leading-relaxed mb-10">
            This isn&apos;t nostalgia; it&apos;s a design principle. Write code like those
            engineers built machines: every module with a clear purpose, interfaces so
            clean they&apos;re self-documenting, and resilience built into the architecture
            rather than patched on after failure. Systems built to last.
          </p>

          {/* Three pillars */}
          <div className="analog-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-primary-foreground/10 p-5">
              <Cog size={20} className="text-secondary mb-3" />
              <h4 className="text-sm font-extrabold text-primary-foreground mb-2">
                Simplicity as Strength
              </h4>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">
                The Beetle principle — systems where every component has exactly one
                purpose and nothing is superfluous.
              </p>
            </div>

            <div className="rounded-xl border border-primary-foreground/10 p-5">
              <Car size={20} className="text-secondary mb-3" />
              <h4 className="text-sm font-extrabold text-primary-foreground mb-2">
                Engineered for Durability
              </h4>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">
                The W123 approach — over-engineer the foundation so the system
                outlasts its expected lifecycle by decades.
              </p>
            </div>

            <div className="rounded-xl border border-primary-foreground/10 p-5">
              <Wrench size={20} className="text-secondary mb-3" />
              <h4 className="text-sm font-extrabold text-primary-foreground mb-2">
                Mechanical Purity
              </h4>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">
                The vintage Honda/Yamaha ethos — simplicity and reliability as design
                goals, not compromises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
