"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const techs = [
  "Next.js", "NestJS", "Prisma", "AWS", "TypeScript", "ROS2", "C/C++",
  "STM32", "ESP32", "Python", "Docker", "PostgreSQL", "Java",
  "TailwindCSS", "3D Printing", "SLAM", "Digital Logic", "Git",
];

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden border-y-4 border-foreground bg-muted/20 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />

      <div ref={trackRef} className="flex w-max gap-8 whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-foreground/40 select-none"
          >
            <span className="h-1.5 w-1.5 bg-foreground/30" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}