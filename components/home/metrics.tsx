"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 15, suffix: "+", label: "Projects Shipped" },
  { value: 50, suffix: "+", label: "Database Models Designed" },
  { value: 18, suffix: "+", label: "Technologies in Stack" },
  { value: 4, suffix: "", label: "Engineering Roles" },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = { val: 0 };
        const end = metrics[i].value;

        gsap.to(target, {
          val: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate() {
            el.textContent = `${Math.round(target.val)}${metrics[i].suffix}`;
          },
        });
      });

      // Fade the whole row
      gsap.from(".metric-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
          {metrics.map((m, i) => (
            <div key={m.label} className="metric-item flex flex-col items-center gap-2">
              <span
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                0{m.suffix}
              </span>
              <span className="text-sm text-primary-foreground/70 font-medium uppercase tracking-wider">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
